const v8 = require('v8');
// const fs = require('fs');

const Sandworm = require('../../dist/index');
const syncSuite = require('./fs/sync');
const asyncSuite = require('./fs/async');
const promisesSuite = require('./fs/promises');
const {expectCallToMatch, loadSandworm, testif} = require('../utils');

describe('fs', () => {
  beforeAll(loadSandworm);
  afterEach(() => Sandworm.clearHistory());
  asyncSuite();
  syncSuite();
  promisesSuite();
  describe('v8', () => {
    testif(v8.getHeapCodeStatistics)('getHeapCodeStatistics', () => {
      v8.getHeapCodeStatistics();
      expectCallToMatch({family: 'v8', method: 'getHeapCodeStatistics'});
    });
    testif(v8.getHeapSnapshot)('getHeapSnapshot', () => {
      v8.getHeapSnapshot();
      expectCallToMatch({family: 'v8', method: 'getHeapSnapshot'});
    });
    test('getHeapSpaceStatistics', () => {
      v8.getHeapSpaceStatistics();
      expectCallToMatch({family: 'v8', method: 'getHeapSpaceStatistics'});
    });
    test('getHeapStatistics', () => {
      v8.getHeapStatistics();
      expectCallToMatch({family: 'v8', method: 'getHeapStatistics'});
    });
    // test('writeHeapSnapshot', () => {
    //   const filename = v8.writeHeapSnapshot();
    //   expectCallToMatch({family: 'v8', method: 'writeHeapSnapshot'});
    //   fs.rmSync(filename);
    // });
  });
});
