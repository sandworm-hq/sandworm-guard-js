import fs from 'fs';
import path from 'path';
import {SourceMapConsumer} from 'source-map-js';
import {
  addSourceMap,
  addTrustedModules,
  getCurrentModule,
  getModuleNameFromLocation,
  getModulePermissions,
  isModuleAllowedToExecute,
  mapStackItemToSource,
  setIgnoreExtensions,
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
        family: {name: 'other'},
        method: {name: 'method'},
      }),
    ).toBeFalsy();
  });

  test('getModuleNameFromLocation', () => {
    expect(
      getModuleNameFromLocation('/Users/jason/code/sandworm/tests/node/prod/stack.test.js'),
    ).toBeUndefined();

    expect(
      getModuleNameFromLocation('/Users/jason/code/sandworm/node_modules/lodash/lodash.js'),
    ).toBe('lodash');

    expect(
      getModuleNameFromLocation('/Users/jason/code/sandworm/node_modules/@apollo/client/index.js'),
    ).toBe('@apollo/client');

    expect(getModuleNameFromLocation('http://localhost:3000/static/js/bundle.js')).toBeUndefined();

    expect(getModuleNameFromLocation('http://localhost:3000/static/js/bundle.js', true)).toBe(
      'http://localhost:3000/static/js/bundle.js',
    );

    expect(
      getModuleNameFromLocation(
        'chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/react_devtools_backend.js',
        true,
      ),
    ).toBe('chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/react_devtools_backend.js');

    expect(getModuleNameFromLocation('node:https')).toBeUndefined();
  });

  test('getCurrentModule', () => {
    // Basic uses
    expect(getCurrentModule({stack: []}).name).toBe('root');
    expect(getCurrentModule({stack: [{file: 'app.js', line: 1, column: 1}]}).name).toBe('root');
    expect(
      getCurrentModule({
        stack: [{file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1}],
      }).name,
    ).toBe('module-name');
    expect(
      getCurrentModule({
        stack: [
          {file: 'app.js', line: 1, column: 1},
          {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
        ],
      }).name,
    ).toBe('module-name');

    // Composite chains
    expect(
      getCurrentModule({
        stack: [
          {file: 'project/node_modules/other/root.js', line: 1, column: 1},
          {file: 'app.js', line: 1, column: 1},
          {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
        ],
      }).name,
    ).toBe('module-name>other');

    // Ignore URLs by default
    expect(
      getCurrentModule({
        stack: [
          {file: 'project/node_modules/other/root.js', line: 1, column: 1},
          {file: 'app.js', line: 1, column: 1},
          {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
          {file: 'chrome-extension://214324234523/test.js', line: 1, column: 1},
        ],
      }).name,
    ).toBe('module-name>other');

    // Ignore extensions by default
    expect(
      getCurrentModule({
        stack: [
          {file: 'project/node_modules/other/root.js', line: 1, column: 1},
          {file: 'app.js', line: 1, column: 1},
          {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
          {file: 'chrome-extension://214324234523/test.js', line: 1, column: 1},
        ],
        allowURLs: true,
      }).name,
    ).toBe('root');

    // Allow extensions
    setIgnoreExtensions(false);
    expect(
      getCurrentModule({
        stack: [
          {file: 'project/node_modules/other/root.js', line: 1, column: 1},
          {file: 'app.js', line: 1, column: 1},
          {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
          {file: 'chrome-extension://214324234523/test.js', line: 1, column: 1},
        ],
        allowURLs: true,
      }).name,
    ).toBe('chrome-extension://214324234523/test.js>module-name>other');
    setIgnoreExtensions(true);

    // Ignore URLs by default
    expect(
      getCurrentModule({
        stack: [
          {file: 'project/node_modules/other/root.js', line: 1, column: 1},
          {file: 'app.js', line: 1, column: 1},
          {file: 'https://googletagmanager.com/tag/2reiwfgr', line: 1, column: 1},
        ],
      }).name,
    ).toBe('other');

    // Allow URLs
    expect(
      getCurrentModule({
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
      getCurrentModule({
        stack: [
          {file: 'project/node_modules/other/root.js', line: 1, column: 1},
          {file: 'app.js', line: 1, column: 1},
          {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
        ],
      }).name,
    ).toBe('module-name');
  });
});
