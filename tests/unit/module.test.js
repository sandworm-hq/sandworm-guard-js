import fs from 'fs';
import path from 'path';
import {SourceMapConsumer} from 'source-map-js';
import {
  addSourceMap,
  addTrustedModules,
  compactifyModules,
  foldModules,
  getCurrentModuleInfo,
  getModuleNameFromLocation,
  getModulePermissions,
  isModuleAllowedToExecute,
  mapStackItemToSource,
  setAliases,
  setAllowsAll,
  setPermissions,
} from '../../src/module';

describe('module', () => {
  describe('getModulePermissions', () => {
    test('should allow regexp', () => {
      setPermissions([{module: /.*/, permissions: true}]);
      expect(getModulePermissions('test')).toBeTruthy();
    });

    test('should match string name', () => {
      // Basic use case
      setPermissions([
        {module: 'foo', permissions: ['family.method']},
        {module: 'bar', permissions: ['another.method']},
      ]);
      expect(getModulePermissions('foo')).toStrictEqual(['family.method']);
    });

    test('should return the first regexp matched', () => {
      // Regex use case
      // Only the first match should be returned
      setPermissions([
        {module: /test/, permissions: ['family.method']},
        {module: /another/, permissions: ['another.method']},
        {module: 'bar', permissions: ['another.method']},
      ]);
      expect(getModulePermissions('another>test')).toStrictEqual(['family.method']);
    });

    test('should cache permissions', () => {
      // Text cache
      // Although module is explicitly specified, cached value should be returned
      setPermissions([{module: /specific/, permissions: ['specific.method1']}]);
      expect(getModulePermissions('something>specific')).toStrictEqual(['specific.method1']);
      setPermissions([
        {module: /specific/, permissions: ['specific.method1']},
        {module: 'something>specific', permissions: ['specific.method2']},
      ]);
      expect(getModulePermissions('something>specific')).toStrictEqual(['specific.method1']);
    });

    test('should give precedence to exact string matches', () => {
      // Test explicit module value
      // Although regex matches, explicit value should be returned
      setPermissions([
        {module: /test/, permissions: ['another.method1']},
        {module: 'explicit>test', permissions: ['another.method2']},
      ]);
      expect(getModulePermissions('explicit>test')).toStrictEqual(['another.method2']);
    });

    test('should return false on no matches', () => {
      // Test no match
      expect(getModulePermissions('other')).toBeFalsy();
    });
  });

  describe('mapStackItemToSource', () => {
    test('should not map undefined item', () => {
      expect(mapStackItemToSource()).toStrictEqual({
        item: undefined,
        mapping: undefined,
        mappingLine: undefined,
        mappingColumn: undefined,
      });
    });

    test('should pass-through a string filename', () => {
      expect(mapStackItemToSource({file: ''})).toStrictEqual({
        item: {file: ''},
        mapping: '',
        mappingLine: undefined,
        mappingColumn: undefined,
      });
    });

    test('should properly map back to the source', () => {
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
  });

  describe('isModuleAllowedToExecute', () => {
    beforeEach(() => {
      setPermissions([
        {module: 'imate>one', permissions: true},
        {module: 'imate>two', permissions: ['other.method', 'family']},
        {module: 'imate>three', permissions: ['imate.method', '*']},
        {module: /anything/, permissions: ['other.method']},
        {module: 'not-anything', permissions: false},
      ]);
    });

    test('should allow anything for boolean true permissions', () => {
      expect(
        isModuleAllowedToExecute({
          module: 'imate>one',
          family: {name: 'imate'},
          method: {name: 'method'},
        }),
      ).toBeTruthy();
    });

    test('should not allow high-risk methods on boolean true permissions', () => {
      expect(
        isModuleAllowedToExecute({
          module: 'imate>one',
          family: {name: 'imate'},
          method: {name: 'method', needsExplicitPermission: true},
        }),
      ).toBeFalsy();
    });

    test('should deny method not in permissions', () => {
      expect(
        isModuleAllowedToExecute({
          module: 'imate>two',
          family: {name: 'imate'},
          method: {name: 'method'},
        }),
      ).toBeFalsy();
    });

    test('should allow method in permissions', () => {
      expect(
        isModuleAllowedToExecute({
          module: 'imate>two',
          family: {name: 'other'},
          method: {name: 'method'},
        }),
      ).toBeTruthy();
    });

    test('should allow RegExp module name', () => {
      expect(
        isModuleAllowedToExecute({
          module: 'here>anythingGoes',
          family: {name: 'other'},
          method: {name: 'method'},
        }),
      ).toBeTruthy();
    });

    test('should not allow anything for boolean false permissions', () => {
      expect(
        isModuleAllowedToExecute({
          module: 'not-anything',
          family: {name: 'other'},
          method: {name: 'method'},
        }),
      ).toBeFalsy();
    });

    test('should allow any method within a given family name', () => {
      expect(
        isModuleAllowedToExecute({
          module: 'imate>two',
          family: {name: 'family'},
          method: {name: 'anything'},
        }),
      ).toBeTruthy();
    });

    test('should allow high-risk methods when explicitly included in permissions', () => {
      expect(
        isModuleAllowedToExecute({
          module: 'imate>three',
          family: {name: 'imate'},
          method: {name: 'method', needsExplicitPermission: true},
        }),
      ).toBeTruthy();
    });

    test('should honor the `*` permission', () => {
      expect(
        isModuleAllowedToExecute({
          module: 'imate>three',
          family: {name: 'imate'},
          method: {name: 'random'},
        }),
      ).toBeTruthy();
    });

    test('should not allow modules not found in permissions', () => {
      expect(
        isModuleAllowedToExecute({
          module: 'imate>four',
          family: {name: 'other'},
          method: {name: 'method'},
        }),
      ).toBeFalsy();
    });

    test('should allow all methods of a specified family set with `setAllowsAll`', () => {
      setAllowsAll([{name: 'file'}]);

      expect(
        isModuleAllowedToExecute({
          module: 'imate>five',
          family: {name: 'file'},
          method: {name: 'random'},
        }),
      ).toBeTruthy();
    });

    test('should allow high-risk methods of a specified family set with `setAllowsAll`', () => {
      setAllowsAll([{name: 'file'}]);

      expect(
        isModuleAllowedToExecute({
          module: 'last-test',
          family: {name: 'file'},
          method: {name: 'delete', needsExplicitPermission: true},
        }),
      ).toBeTruthy();
    });
  });

  describe('getModuleNameFromLocation', () => {
    test('should not resolve from an undefined location', () => {
      expect(getModuleNameFromLocation()).toBeUndefined();
    });

    test('should indicate root level for non-node-modules path', () => {
      expect(
        getModuleNameFromLocation('/Users/jason/code/sandworm/tests/node/prod/stack.test.js'),
      ).toBe('root');
    });

    test('should indicate module name for a node-modules path', () => {
      expect(
        getModuleNameFromLocation('/Users/jason/code/sandworm/node_modules/lodash/lodash.js'),
      ).toBe('lodash');
    });

    test('should indicate module name for a nested node-modules path', () => {
      expect(
        getModuleNameFromLocation(
          '/Users/jason/code/sandworm/node_modules/lodash/node_modules/react/index.js',
        ),
      ).toBe('react');
    });

    test('should grab full name for org paths', () => {
      expect(
        getModuleNameFromLocation(
          '/Users/jason/code/sandworm/node_modules/@apollo/client/index.js',
        ),
      ).toBe('@apollo/client');
    });

    test('should default to root when urls are not allowed', () => {
      expect(getModuleNameFromLocation('http://localhost:3000/static/js/bundle.js')).toBe('root');
    });

    test('should return url when allowed', () => {
      expect(getModuleNameFromLocation('http://localhost:3000/static/js/bundle.js', true)).toBe(
        'http://localhost:3000/static/js/bundle.js',
      );
    });

    test('should return a browser extension url when allowed', () => {
      expect(
        getModuleNameFromLocation(
          'chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/react_devtools_backend.js',
          true,
        ),
      ).toBe('chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/react_devtools_backend.js');
    });

    test('should return node internal module names', () => {
      expect(getModuleNameFromLocation('node:https')).toBe('node:https');
      expect(getModuleNameFromLocation('node:internal/modules/cjs/loader')).toBe('node:internal');
    });

    test('should apply alias', () => {
      setAliases([{path: 'tests/node', name: 'test'}]);
      expect(
        getModuleNameFromLocation('/Users/jason/code/sandworm/tests/node/prod/stack.test.js'),
      ).toBe('test');
      setAliases([]);
    });

    test('should ignore invalid alias config', () => {
      setAliases(5);
      expect(
        getModuleNameFromLocation('/Users/jason/code/sandworm/tests/node/prod/stack.test.js'),
      ).toBe('root');
    });
  });

  describe('getCurrentModuleInfo', () => {
    test('should return root for empty stack', () => {
      expect(getCurrentModuleInfo({stack: []}).name).toBe('root');
    });

    test('should return root for app-level stack item', () => {
      expect(getCurrentModuleInfo({stack: [{file: 'app.js', line: 1, column: 1}]}).name).toBe(
        'root',
      );
    });

    test('should return a node module name', () => {
      expect(
        getCurrentModuleInfo({
          stack: [{file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1}],
        }).name,
      ).toBe('module-name');
    });

    test('should identify root as the top module', () => {
      expect(
        getCurrentModuleInfo({
          stack: [
            {file: 'app.js', line: 1, column: 1},
            {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
          ],
        }).name,
      ).toBe('root');
    });

    test('should identify the most recent path through root', () => {
      expect(
        getCurrentModuleInfo({
          stack: [
            {file: 'project/node_modules/other/root.js', line: 1, column: 1},
            {file: 'app.js', line: 1, column: 1},
            {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
          ],
        }).name,
      ).toBe('other');
    });

    test('should compose multiple modules in a caller path output', () => {
      expect(
        getCurrentModuleInfo({
          stack: [
            {file: 'project/node_modules/module/one.js', line: 1, column: 1},
            {file: 'project/node_modules/module/two.js', line: 1, column: 1},
            {file: 'project/node_modules/module/root.js', line: 1, column: 1},
            {file: 'project/node_modules/other/file.js', line: 1, column: 1},
            {file: 'project/node_modules/other/root.js', line: 1, column: 1},
            {file: 'source.js', line: 10, column: 100},
            {file: 'app.js', line: 1, column: 1},
            {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
          ],
        }).name,
      ).toBe('other>module');
    });

    test('should ignore browser extensions by default', () => {
      expect(
        getCurrentModuleInfo({
          stack: [
            {file: 'project/node_modules/other/root.js', line: 1, column: 1},
            {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
            {file: 'chrome-extension://214324234523/test.js', line: 1, column: 1},
          ],
        }).name,
      ).toBe('module-name>other');
    });

    test('should include browser extensions when allowed', () => {
      expect(
        getCurrentModuleInfo({
          stack: [
            {file: 'project/node_modules/other/root.js', line: 1, column: 1},
            {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
            {file: 'chrome-extension://214324234523/test.js', line: 1, column: 1},
          ],
          allowURLs: true,
        }).name,
      ).toBe('chrome-extension://214324234523/test.js>module-name>other');
    });

    test('should detect browser extensions', () => {
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
    });

    test('should ignore urls by default', () => {
      expect(
        getCurrentModuleInfo({
          stack: [
            {file: 'project/node_modules/other/root.js', line: 1, column: 1},
            {file: 'https://googletagmanager.com/tag/2reiwfgr', line: 1, column: 1},
          ],
        }).name,
      ).toBe('other');
    });

    test('should include urls when allowed', () => {
      expect(
        getCurrentModuleInfo({
          stack: [
            {file: 'project/node_modules/other/root.js', line: 1, column: 1},
            {file: 'https://googletagmanager.com/tag/2reiwfgr', line: 1, column: 1},
          ],
          allowURLs: true,
        }).name,
      ).toBe('https://googletagmanager.com/tag/2reiwfgr>other');
    });

    test('should ignore trusted modules', () => {
      addTrustedModules(['other']);
      expect(
        getCurrentModuleInfo({
          stack: [
            {file: 'project/node_modules/other/root.js', line: 1, column: 1},
            {file: 'app.js', line: 1, column: 1},
            {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
          ],
        }).name,
      ).toBe('root');
    });

    test('should identify a root level direct caller', () => {
      expect(
        getCurrentModuleInfo({
          stack: [
            {file: 'project/node_modules/sandworm/root.js', line: 1, column: 1},
            {file: 'app.js', line: 1, column: 1},
            {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
          ],
        }).directCaller.module,
      ).toBe('root');
    });

    test('should identify a node-internal direct caller', () => {
      expect(
        getCurrentModuleInfo({
          stack: [
            {file: 'project/node_modules/sandworm/root.js', line: 1, column: 1},
            {file: 'node:internal/modules/cjs/loader', line: 1, column: 1},
            {file: 'project/node_modules/module-name/dist/index.js', line: 1, column: 1},
          ],
        }).directCaller.module,
      ).toBe('node:internal');
    });

    test('should identify the last module caller', () => {
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

  describe('compactifyModules', () => {
    test('should leave simple chain unchanged', () => {
      const chain = ['modA', 'modB', 'modC'];
      expect(compactifyModules(chain)).toStrictEqual(chain);
    });

    test('should make chain compact', () => {
      const chain = ['modA', 'modB', 'modB', 'modB', 'modC', 'modC', 'modA', 'modA'];
      expect(compactifyModules(chain)).toStrictEqual(['modA', 'modB', 'modC', 'modA']);
    });
  });

  describe('foldModules', () => {
    test('should only consider the latest root-based segment', () => {
      const chain = ['root', 'modA', 'root', 'modB', 'modC', 'root', 'modD', 'modE'];
      expect(foldModules(chain)).toStrictEqual(['modD', 'modE']);
    });

    test('should fold a chain', () => {
      const chain = ['root', 'modA', 'root', 'modB', 'modC', 'modB', 'modD', 'modE', 'modD'];
      expect(foldModules(chain)).toStrictEqual(['modB', 'modD']);
    });

    test('should fold a chain that starts and ends on same module', () => {
      const chain = ['modA', 'modB', 'modC', 'modD', 'modA'];
      expect(foldModules(chain)).toStrictEqual(['modA']);
    });
  });
});
