import {currentStack} from './stack';
import {getSourceMap, getSourceMapFromSource} from './source';
import platform, {PLATFORMS} from './platform';
import webLibrary from './library/web';
import nodeLibrary from './library/node';
import logger from './logger';
import track, {setSkipTracking, setTrackingServer} from './track';
import {
  addSourceMap,
  addTrustedModules,
  getCurrentModuleInfo,
  setAllowsAll,
  setIgnoreExtensions,
  setPermissions,
} from './module';
import patch, {SandwormError} from './patch';

let initialized = false;
let ready = false;
let history = [];
let devMode = false;
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

const init = ({
  loadSourceMaps = currentPlatform === PLATFORMS.WEB,
  devMode: devModeOption = false,
  verbose = false,
  skipTracking: skipTrackingOption = false,
  trackingIP,
  trackingPort,
  ignoreExtensions: ignoreExtensionsOption = true,
  trustedModules: additionalTrustedModules = [],
  permissions: permissionsOption = [],
  allowInitFrom = 'root',
} = {}) => {
  try {
    if (isInitialized()) {
      logger.warn('already initialized');
      return Promise.resolve();
    }

    const {name: callerModule} = getCurrentModuleInfo({
      allowURLs: false,
    });
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

    if (verbose === true) {
      logger.level = 'debug';
    }

    setSkipTracking(skipTrackingOption);
    setTrackingServer(trackingIP, trackingPort);

    if (!Array.isArray(additionalTrustedModules)) {
      logger.warn('trustedModules option must be an array, defaulting to empty array');
    } else {
      addTrustedModules(additionalTrustedModules);
    }

    setIgnoreExtensions(ignoreExtensionsOption);

    let library = [];

    if (currentPlatform === PLATFORMS.WEB) {
      library = webLibrary();
    } else if (currentPlatform === PLATFORMS.NODE) {
      library = nodeLibrary();
    } else {
      logger.debug('current platform is not supported');
    }

    if (devMode) {
      // Explicitly allow all families for all modules in dev mode
      setAllowsAll(library);
    } else if (permissionsOption) {
      if (!Array.isArray(permissionsOption)) {
        logger.warn('permissions option must be an array, defaulting to empty array');
      } else {
        setPermissions(permissionsOption);
      }
    }

    // Monkey patches
    library.forEach((family) => {
      patch({
        family,
        track: (event) => {
          if (devMode && ready) {
            history.push(event);
            track(event);
          }
        },
      });
    });

    setInitialized();

    return (async () => {
      try {
        if (loadSourceMaps) {
          if (loadSourceMaps === true) {
            // Grab source map for invoker file
            const site = currentStack()[1];
            const currentSourceUrl = site.file;

            addSourceMap(currentSourceUrl, await getSourceMapFromSource(currentSourceUrl));
          } else if (isObject(loadSourceMaps)) {
            (
              await Promise.all(
                Object.keys(loadSourceMaps).map(async (sourceUrl) => [
                  sourceUrl,
                  await getSourceMap(loadSourceMaps[sourceUrl]),
                ]),
              )
            ).forEach(([sourceUrl, sourcemap]) => {
              addSourceMap(sourceUrl, sourcemap);
            });
          }
          logger.debug('loaded source maps');
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
