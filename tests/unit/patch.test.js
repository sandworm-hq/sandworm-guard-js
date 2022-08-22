const moduleLib = require('../../src/module');
const {default: patch, SandwormError} = require('../../src/patch');

const getCurrentModuleMock = jest.fn(() => ({name: 'root', stack: []}));
const isModuleAllowedToExecuteMock = (allowed = true) => jest.fn(() => allowed);

const testClassSpy = jest.fn();
class TestClass {
  constructor() {
    testClassSpy();
    this.property = 'test';
  }
}
const original = jest.fn();
original.additionalProp = 12;
let mod = {
  test: original,
  TestClass,
};

const moduleOriginals = [moduleLib.getCurrentModule, moduleLib.isModuleAllowedToExecute];

describe('patch', () => {
  beforeEach(() => {
    moduleLib.getCurrentModule = getCurrentModuleMock;
    moduleLib.isModuleAllowedToExecute = isModuleAllowedToExecuteMock();

    patch({
      family: {
        name: 'test',
        methods: [{name: 'test'}, {name: 'TestClass', isConstructor: true}],
        originalRoot: () => mod,
        available: true,
      },
    });
  });

  afterEach(() => {
    [moduleLib.getCurrentModule] = moduleOriginals;
    [, moduleLib.isModuleAllowedToExecute] = moduleOriginals;
    mod = {
      test: original,
      TestClass,
    };
  });

  test('call allowed', () => {
    expect(mod.test.additionalProp).toBe(12);
    expect(mod.TestClass.prototype).toStrictEqual(TestClass.prototype);

    mod.test();

    expect(getCurrentModuleMock).toBeCalledTimes(1);
    expect(original).toBeCalledTimes(1);

    const testClass = new mod.TestClass();
    expect(getCurrentModuleMock).toBeCalledTimes(2);
    expect(testClass.property).toBe('test');
    expect(testClassSpy).toBeCalledTimes(1);
    expect(testClass).toBeInstanceOf(TestClass);
  });

  test('call disallowed', () => {
    moduleLib.isModuleAllowedToExecute = isModuleAllowedToExecuteMock(false);
    expect(() => mod.test()).toThrowError(SandwormError);
  });
});
