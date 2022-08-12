const vm = require('vm');
const Sandworm = require('../../dist/index');
const {expectCallToMatch, loadSandworm, testif} = require('../utils');

describe('vm', () => {
  beforeAll(loadSandworm);
  afterEach(() => Sandworm.clearHistory());

  test('Script', () => {
    new vm.Script('');
    expectCallToMatch({family: 'vm', method: 'Script'});
  });

  testif(vm.SourceTextModule)('SourceTextModule', () => {
    new vm.SourceTextModule();
    expectCallToMatch({family: 'vm', method: 'SourceTextModule'});
  });

  testif(vm.SyntheticModule)('SyntheticModule', () => {
    new vm.SyntheticModule();
    expectCallToMatch({family: 'vm', method: 'SyntheticModule'});
  });

  test('compileFunction', () => {
    vm.compileFunction('');
    expectCallToMatch({family: 'vm', method: 'compileFunction'});
  });

  test('createContext', () => {
    vm.createContext();
    expectCallToMatch({family: 'vm', method: 'createContext'});
  });

  test('isContext', () => {
    const context = vm.createContext();
    expect(vm.isContext(context)).toBeTruthy();
    expectCallToMatch({family: 'vm', method: 'isContext', index: 1});
  });

  testif(vm.measureMemory)('measureMemory', () => {
    vm.measureMemory();
    expectCallToMatch({family: 'vm', method: 'measureMemory'});
  });

  test('runInContext', () => {
    const context = vm.createContext();
    vm.runInContext('', context);
    expectCallToMatch({family: 'vm', method: 'runInContext', index: 1});
  });

  test('runInNewContext', () => {
    vm.runInNewContext('');
    expectCallToMatch({family: 'vm', method: 'runInNewContext'});
  });

  test('runInThisContext', () => {
    vm.runInThisContext('');
    expectCallToMatch({family: 'vm', method: 'runInThisContext'});
  });
});
