const timers = require('timers');

let timersPromises;

try {
  timersPromises = require('timers/promises');
} catch (error) {}

const Sandworm = require('../../dist/index');
const {expectCallToMatch, loadSandworm, testif} = require('../utils');

describe('timers', () => {
  beforeAll(loadSandworm);
  afterEach(() => Sandworm.clearHistory());

  describe('timersAsync', () => {
    test('setImmediate', () => {
      timers.setImmediate(() => {});
      expectCallToMatch({family: 'timers', method: 'setImmediate'});
    });

    test('setInterval', () => {
      const interval = timers.setInterval(() => {}, 100);
      expectCallToMatch({family: 'timers', method: 'setInterval'});
      timers.clearInterval(interval);
    });

    test('setTimeout', () => {
      const timeout = timers.setTimeout(() => {}, 100);
      expectCallToMatch({family: 'timers', method: 'setTimeout'});
      timers.clearTimeout(timeout);
    });

    test('clearImmediate', () => {
      const immediate = timers.setImmediate(() => {});
      timers.clearImmediate(immediate);
      expectCallToMatch({family: 'timers', method: 'clearImmediate', index: 1});
    });

    test('clearInterval', () => {
      const interval = timers.setInterval(() => {}, 100);
      timers.clearInterval(interval);
      expectCallToMatch({family: 'timers', method: 'clearInterval', index: 1});
    });

    test('clearTimeout', () => {
      const timeout = timers.setTimeout(() => {}, 100);
      timers.clearTimeout(timeout);
      expectCallToMatch({family: 'timers', method: 'clearTimeout', index: 1});
    });
  });

  if (timersPromises) {
    describe('timersPromises', () => {
      test('setImmediate', async () => {
        await timersPromises.setImmediate('');
        expectCallToMatch({family: 'timers/promises', method: 'setImmediate'});
      });

      testif(timersPromises.setInterval)('setInterval', async () => {
        await timersPromises.setInterval();
        expectCallToMatch({family: 'timers/promises', method: 'setInterval'});
      });

      test('setTimeout', async () => {
        await timersPromises.setTimeout();
        expectCallToMatch({family: 'timers/promises', method: 'setTimeout'});
      });
    });
  }
});
