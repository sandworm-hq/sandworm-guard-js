import {currentStack} from './stack';
import {getSourceMap, getSourceMapFromSource} from './source';
import platform, {PLATFORMS} from './platform';
import webLibrary from './library/web';
import nodeLibrary from './library/node';
import logger from './logger';
import track, {setTrackingServer} from './track';

class SandwormError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SandwormError';
  }
}

let initialized = false;
let ready = false;
let trustedModules = ['sandworm', 'react-dom', 'scheduler'];
const sourcemaps = {};
let permissions = [{module: 'root', permissions: true}];
const cachedPermissions = {};
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

function create(constructor, ...args) {
  const Factory = constructor.bind.apply(constructor, [constructor, ...args]);
  return new Factory();
}

const getModulePermissions = (module) => {
  if (devMode) {
    return true;
  }

  if (Object.keys(cachedPermissions).includes(module)) {
    return cachedPermissions[module];
  }

  const exactMatch = permissions.find(({module: mod}) => mod === module);
  if (exactMatch) {
    cachedPermissions[module] = exactMatch.permissions;
    return exactMatch.permissions;
  }

  const regexMatch = permissions.find(
    ({module: mod}) => mod instanceof RegExp && module.match(mod),
  );
  if (regexMatch) {
    cachedPermissions[module] = regexMatch.permissions;
    return regexMatch.permissions;
  }

  cachedPermissions[module] = false;
  return false;
};

const isModuleAllowedToExecute = (module, family, method) => {
  const modulePermissions = getModulePermissions(module);

  if (typeof modulePermissions === 'boolean') {
    return modulePermissions;
  }

  if (Array.isArray(modulePermissions)) {
    return (
      modulePermissions.includes(family.name) ||
      modulePermissions.includes(`${family.name}:${method.name}`)
    );
  }

  return false;
};

const getCurrentModule = () => {
  try {
    const stack = currentStack()
      .reverse()
      .map((item) => {
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

const init = ({
  loadSourceMaps = currentPlatform === PLATFORMS.WEB,
  devMode: devModeOption = false,
  verbose = false,
  skipTracking: skipTrackingOption = false,
  trackingIP,
  trackingPort,
  ignoreChromeExtensions: ignoreChromeExtensionsOption = true,
  trustedModules: additionallyTrustedModules = [],
  permissions: permissionsOption = [],
  allowInitFrom = 'root',
} = {}) => {
  try {
    if (isInitialized()) {
      logger.warn('already initialized');
      return Promise.resolve();
    }

    const {name: callerModule} = getCurrentModule();
    if (
      (allowInitFrom instanceof RegExp && !callerModule.match(allowInitFrom)) ||
      (typeof allowInitFrom === 'string' && callerModule !== allowInitFrom) ||
      (!(allowInitFrom instanceof RegExp) && typeof allowInitFrom !== 'string')
    ) {
      logger.warn(`only root or specified module may call init (called from ${callerModule})`);
      return Promise.resolve();
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
    setTrackingServer(trackingIP, trackingPort);

    if (!Array.isArray(additionallyTrustedModules)) {
      logger.warn('trustedModules option must be an array, defaulting to empty array');
    } else {
      trustedModules = [...trustedModules, ...additionallyTrustedModules];
    }

    ignoreChromeExtensions = !!ignoreChromeExtensionsOption;

    if (!Array.isArray(permissionsOption)) {
      logger.warn('permissions option must be an array, defaulting to empty array');
    } else {
      permissions = [...permissions, ...permissionsOption];
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
              logger.debug(`${module} called ${family.name}.${method.name}`);
              const allowed = isModuleAllowedToExecute(module, family, method);
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

              logger.error(
                `${module} was blocked from calling ${family.name}.${method.name} with`,
                args,
              );

              throw new SandwormError(
                `Sandworm: access denied (${module} called ${family.name}.${method.name})`,
              );
            }
            // eslint-disable-next-line no-restricted-syntax
            for (const prop in method.original) {
              if (Object.prototype.hasOwnProperty.call(method.original, prop)) {
                replacement[prop] = method.original[prop];
              }
            }
            replacement.prototype = method.original.prototype;
            // eslint-disable-next-line no-param-reassign
            family.originalRoot()[method.name] = replacement;
          }
        });
      }
    });

    setInitialized();

    return (async () => {
      try {
        if (loadSourceMaps) {
          if (loadSourceMaps === true) {
            // Grab source map for invoker file
            const site = currentStack()[1];
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
    })();
  } catch (error) {
    logger.error(error);
    ready = true;
    logger.debug('initialized with errors');
    return Promise.resolve();
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

export default {init, getHistory, clearHistory, Error: SandwormError};
