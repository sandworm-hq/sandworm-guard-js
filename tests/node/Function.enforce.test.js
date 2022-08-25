const {loadSandwormInProductionMode, expectCallToThrow} = require('../utils');

describe('enforce: Function', () => {
  beforeAll(loadSandwormInProductionMode);

  test('Function', () => {
    // eslint-disable-next-line no-new-func
    expectCallToThrow(() => new Function('console.log()'));
  });
});
