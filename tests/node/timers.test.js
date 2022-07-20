const timers = require('timers');

let timersPromises;

try {
  // eslint-disable-next-line global-require
  timersPromises = require('timers/promises');
  // eslint-disable-next-line no-empty
} catch (error) {}

const Sandworm = require('../../dist/index');
const {expectCallToMatch} = require('../utils');

describe('timers', () => {
  describe('timersAsync', () => {
    beforeAll(async () => Sandworm.init({devMode: true}));
    afterEach(() => Sandworm.clearHistory());

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
      beforeAll(async () => Sandworm.init({devMode: true}));
      afterEach(() => Sandworm.clearHistory());

      test('setImmediate', async () => {
        await timersPromises.setImmediate('');
        expectCallToMatch({family: 'timers/promises', method: 'setImmediate', fromRoot: true});
      });

      test('setInterval', async () => {
        await timersPromises.setInterval();
        expectCallToMatch({family: 'timers/promises', method: 'setInterval', fromRoot: true});
      });

      test('setTimeout', async () => {
        await timersPromises.setTimeout();
        expectCallToMatch({family: 'timers/promises', method: 'setTimeout', fromRoot: true});
      });
    });
  }
});
