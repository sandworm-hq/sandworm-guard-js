import Stack from './stack';
import {getSourceMap} from './source';
import platform, {PLATFORMS} from './platform';
import webLibrary from './library/web';
import nodeLibrary from './library/node';
import logger from './logger';

let initialized = false;
const ignoredModules = ['react-dom', 'scheduler'];
const sourcemaps = {};
let history = [];
let devMode = false;

function create(constructor) {
  // eslint-disable-next-line prefer-spread,prefer-rest-params
  const Factory = constructor.bind.apply(constructor, arguments);
  return new Factory();
}

const getCurrentModule = () => {
  try {
    const stack = new Stack();
    let module = null;

    stack?.items?.forEach?.((site) => {
      let sourceUrl = site.file;

      if (sourceUrl && sourcemaps[sourceUrl]) {
        sourceUrl = sourcemaps[sourceUrl].originalPositionFor({
          line: site.line,
          column: site.column,
        }).source;
      }

      if (sourceUrl && sourceUrl.includes('node_modules')) {
        const siteModule =
          sourceUrl.split('/')[sourceUrl.split('/').findIndex((v) => v === 'node_modules') + 1];
        if (!ignoredModules.includes(siteModule)) {
          module = siteModule;
        }
      }
    });
    return module;
  } catch (error) {
    logger.error(error);
    return null;
  }
};

const init = async ({loadSourceMap = false, devMode: devModeOption = false} = {}) => {
  if (initialized) {
    logger.debug('already initialized');
    return;
  }

  devMode = devModeOption;

  try {
    let library = [];
    const currentPlatform = platform();

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
              const module = getCurrentModule();
              logger.debug(`${module || 'root'} called ${family.name}.${method.name} with`, args);
              if (devMode) {
                history.push({
                  module: module || 'root',
                  family: family.name,
                  method: method.name,
                  args,
                });
              }
              if (method.isConstructor) {
                return create(method.original, ...args);
              }
              return method.original.apply(this, args);
            }
            replacement.prototype = method.original.prototype;
            // eslint-disable-next-line no-param-reassign
            family.originalRoot()[method.name] = replacement;
          }
        });
      }
    });

    initialized = true;

    if (loadSourceMap) {
      // Grab default source map
      const stack = new Stack();
      const site = stack.items[1];
      const sourceUrl = site.file;

      sourcemaps[sourceUrl] = await getSourceMap(sourceUrl);
    }
  } catch (error) {
    logger.error(error);
  } finally {
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
