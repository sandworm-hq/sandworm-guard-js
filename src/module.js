import logger from './logger';
import {currentStack} from './stack';

const cachedPermissions = {};
const defaultPermissions = {module: 'root', permissions: true};
let permissions = [defaultPermissions];
let trustedModules = ['sandworm', 'react-dom', 'scheduler'];

const sourcemaps = {};

export const addSourceMap = (file, map) => {
  sourcemaps[file] = map;
};

export const addTrustedModules = (additionalTrustedModules) => {
  trustedModules = [...trustedModules, ...additionalTrustedModules];
};

export const setPermissions = (newPermissions = []) => {
  if (!Array.isArray(newPermissions)) {
    return;
  }

  if (newPermissions.findIndex(({module}) => module === 'root') !== -1) {
    permissions = [...newPermissions];
  } else {
    // If no 'root' permissions specified, insert the default
    // This will still throw on things like `eval` or `vm.runInContext`
    permissions = [defaultPermissions, ...newPermissions];
  }
};

export const setAllowsAll = (library) => {
  // Create an array of available family names
  // This will explicitly allow access to everything Sandworm intercepts
  // Including arbitrary code execution methods
  const allExplicitPermissions = ['bind', ...library.map(({name}) => name)];
  permissions = [
    // A RegExp that catches everything
    {module: /.*/, permissions: allExplicitPermissions},
    // Explicitly set `root` permissions, so they don't get overwritten by lower priviledge defaults
    {module: 'root', permissions: allExplicitPermissions},
  ];
};

export const mapStackItemToSource = (item) => {
  const originalFile = item?.file;
  // Tap sourcemaps for original file src
  let mapping = originalFile;
  let mappingLine = item?.line;
  let mappingColumn = item?.column;
  if (originalFile && sourcemaps?.[originalFile]) {
    const originalItem = sourcemaps[originalFile].originalPositionFor({
      line: item.line,
      column: item.column,
    });
    mapping = originalItem.source;
    mappingLine = originalItem.line;
    mappingColumn = originalItem.column;
  }

  return {
    item,
    mapping,
    mappingLine,
    mappingColumn,
  };
};

export const getModuleNameFromLocation = (location, allowURLs) => {
  // Infer the module name
  if (!location || typeof location !== 'string') {
    return undefined;
  }

  // Label locations coming from inside Node
  if (location.startsWith('node:')) {
    // locations like node:internal/modules/cjs/loader should map to node:internal
    // node:fs should map to node:fs
    return location.split('/')[0];
  }

  // Label packages
  if (location.includes('node_modules')) {
    const components = location.split('/');
    const nodeModulesIndex = components.findIndex((v) => v === 'node_modules');
    let moduleName = components[nodeModulesIndex + 1];
    // Names starting with `@` are organizations, so it's good to get
    // a bit more context by also grabbing the next path component
    if (moduleName.startsWith('@')) {
      const submodule = components[nodeModulesIndex + 2];
      if (submodule) {
        moduleName = `${moduleName}/${submodule}`;
      }
    }
    return moduleName;
  }

  // Treat URLs as separate modules
  // These are usually scripts loaded from external sources, like directly from a CDN
  if (allowURLs && location.includes('://')) {
    return location;
  }

  return 'root';
};

