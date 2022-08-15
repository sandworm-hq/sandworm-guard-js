const vm = require('vm');
const {loadSandwormInProductionMode, testif, expectCallToThrow} = require('../utils');

describe('enforce: vm', () => {
  beforeAll(loadSandwormInProductionMode);

  test('Script', () => {
    expectCallToThrow(() => new vm.Script(''));
  });

  testif(vm.SourceTextModule)('SourceTextModule', () => {
    expectCallToThrow(() => new vm.SourceTextModule());
  });

  testif(vm.SyntheticModule)('SyntheticModule', () => {
    expectCallToThrow(() => new vm.SyntheticModule());
  });

  test('compileFunction', () => {
    expectCallToThrow(() => vm.compileFunction(''));
  });

  test('createContext', () => {
    expectCallToThrow(() => vm.createContext());
  });

  test('isContext', () => {
    expectCallToThrow(() => vm.isContext());
  });

  testif(vm.measureMemory)('measureMemory', () => {
    expectCallToThrow(() => vm.measureMemory());
  });

  test('runInContext', () => {
    expectCallToThrow(() => vm.runInContext('', {}));
  });

  test('runInNewContext', () => {
    expectCallToThrow(() => vm.runInNewContext(''));
  });

  test('runInThisContext', () => {
    expectCallToThrow(() => vm.runInThisContext(''));
  });
});
