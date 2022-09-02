import {originalPositionFor} from '@jridgewell/trace-mapping';

import logger from './logger';
import {currentStack} from './stack';

const cachedPermissions = {};
const defaultPermissions = {module: 'root', permissions: true};
let permissions = [defaultPermissions];
let trustedModules = ['sandworm', 'react-dom', 'scheduler'];
let ignoreExtensions = true;
const sourcemaps = {};

export const addSourceMap = (file, map) => {
  sourcemaps[file] = map;
};

export const addTrustedModules = (additionalTrustedModules) => {
  trustedModules = [...trustedModules, ...additionalTrustedModules];
};

export const setIgnoreExtensions = (ignoreExtensionsOption) => {
  ignoreExtensions = !!ignoreExtensionsOption;
};

export const setPermissions = (newPermissions = []) => {
  if (!Array.isArray(newPermissions)) {
    return;
  }

  if (newPermissions.findIndex(({module}) => module === 'root') !== -1) {
    permissions = [...newPermissions];
  } else {
    // If no 'root' permissions specified, default to true
    // This will still throw on things like `eval` or `vm.runInContext`
    permissions = [defaultPermissions, ...newPermissions];
  }
};

export const setAllowsAll = (library) => {
  const allExplicitPermissions = ['bind', ...library.map(({name}) => name)];
  permissions = [
    {module: /.*/, permissions: allExplicitPermissions},
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
    const originalItem = originalPositionFor(sourcemaps[originalFile], {
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

  if (location.startsWith('node:')) {
    // locations like node:internal/modules/cjs/loader should map to node:internal
    // node:fs should map to node:fs
    return location.split('/')[0];
  }

  if (location.includes('node_modules')) {
    const components = location.split('/');
    const nodeModulesIndex = components.findIndex((v) => v === 'node_modules');
    let moduleName = components[nodeModulesIndex + 1];
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
  if (allowURLs) {
    let url;
    try {
      url = new URL(location);
      // eslint-disable-next-line no-empty
    } catch (error) {}
    if (url) {
      return location;
    }
  }

  return 'root';
};

export const getCurrentModuleInfo = ({stack: stackInput, allowURLs = false} = {}) => {
  try {
    const stack = (stackInput || currentStack())
      .map((item) => mapStackItemToSource(item, sourcemaps))
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

    const directCaller = stack.find(({module}) => module !== 'sandworm');
    const lastModuleCaller = stack.find(
      ({module}) => module !== 'sandworm' && module !== undefined && !module.startsWith('node:'),
    );

    const modules = stack
      .reverse()
      .map(({module}) =>
        module === 'root' || trustedModules.includes(module) || module?.startsWith('node:')
          ? undefined
          : module,
      )
      .filter((v) => v !== undefined);
    let name = 'root';

    if (modules.length) {
      if (
        ignoreExtensions &&
        (modules[0].startsWith('chrome-extension://') || modules[0].startsWith('moz-extension://'))
      ) {
        name = 'root';
      } else if (modules[0] === modules[modules.length - 1]) {
        [name] = modules;
      } else {
        name = modules.filter((v, i, a) => a.indexOf(v) === i).join('>');
      }
    }

    return {name, stack, directCaller, lastModuleCaller};
  } catch (error) {
    logger.error(error);
    return {name: 'root', error: error.message};
  }
};

export const getModulePermissions = (module) => {
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

export const isModuleAllowedToExecute = ({
  module,
  family,
  method,
  directCaller,
  lastModuleCaller,
}) => {
  if (directCaller?.module?.startsWith?.('node:')) {
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
  if (typeof modulePermissions === 'boolean' && !method.needsExplicitPermission) {
    return modulePermissions;
  }

  if (Array.isArray(modulePermissions)) {
    return (
      modulePermissions.includes(family.name) ||
      modulePermissions.includes(`${family.name}.${method.name}`) ||
      (!method.needsExplicitPermission && modulePermissions.includes('*'))
    );
  }

  return false;
};
