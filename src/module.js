import logger from './logger';
import {currentStack} from './stack';

const cachedPermissions = {};
let permissions = [{module: 'root', permissions: true}];
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

export const setPermissions = (newPermissions) => {
  permissions = newPermissions;
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
  if (location && location.includes('node_modules')) {
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
    if (url && url.protocol !== 'node:') {
      return location;
    }
  }

  return undefined;
};

export const getCurrentModule = ({stack: stackInput, allowURLs = false} = {}) => {
  try {
    const stack = (stackInput || currentStack())
      .reverse()
      .map((item) => mapStackItemToSource(item, sourcemaps))
      .map(({item, mapping, mappingLine, mappingColumn}) => {
        const module = getModuleNameFromLocation(mapping, allowURLs);

        return {
          caller: item.caller,
          file: item.file,
          fileLine: item.line,
          fileColumn: item.column,
          mapping,
          mappingLine,
          mappingColumn,
          module: trustedModules.includes(module) ? undefined : module,
        };
      });

    const modules = stack.map(({module}) => module).filter((v) => v !== undefined);
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

    return {name, stack};
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

export const isModuleAllowedToExecute = ({module, family, method}) => {
  const modulePermissions = getModulePermissions(module, permissions);
  if (typeof modulePermissions === 'boolean') {
    return modulePermissions;
  }

  if (Array.isArray(modulePermissions)) {
    return (
      modulePermissions.includes(family.name) ||
      modulePermissions.includes(`${family.name}.${method.name}`)
    );
  }

  return false;
};
