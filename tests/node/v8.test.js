const v8 = require('v8');
const Sandworm = require('../../dist/index');
const {expectCallToMatch} = require('../utils');

describe('v8', () => {
  beforeAll(async () => Sandworm.init({devMode: true}));
  afterEach(() => Sandworm.clearHistory());

  test('cachedDataVersionTag', () => {
    v8.cachedDataVersionTag();
    expectCallToMatch({family: 'v8', method: 'cachedDataVersionTag'});
  });

  test('setFlagsFromString', () => {
    v8.setFlagsFromString('--notrace_gc');
    expectCallToMatch({family: 'v8', method: 'setFlagsFromString'});
  });

  test('stopCoverage', () => {
    if (v8.stopCoverage) {
      v8.stopCoverage();
      expectCallToMatch({family: 'v8', method: 'stopCoverage'});
    }
  });

  test('takeCoverage', () => {
    if (v8.takeCoverage) {
      v8.takeCoverage();
      expectCallToMatch({family: 'v8', method: 'takeCoverage'});
    }
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
