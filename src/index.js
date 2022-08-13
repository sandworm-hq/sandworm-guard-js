import Stack from './stack';
import {getSourceMap, getSourceMapFromSource} from './source';
import platform, {PLATFORMS} from './platform';
import webLibrary from './library/web';
import nodeLibrary from './library/node';
import logger from './logger';
import track, {setTrackingServer} from './track';

let initialized = false;
let ready = false;
let trustedModules = ['sandworm', 'react-dom', 'scheduler'];
const sourcemaps = {};
let permissions = {root: true};
let history = [];
let devMode = false;
let skipTracking = false;
let ignoreChromeExtensions = true;
const currentPlatform = platform();

const isObject = (object) => Object.prototype.toString.call(object) === '[object Object]';

const isInitialized = () =>
  initialized ||
  // eslint-disable-next-line no-restricted-globals
  (currentPlatform === PLATFORMS.WEB && self.sandwormInitialized) ||
  (currentPlatform === PLATFORMS.NODE && global.sandwormInitialized);
const setInitialized = () => {
  initialized = true;
  if (currentPlatform === PLATFORMS.WEB) {
    // eslint-disable-next-line no-restricted-globals
    self.sandwormInitialized = true;
  } else if (currentPlatform === PLATFORMS.NODE) {
    global.sandwormInitialized = true;
  }
};

function create(constructor) {
  // eslint-disable-next-line prefer-spread,prefer-rest-params
  const Factory = constructor.bind.apply(constructor, arguments);
  return new Factory();
}

const getCurrentModule = () => {
  try {
    const stack = (new Stack()?.items || []).reverse().map((item) => {
      const originalFile = item?.file;
      // Tap sourcemaps for original file src
      let mapping = originalFile;
      let mappingLine = item.line;
      let mappingColumn = item.column;
      if (originalFile && sourcemaps[originalFile]) {
        const originalItem = sourcemaps[originalFile].originalPositionFor({
          line: item.line,
          column: item.column,
        });
        mapping = originalItem.source;
        mappingLine = originalItem.line;
        mappingColumn = originalItem.column;
      }

      // Infer the module name
      let module;
      if (mapping && mapping.includes('node_modules')) {
        const components = mapping.split('/');
        const nodeModulesIndex = components.findIndex((v) => v === 'node_modules');
        let moduleName = components[nodeModulesIndex + 1];
        if (moduleName.startsWith('@')) {
          const submodule = components[nodeModulesIndex + 2];
          if (submodule) {
            moduleName = `${moduleName}/${submodule}`;
          }
        }
        if (!trustedModules.includes(moduleName)) {
          module = moduleName;
        }
      }

      // Treat URLs as separate modules
      // These are usually scripts loaded from external sources, like directly from a CDN
      if (initialized) {
        let url;
        try {
          url = new URL(mapping);
          // eslint-disable-next-line no-empty
        } catch (error) {}
        if (url && url.protocol !== 'node:') {
          module = mapping;
        }
      }

      return {
        caller: item.caller,
        file: item.file,
        fileLine: item.line,
        fileColumn: item.column,
        mapping,
        mappingLine,
        mappingColumn,
        module,
      };
    });

    const modules = stack.map(({module}) => module).filter((v) => v !== undefined);
    let name = 'root';

    if (modules.length) {
      if (ignoreChromeExtensions && modules[0].startsWith('chrome-extension://')) {
        name = 'root';
      } else if (modules[0] === modules[modules.length - 1]) {
        [name] = modules;
      } else {
        name = modules.filter((v, i, a) => a.indexOf(v) === i).join('>');
      }
    }

    return {name, stack};
  } catch (error) {
    logger.error(error);
    return {name: 'root', error: error.message};
  }
};

