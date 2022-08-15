const inspector = require('inspector');
const {loadSandwormInProductionMode, expectCallToThrow} = require('../utils');

describe('enforce: inspector', () => {
  beforeAll(loadSandwormInProductionMode);

  test('close', () => {
    expectCallToThrow(() => inspector.close());
  });

  test('open', () => {
    expectCallToThrow(() => inspector.open());
  });

  test('url', () => {
    expectCallToThrow(() => inspector.url());
  });

  // test('waitForDebugger', () => {
  //   try {
  //     inspector.waitForDebugger();
  //   } catch (error) {
  //     expectCallToMatch({family: 'inspector', method: 'waitForDebugger'});
  //   }
  // });

  test('Session', () => {
    expectCallToThrow(() => new inspector.Session());
  });
});
