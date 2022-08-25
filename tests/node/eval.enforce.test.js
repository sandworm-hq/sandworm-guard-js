const {loadSandwormInProductionMode, expectCallToThrow} = require('../utils');

describe('enforce: eval', () => {
  beforeAll(loadSandwormInProductionMode);

  test('eval', () => {
    // eslint-disable-next-line no-eval
    expectCallToThrow(() => eval('console.log()'));
  });
});