const init = async ({
  loadSourceMaps = currentPlatform === PLATFORMS.WEB,
  devMode: devModeOption = false,
  verbose = false,
  skipTracking: skipTrackingOption = false,
  trackingHost,
  trackingPort,
  ignoreChromeExtensions: ignoreChromeExtensionsOption = true,
  trustedModules: additionallyTrustedModules = [],
  permissions: permissionsOption = {},
} = {}) => {
  try {
    if (isInitialized()) {
      logger.warn('already initialized');
      return;
    }

    const {name: callerModule} = getCurrentModule();
    if (callerModule !== 'root') {
      logger.warn('only root module may call init', callerModule);
      return;
    }

    if (typeof devModeOption !== 'boolean') {
      logger.warn('devMode option must be a boolean, defaulting to false');
      devMode = false;
    } else {
      devMode = devModeOption;
    }

    if (devMode && !!verbose) {
      logger.level = 'debug';
    }

    skipTracking = !!skipTrackingOption;
    setTrackingServer(trackingHost, trackingPort);

    if (!Array.isArray(additionallyTrustedModules)) {
      logger.warn('trustedModules option must be an array, defaulting to empty array');
    } else {
      trustedModules = [...trustedModules, ...additionallyTrustedModules];
    }

    ignoreChromeExtensions = !!ignoreChromeExtensionsOption;

    if (!isObject(permissionsOption)) {
      logger.warn('permissions option must be an object, defaulting to empty object');
    } else {
      permissions = {...permissions, ...permissionsOption};
    }

    let library = [];

    if (currentPlatform === PLATFORMS.WEB) {
      library = webLibrary();
    } else if (currentPlatform === PLATFORMS.NODE) {
      library = nodeLibrary();
    } else {
      logger.debug('current platform is not supported');
    }

    // Monkey patches
    library.forEach((family) => {
      if (family.available) {
        family.methods.forEach((method) => {
          // eslint-disable-next-line no-param-reassign
          method.original = family.originalRoot()[method.name];
          if (method.original) {
            logger.debug(`installing ${family.name}.${method.name}`);
            // eslint-disable-next-line no-inner-declarations
            function replacement(...args) {
              const {name: module, stack, error} = getCurrentModule();
              logger.debug(`${module} called ${family.name}.${method.name} with`, args);
              const allowed =
                devMode ||
                permissions[module] === true ||
                (permissions[module]?.includes?.(family.name) ?? false) ||
                (permissions[module]?.includes?.(`${family.name}.${method.name}`) ?? false);
              if (devMode) {
                const event = {
                  module,
                  family: family.name,
                  method: method.name,
                  args,
                  allowed,
                  stack,
                  error,
                };
                if (ready) {
                  history.push(event);
                  if (!skipTracking) {
                    track(event);
                  }
                }
              }
              if (allowed) {
                if (method.isConstructor) {
                  return create(method.original, ...args);
                }
                return method.original.apply(this, args);
              }
              return method.mock.apply(this, args);
            }
            replacement.prototype = method.original.prototype;
            // eslint-disable-next-line no-param-reassign
            family.originalRoot()[method.name] = replacement;
          }
        });
      }
    });

    setInitialized();

    if (loadSourceMaps) {
      if (loadSourceMaps === true) {
        // Grab source map for invoker file
        const stack = new Stack();
        const site = stack.items[1];
        const currentSourceUrl = site.file;

        sourcemaps[currentSourceUrl] = await getSourceMapFromSource(currentSourceUrl);
      } else if (isObject(loadSourceMaps)) {
        (
          await Promise.all(
            Object.keys(loadSourceMaps).map(async (sourceUrl) => [
              sourceUrl,
              await getSourceMap(loadSourceMaps[sourceUrl]),
            ]),
          )
        ).forEach(([sourceUrl, sourcemap]) => {
          sourcemaps[sourceUrl] = sourcemap;
        });
      }
      logger.debug('loaded source maps', sourcemaps);
    }
  } catch (error) {
    logger.error(error);
  } finally {
    ready = true;
    logger.debug('initialized');
  }
};

const getHistory = () => {
  if (devMode) {
    return history;
  }

  return [];
};

const clearHistory = () => {
  if (devMode) {
    history = [];
  }
};

export default {init, getHistory, clearHistory};
