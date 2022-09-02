import fs from 'fs';
import path from 'path';
import {SourceMapConsumer} from 'source-map-js';
import {
  addSourceMap,
  addTrustedModules,
  getCurrentModuleInfo,
  getModuleNameFromLocation,
  getModulePermissions,
  isModuleAllowedToExecute,
  mapStackItemToSource,
  setAllowsAll,
  setPermissions,
} from '../../src/module';

describe('module', () => {
  test('getModulePermissions', () => {
    setPermissions([{module: /.*/, permissions: true}]);
    expect(getModulePermissions('test')).toBeTruthy();

    // Basic use case
    setPermissions([
      {module: 'foo', permissions: ['family.method']},
      {module: 'bar', permissions: ['another.method']},
    ]);
    expect(getModulePermissions('foo')).toStrictEqual(['family.method']);

    // Regex use case
    // Only the first match should be returned
    setPermissions([
      {module: /test/, permissions: ['family.method']},
      {module: /another/, permissions: ['another.method']},
      {module: 'bar', permissions: ['another.method']},
    ]);
    expect(getModulePermissions('another>test')).toStrictEqual(['family.method']);

    // Text cache
    // Although module is explicitly specified, cached value should be returned
    setPermissions([
      {module: /test/, permissions: ['another.method1']},
      {module: 'another>test', permissions: ['another.method2']},
    ]);
    expect(getModulePermissions('another>test')).toStrictEqual(['family.method']);

    // Test explicit module value
    // Although regex matches, explicit value should be returned
    setPermissions([
      {module: /test/, permissions: ['another.method1']},
      {module: 'explicit>test', permissions: ['another.method2']},
    ]);
    expect(getModulePermissions('explicit>test')).toStrictEqual(['another.method2']);

    // Test no match
    expect(getModulePermissions('other')).toBeFalsy();
  });

  test('mapStackItemToSource', () => {
    expect(mapStackItemToSource()).toStrictEqual({
      item: undefined,
      mapping: undefined,
      mappingLine: undefined,
      mappingColumn: undefined,
    });

    expect(mapStackItemToSource({file: ''})).toStrictEqual({
      item: {file: ''},
      mapping: '',
      mappingLine: undefined,
      mappingColumn: undefined,
    });

    const sourcemap = new SourceMapConsumer(
      fs.readFileSync(path.join(__dirname, 'nosources-cheap-source-map', 'main.js.map'), 'utf8'),
    );

    addSourceMap('main.js', sourcemap);
    const mapping1 = mapStackItemToSource({file: 'main.js', line: 17322, column: 3});
    expect(mapping1.mapping).toBe('webpack://playground/src/index.js');
    expect(mapping1.mappingLine).toBe(5);
    expect(mapping1.mappingColumn).toBe(0);

    const mapping2 = mapStackItemToSource({file: 'main.js', line: 15160, column: 3});
    expect(mapping2.mapping).toBe('webpack://playground/node_modules/lodash/lodash.js');
    expect(mapping2.mappingLine).toBe(15150);
    expect(mapping2.mappingColumn).toBe(0);
  });

  test('isModuleAllowedToExecute', () => {
    setPermissions([
      {module: 'imate>one', permissions: true},
      {module: 'imate>two', permissions: ['other.method', 'family']},
      {module: 'imate>three', permissions: ['imate.method', '*']},
      {module: /anything/, permissions: ['other.method']},
      {module: 'not-anything', permissions: false},
    ]);

    expect(
      isModuleAllowedToExecute({
        module: 'imate>one',
        family: {name: 'imate'},
        method: {name: 'method'},
      }),
    ).toBeTruthy();

    expect(
      isModuleAllowedToExecute({
        module: 'imate>one',
        family: {name: 'imate'},
        method: {name: 'method', needsExplicitPermission: true},
      }),
    ).toBeFalsy();

    expect(
      isModuleAllowedToExecute({
        module: 'imate>one',
        family: {name: 'imate'},
        method: {name: 'method', needsExplicitPermission: true},
        directCaller: {module: 'node:internal'},
      }),
    ).toBeTruthy();

    expect(
      isModuleAllowedToExecute({
        module: 'imate>two',
        family: {name: 'imate'},
        method: {name: 'method'},
      }),
    ).toBeFalsy();

    expect(
      isModuleAllowedToExecute({
        module: 'imate>two',
        family: {name: 'other'},
        method: {name: 'method'},
      }),
    ).toBeTruthy();

    expect(
      isModuleAllowedToExecute({
        module: 'here>anythingGoes',
        family: {name: 'other'},
        method: {name: 'method'},
      }),
    ).toBeTruthy();

    expect(
      isModuleAllowedToExecute({
        module: 'not-anything',
        family: {name: 'other'},
        method: {name: 'method'},
      }),
    ).toBeFalsy();

    expect(
      isModuleAllowedToExecute({
        module: 'imate>two',
        family: {name: 'family'},
        method: {name: 'anything'},
      }),
    ).toBeTruthy();

    expect(
      isModuleAllowedToExecute({
        module: 'imate>three',
        family: {name: 'imate'},
        method: {name: 'method', needsExplicitPermission: true},
      }),
    ).toBeTruthy();

    expect(
      isModuleAllowedToExecute({
        module: 'imate>three',
        family: {name: 'imate'},
        method: {name: 'random'},
      }),
    ).toBeTruthy();

    expect(
      isModuleAllowedToExecute({
        module: 'imate>four',
        family: {name: 'other'},
        method: {name: 'method'},
      }),
    ).toBeFalsy();

    setAllowsAll([{name: 'file'}]);

    expect(
      isModuleAllowedToExecute({
        module: 'imate>five',
        family: {name: 'file'},
        method: {name: 'random'},
      }),
    ).toBeTruthy();

    expect(
      isModuleAllowedToExecute({
        module: 'last-test',
        family: {name: 'file'},
        method: {name: 'delete', needsExplicitPermission: true},
      }),
    ).toBeTruthy();
  });

  test('getModuleNameFromLocation', () => {
    expect(getModuleNameFromLocation()).toBeUndefined();

    expect(
      getModuleNameFromLocation('/Users/jason/code/sandworm/tests/node/prod/stack.test.js'),
    ).toBe('root');

    expect(
      getModuleNameFromLocation('/Users/jason/code/sandworm/node_modules/lodash/lodash.js'),
    ).toBe('lodash');

    expect(
      getModuleNameFromLocation('/Users/jason/code/sandworm/node_modules/@apollo/client/index.js'),
    ).toBe('@apollo/client');

    expect(getModuleNameFromLocation('http://localhost:3000/static/js/bundle.js')).toBe('root');

    expect(getModuleNameFromLocation('http://localhost:3000/static/js/bundle.js', true)).toBe(
      'http://localhost:3000/static/js/bundle.js',
    );

    expect(
      getModuleNameFromLocation(
        'chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/react_devtools_backend.js',
        true,
      ),
    ).toBe('chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/react_devtools_backend.js');

    expect(getModuleNameFromLocation('node:https')).toBe('node:https');
    expect(getModuleNameFromLocation('node:internal/modules/cjs/loader')).toBe('node:internal');
  });

  test('getCurrentModuleInfo', () => {
    // Basic uses
    expect(getCurrentModuleInfo({stack: []}).name).toBe('root');
    expect(getCurrentModuleInfo({stack: [{file: 'app.js', line: 1, column: 1}]}).name).toBe('root');
    expect(
      getCurrentModuleInfo({
        stack: [{file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1}],
      }).name,
    ).toBe('module-name');
    expect(
      getCurrentModuleInfo({
        stack: [
          {file: 'app.js', line: 1, column: 1},
          {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
        ],
      }).name,
    ).toBe('module-name');

    // Composite chains
    expect(
      getCurrentModuleInfo({
        stack: [
          {file: 'project/node_modules/other/root.js', line: 1, column: 1},
          {file: 'app.js', line: 1, column: 1},
          {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
        ],
      }).name,
    ).toBe('module-name>other');

    // Ignore URLs by default
    expect(
      getCurrentModuleInfo({
        stack: [
          {file: 'project/node_modules/other/root.js', line: 1, column: 1},
          {file: 'app.js', line: 1, column: 1},
          {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
          {file: 'chrome-extension://214324234523/test.js', line: 1, column: 1},
        ],
      }).name,
    ).toBe('module-name>other');

    expect(
      getCurrentModuleInfo({
        stack: [
          {file: 'project/node_modules/other/root.js', line: 1, column: 1},
          {file: 'app.js', line: 1, column: 1},
          {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
          {file: 'chrome-extension://214324234523/test.js', line: 1, column: 1},
        ],
        allowURLs: true,
      }).name,
    ).toBe('chrome-extension://214324234523/test.js>module-name>other');

    expect(
      getCurrentModuleInfo({
        stack: [
          {file: 'project/node_modules/other/root.js', line: 1, column: 1},
          {file: 'app.js', line: 1, column: 1},
          {file: 'moz-extension://214324234523/test.js', line: 1, column: 1},
          {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
        ],
        allowURLs: true,
      }).isExtension,
    ).toBeTruthy();

    // Ignore URLs by default
    expect(
      getCurrentModuleInfo({
        stack: [
          {file: 'project/node_modules/other/root.js', line: 1, column: 1},
          {file: 'app.js', line: 1, column: 1},
          {file: 'https://googletagmanager.com/tag/2reiwfgr', line: 1, column: 1},
        ],
      }).name,
    ).toBe('other');

    // Allow URLs
    expect(
      getCurrentModuleInfo({
        stack: [
          {file: 'project/node_modules/other/root.js', line: 1, column: 1},
          {file: 'app.js', line: 1, column: 1},
          {file: 'https://googletagmanager.com/tag/2reiwfgr', line: 1, column: 1},
        ],
        allowURLs: true,
      }).name,
    ).toBe('https://googletagmanager.com/tag/2reiwfgr>other');

    // Ignore trusted modules
    addTrustedModules(['other']);
    expect(
      getCurrentModuleInfo({
        stack: [
          {file: 'project/node_modules/other/root.js', line: 1, column: 1},
          {file: 'app.js', line: 1, column: 1},
          {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
        ],
      }).name,
    ).toBe('module-name');

    expect(
      getCurrentModuleInfo({
        stack: [
          {file: 'project/node_modules/sandworm/root.js', line: 1, column: 1},
          {file: 'app.js', line: 1, column: 1},
          {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
        ],
      }).directCaller.module,
    ).toBe('root');

    expect(
      getCurrentModuleInfo({
        stack: [
          {file: 'project/node_modules/sandworm/root.js', line: 1, column: 1},
          {file: 'node:internal/modules/cjs/loader', line: 1, column: 1},
          {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
        ],
      }).directCaller.module,
    ).toBe('node:internal');

    expect(
      getCurrentModuleInfo({
        stack: [
          {file: 'project/node_modules/sandworm/root.js', line: 1, column: 1},
          {file: 'node:internal/modules/cjs/loader', line: 1, column: 1},
          {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
        ],
      }).lastModuleCaller.module,
    ).toBe('module-name');
  });
});