export const getCurrentModuleInfo = ({stack: stackInput, allowURLs = false} = {}) => {
  try {
    const stack = (stackInput || currentStack())
      // If we have sourcemap info, trace calls back to the original files
      .map((item) => mapStackItemToSource(item, sourcemaps))
      // Augment with module names
      .map(({item, mapping, mappingLine, mappingColumn}) => {
        const module = getModuleNameFromLocation(mapping, allowURLs);

        return {
          caller: item.caller,
          called: item.called,
          name: item.name,
          alias: item.alias,
          file: item.file,
          fileLine: item.line,
          fileColumn: item.column,
          mapping,
          mappingLine,
          mappingColumn,
          module,
        };
      });

    // Get the name of the module that was responsible for directly invoking the method
    // that was intercepted by Sandworm.
    const directCaller = stack.find(({module}) => module !== 'sandworm');
    // Get the name of the user-space module that was responsible for triggering the call chain
    // that led to the Sandworm-intercepted method being invoked.
    // If `directCaller` was something from Node internals, this should point to the OG caller.
    const lastModuleCaller = stack.find(
      ({module}) => module !== 'sandworm' && module !== undefined && !module.startsWith('node:'),
    );

    const modules = stack
      // Stack is LIFO, call path is FIFO
      .reverse()
      // We want to remove module names marked as trusted from the call path
      // We also want to remove Node internals
      .map(({module}) =>
        module === 'root' || trustedModules.includes(module) || module?.startsWith('node:')
          ? undefined
          : module,
      )
      .filter((v) => v !== undefined);
    let name = 'root';
    let isExtension = false;

    if (modules.length) {
      if (modules[0] === modules[modules.length - 1]) {
        [name] = modules;
      } else {
        name = modules.filter((v, i, a) => a.indexOf(v) === i).join('>');
      }

      // Detect if any items in the stack are browser extensions
      isExtension = !!modules.find(
        (m) => m.startsWith('chrome-extension://') || m.startsWith('moz-extension://'),
      );
    }

    return {name, stack, directCaller, lastModuleCaller, isExtension};
  } catch (error) {
    logger.error(error);
    return {name: 'root', error: error.message};
  }
};

export const getModulePermissions = (module) => {
  // To improve performance while also supporting RegExp in permission descriptor module fields,
  // we keep a cache of permissions. Search there first.
  if (Object.keys(cachedPermissions).includes(module)) {
    return cachedPermissions[module];
  }

  // Next, look for an exact string match. Most common scenario
  // This makes it possible to override RegExp.
  const exactMatch = permissions.find(({module: mod}) => mod === module);
  if (exactMatch) {
    cachedPermissions[module] = exactMatch.permissions;
    return exactMatch.permissions;
  }

  // Next, try to match RegExp, if any
  const regexMatch = permissions.find(
    ({module: mod}) => mod instanceof RegExp && module.match(mod),
  );
  if (regexMatch) {
    cachedPermissions[module] = regexMatch.permissions;
    return regexMatch.permissions;
  }

  // Default to no permissions
  cachedPermissions[module] = false;
  return false;
};

export const isModuleAllowedToExecute = ({
  module,
  family,
  method,
  directCaller,
  lastModuleCaller,
}) => {
  // If the intercepted method was called directly from Node internals
  // allow it to execute, since it was triggered by another Node API call
  // that was previously allowed by Sandworm.
  // Don't allow this for any high-risk methods, since `process.dlopen` could be triggered by
  // a require to a `.node` file.
  if (directCaller?.module?.startsWith?.('node:') && !method.needsExplicitPermission) {
    logger.debug(
      '-> call has been allowed',
      lastModuleCaller
        ? `as a consequence of \`${lastModuleCaller.module}\` calling \`${
            lastModuleCaller.alias || lastModuleCaller.name
          }.${lastModuleCaller.called}\``
        : '',
    );
    return true;
  }

  const modulePermissions = getModulePermissions(module, permissions);

  // Some methods are labeled as particularly dangerous and are not included by the
  // `permissions: true` umbrella setting.
  // These methods need to be explicitly typed out in a permissions array
  if (typeof modulePermissions === 'boolean' && !method.needsExplicitPermission) {
    return modulePermissions;
  }

  if (Array.isArray(modulePermissions)) {
    return (
      // Just the family name will include access to all family methods
      modulePermissions.includes(family.name) ||
      // Or allow a single method
      modulePermissions.includes(`${family.name}.${method.name}`) ||
      // Or allow any method that does not need explicit permissions
      // `permissions: ['*']` is equivalent to `permissions: true`
      (!method.needsExplicitPermission && modulePermissions.includes('*'))
    );
  }

  return false;
};
