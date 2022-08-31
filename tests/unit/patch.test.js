const moduleLib = require('../../src/module');
const {default: patch, SandwormError} = require('../../src/patch');

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

  test('call allowed', () => {
    expect(mod.test.additionalProp).toBe(12);
    expect(mod.TestClass.prototype).toStrictEqual(TestClass.prototype);

    mod.test();

    expect(getCurrentModuleInfoMock).toBeCalledTimes(1);
    expect(moduleLib.isModuleAllowedToExecute).toBeCalledTimes(1);
    expect(originalTest).toBeCalledTimes(1);

    mod.test.bind(this);

    expect(getCurrentModuleInfoMock).toBeCalledTimes(2);
    expect(moduleLib.isModuleAllowedToExecute).toBeCalledTimes(1);
    expect(originalTest.bind).toBeCalledTimes(1);

    mod.test.bind(this, {});

    expect(getCurrentModuleInfoMock).toBeCalledTimes(3);
    expect(moduleLib.isModuleAllowedToExecute).toBeCalledTimes(2);
    expect(originalTest.bind).toBeCalledTimes(2);

    const testClass = new mod.TestClass();
    expect(getCurrentModuleInfoMock).toBeCalledTimes(4);
    expect(moduleLib.isModuleAllowedToExecute).toBeCalledTimes(3);
    expect(testClass.property).toBe('test');
    expect(testClassSpy).toBeCalledTimes(1);
    expect(testClass).toBeInstanceOf(TestClass);
  });

  test('call disallowed', () => {
    moduleLib.isModuleAllowedToExecute = isModuleAllowedToExecuteMock(false);
    expect(() => mod.test()).toThrowError(SandwormError);
  });

  test('argument count limit', () => {
    moduleLib.isModuleAllowedToExecute = isModuleAllowedToExecuteMock(false);

    mod.testArgsLimit(1);
    expect(getCurrentModuleInfoMock).toBeCalledTimes(1);
    expect(moduleLib.isModuleAllowedToExecute).not.toBeCalled();
    expect(originalTestArgsLimit).toBeCalledTimes(1);

    expect(() => mod.testArgsLimit(1, 2)).toThrowError(SandwormError);
  });
});
