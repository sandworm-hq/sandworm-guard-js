import logger from './logger';
import {getCurrentModuleInfo, isModuleAllowedToExecute} from './module';

let ignoreExtensions = true;

export const setIgnoreExtensions = (ignoreExtensionsOption) => {
  ignoreExtensions = !!ignoreExtensionsOption;
};

export class SandwormError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SandwormError';
  }
}

// Create a new object from a class constructor + args
function create(constructor, ...args) {
  const Factory = constructor.bind.apply(constructor, [constructor, ...args]);
  return new Factory();
}

const buildPatch = (family, method, track = () => {}) =>
  // eslint-disable-next-line func-names
  function (...args) {
    let allowed;
    const {
      name: module,
      stack,
      directCaller,
      lastModuleCaller,
      isExtension,
      error,
    } = getCurrentModuleInfo({
      allowURLs: true,
    });

    // In some scenarios, we want to just pass-through the method
    // without checking for permissions or tracking to the inspector:
    if (
      // Like if the method only triggers when using a min number of arguments
      (typeof method.minArgsToTrigger === 'number' &&
        (args?.length || 0) < method.minArgsToTrigger) ||
      // Or if we're ignoring browser extension traffic
      (ignoreExtensions && isExtension)
    ) {
      allowed = true;
    } else {
      logger.debug(`${module} called ${family.name}.${method.name}`);
      allowed = isModuleAllowedToExecute({
        module,
        family,
        method,
        directCaller,
        lastModuleCaller,
      });
      track({
        module,
        family: family.name,
        method: method.name,
        args,
        allowed,
        stack,
        error,
      });
    }

    if (allowed) {
      if (method.isConstructor) {
        return create(method.original, ...args);
      }
      return method.original.apply(this, args);
    }

    logger.error(`${module} was blocked from calling ${family.name}.${method.name} with`, args);

    throw new SandwormError(
      `Sandworm: access denied (${module} called ${family.name}.${method.name})`,
    );
  };

export default ({family, track = () => {}}) => {
  if (family.available) {
    family.methods.forEach((method) => {
      // Save a reference to the original method
      // eslint-disable-next-line no-param-reassign
      method.original = family.originalRoot()[method.name];
      if (method.original) {
        logger.debug(`installing ${family.name}.${method.name}`);
        // Save a reference to the original `method.bind`
        // eslint-disable-next-line no-param-reassign
        method.originalBind = method.original.bind;
        // Create a thin replacement that wraps the original method call
        // eslint-disable-next-line func-names
        const replacement = buildPatch(family, method, track);
        // Save all original properties to the replacement
        // eslint-disable-next-line no-restricted-syntax
        for (const prop in method.original) {
          if (Object.prototype.hasOwnProperty.call(method.original, prop)) {
            replacement[prop] = method.original[prop];
          }
        }
        replacement.prototype = method.original.prototype;
        // Also intercept `method.bind` when called with more than one arg
        replacement.bind = buildPatch(
          {name: 'bind'},
          {name: 'args', original: method.originalBind, minArgsToTrigger: 2},
          track,
        );
        // eslint-disable-next-line no-param-reassign
        family.originalRoot()[method.name] = replacement;
      }
    });
  }
};
