const trace = require('trace_events');
const {loadSandwormInProductionMode, expectCallToThrow} = require('../utils');

describe('enforce: trace_events', () => {
  beforeAll(loadSandwormInProductionMode);

  test('createTracing', () => {
    expectCallToThrow(() => trace.createTracing({categories: ['node.perf']}));
  });

  test('getEnabledCategories', () => {
    expectCallToThrow(() => trace.getEnabledCategories());
  });
});
