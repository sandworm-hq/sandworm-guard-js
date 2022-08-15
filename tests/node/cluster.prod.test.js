const cluster = require('cluster');
const {loadSandwormInProductionMode, expectCallToThrow, testif} = require('../utils');

describe('enforce: cluster', () => {
  beforeAll(loadSandwormInProductionMode);

  test('fork', () => {
    expectCallToThrow(() => cluster.fork());
  });

  test('disconnect', () => {
    expectCallToThrow(() => cluster.disconnect());
  });

  testif(cluster.setupPrimary)('setupPrimary', () => {
    expectCallToThrow(() => cluster.setupPrimary());
  });

  test('setupMaster', () => {
    expectCallToThrow(() => cluster.setupMaster());
  });
});
