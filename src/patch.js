import logger from './logger';
import {getCurrentModuleInfo, isModuleAllowedToExecute} from './module';

export class SandwormError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SandwormError';
  }
}

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
      error,
    } = getCurrentModuleInfo({
      allowURLs: true,
    });

    if (
      typeof method.minArgsToTrigger === 'number' &&
      (args?.length || 0) < method.minArgsToTrigger
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
      // eslint-disable-next-line no-param-reassign
      method.original = family.originalRoot()[method.name];
      if (method.original) {
        logger.debug(`installing ${family.name}.${method.name}`);
        // eslint-disable-next-line no-param-reassign
        method.originalBind = method.original.bind;
        // eslint-disable-next-line func-names
        const replacement = buildPatch(family, method, track);
        // eslint-disable-next-line no-restricted-syntax
        for (const prop in method.original) {
          if (Object.prototype.hasOwnProperty.call(method.original, prop)) {
            replacement[prop] = method.original[prop];
          }
        }
        replacement.prototype = method.original.prototype;
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
