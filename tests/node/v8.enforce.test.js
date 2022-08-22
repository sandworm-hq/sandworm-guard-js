const v8 = require('v8');
const {loadSandwormInProductionMode, testif, expectCallToThrow} = require('../utils');

describe('enforce: v8', () => {
  beforeAll(loadSandwormInProductionMode);

  test('cachedDataVersionTag', () => {
    expectCallToThrow(() => v8.cachedDataVersionTag());
  });

  test('setFlagsFromString', () => {
    expectCallToThrow(() => v8.setFlagsFromString('--harmony'));
  });

  testif(v8.stopCoverage)('stopCoverage', () => {
    expectCallToThrow(() => v8.stopCoverage());
  });

  testif(v8.takeCoverage)('takeCoverage', () => {
    expectCallToThrow(() => v8.takeCoverage());
  });

  test('serialize', () => {
    expectCallToThrow(() => v8.serialize(''));
  });

  test('deserialize', () => {
    expectCallToThrow(() => v8.deserialize(Buffer.from('')));
  });

  testif(v8.getHeapCodeStatistics)('getHeapCodeStatistics', () => {
    expectCallToThrow(() => v8.getHeapCodeStatistics());
  });

  testif(v8.getHeapSnapshot)('getHeapSnapshot', () => {
    expectCallToThrow(() => v8.getHeapSnapshot());
  });

  test('getHeapSpaceStatistics', () => {
    expectCallToThrow(() => v8.getHeapSpaceStatistics());
  });

  test('getHeapStatistics', () => {
    expectCallToThrow(() => v8.getHeapStatistics());
  });

  testif(v8.writeHeapSnapshot)('writeHeapSnapshot', () => {
    expectCallToThrow(() => v8.writeHeapSnapshot());
  });
});
