const v8 = require('v8');
const Sandworm = require('../../dist/index');
const {expectCallToMatch, loadSandworm, testif} = require('../utils');

describe('v8', () => {
  beforeAll(loadSandworm);
  afterEach(() => Sandworm.clearHistory());

  test('cachedDataVersionTag', () => {
    v8.cachedDataVersionTag();
    expectCallToMatch({family: 'v8', method: 'cachedDataVersionTag'});
  });

  test('setFlagsFromString', () => {
    v8.setFlagsFromString('--notrace_gc');
    expectCallToMatch({family: 'v8', method: 'setFlagsFromString'});
  });

  testif(v8.stopCoverage)('stopCoverage', () => {
    v8.stopCoverage();
    expectCallToMatch({family: 'v8', method: 'stopCoverage'});
  });

  testif(v8.takeCoverage)('takeCoverage', () => {
    v8.takeCoverage();
    expectCallToMatch({family: 'v8', method: 'takeCoverage'});
  });

  test('serialize', () => {
    v8.serialize('');
    expectCallToMatch({family: 'v8', method: 'serialize'});
  });

  test('deserialize', () => {
    try {
      v8.deserialize(Buffer.from(''));
    } catch (error) {
    } finally {
      expectCallToMatch({family: 'v8', method: 'deserialize'});
    }
  });
});
