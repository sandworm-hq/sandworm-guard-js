const moduleLib = require('../../src/module');
const {
  default: patch,
  SandwormError,
  setIgnoreExtensions,
  setAccessDeniedCallback,
} = require('../../src/patch');

const getCurrentModuleInfoMock = jest.fn(() => ({
  name: 'root',
  stack: [],
}));
const isModuleAllowedToExecuteMock = (allowed = true) => jest.fn(() => allowed);

const testClassSpy = jest.fn();
class TestClass {
  constructor() {
    testClassSpy();
    this.property = 'test';
  }
}
const originalTest = jest.fn();
originalTest.additionalProp = 12;
originalTest.bind = jest.fn();
const originalTestArgsLimit = jest.fn();
let mod = {
  test: originalTest,
  testArgsLimit: originalTestArgsLimit,
  TestClass,
};

const moduleOriginals = [moduleLib.getCurrentModuleInfo, moduleLib.isModuleAllowedToExecute];

describe('patch', () => {
  beforeEach(() => {
    moduleLib.getCurrentModuleInfo = getCurrentModuleInfoMock;
    moduleLib.isModuleAllowedToExecute = isModuleAllowedToExecuteMock();

    patch({
      family: {
        name: 'test',
        methods: [
          {name: 'test'},
          {name: 'testArgsLimit', minArgsToTrigger: 2},
          {name: 'TestClass', isConstructor: true},
        ],
        originalRoot: () => mod,
        available: true,
      },
    });
  });

  afterEach(() => {
    [moduleLib.getCurrentModuleInfo] = moduleOriginals;
    [, moduleLib.isModuleAllowedToExecute] = moduleOriginals;
    mod = {
      test: originalTest,
      testArgsLimit: originalTestArgsLimit,
      TestClass,
    };
  });

  test('patch should match original properties', () => {
    expect(mod.test.additionalProp).toBe(12);
    expect(mod.TestClass.prototype).toStrictEqual(TestClass.prototype);
  });

  test('should capture a call', () => {
    mod.test();

    expect(getCurrentModuleInfoMock).toBeCalledTimes(1);
    expect(moduleLib.isModuleAllowedToExecute).toBeCalledTimes(1);
    expect(originalTest).toBeCalledTimes(1);
  });

  test('should pass-through `bind` with a single argument', () => {
    mod.test.bind(this);

    expect(getCurrentModuleInfoMock).toBeCalledTimes(1);
    expect(moduleLib.isModuleAllowedToExecute).not.toBeCalled();
    expect(originalTest.bind).toBeCalledTimes(1);
  });

  test('should capture `bind` with two arguments', () => {
    mod.test.bind(this, {});

    expect(getCurrentModuleInfoMock).toBeCalledTimes(1);
    expect(moduleLib.isModuleAllowedToExecute).toBeCalledTimes(1);
    expect(originalTest.bind).toBeCalledTimes(1);
  });

  test('should properly construct class objects', () => {
    const testClass = new mod.TestClass();
    expect(getCurrentModuleInfoMock).toBeCalledTimes(1);
    expect(moduleLib.isModuleAllowedToExecute).toBeCalledTimes(1);
    expect(testClass.property).toBe('test');
    expect(testClassSpy).toBeCalledTimes(1);
    expect(testClass).toBeInstanceOf(TestClass);
  });

  test('should disallow a call', () => {
    moduleLib.isModuleAllowedToExecute = isModuleAllowedToExecuteMock(false);
    expect(() => mod.test()).toThrowError(SandwormError);
    try {
      mod.test();
    } catch (error) {
      expect(error.module).toBe('root');
      expect(error.method).toBe('test.test');
    }
  });

  test('access denied callback', () => {
    moduleLib.isModuleAllowedToExecute = isModuleAllowedToExecuteMock(false);
    const callback = jest.fn();
    setAccessDeniedCallback(callback);
    expect(() => mod.test()).toThrowError(SandwormError);
    expect(callback).toBeCalledTimes(1);

    // Test throwing SandwormError even when the callback throws
    setAccessDeniedCallback(() => {
      throw new Error();
    });
    expect(() => mod.test()).toThrowError(SandwormError);
  });

  test('should honor argument count limit', () => {
    moduleLib.isModuleAllowedToExecute = isModuleAllowedToExecuteMock(false);

    mod.testArgsLimit(1);
    expect(getCurrentModuleInfoMock).toBeCalledTimes(1);
    expect(moduleLib.isModuleAllowedToExecute).not.toBeCalled();
    expect(originalTestArgsLimit).toBeCalledTimes(1);

    expect(() => mod.testArgsLimit(1, 2)).toThrowError(SandwormError);
  });

  test('should ignore extensions as root caller', () => {
    moduleLib.getCurrentModuleInfo = jest.fn(() => ({
      name: 'chrome-extension://aaa/test.js>one>two',
      stack: [],
      isExtension: true,
    }));

    mod.test(1);
    expect(moduleLib.getCurrentModuleInfo).toBeCalledTimes(1);
    expect(moduleLib.isModuleAllowedToExecute).not.toBeCalled();
    expect(originalTest).toBeCalledTimes(1);
  });

  test('should ignore extensions as intermediate caller', () => {
    moduleLib.getCurrentModuleInfo = jest.fn(() => ({
      name: 'module>moz-extension://aaa/test.js>another',
      stack: [],
      isExtension: true,
    }));

    mod.test(1);
    expect(moduleLib.getCurrentModuleInfo).toBeCalledTimes(1);
    expect(moduleLib.isModuleAllowedToExecute).not.toBeCalled();
    expect(originalTest).toBeCalledTimes(1);
  });

  test('should honor the `ignoreExtensions` config', () => {
    setIgnoreExtensions(false);
    mod.test(1);
    expect(moduleLib.getCurrentModuleInfo).toBeCalledTimes(1);
    expect(moduleLib.isModuleAllowedToExecute).toBeCalledTimes(1);
    expect(originalTest).toBeCalledTimes(1);
    setIgnoreExtensions(true);
  });
});
