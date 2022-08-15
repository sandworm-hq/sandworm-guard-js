const timers = require('timers');

let timersPromises;

try {
  timersPromises = require('timers/promises');
} catch (error) {}

const {loadSandwormInProductionMode, expectCallToThrow, testif} = require('../utils');

describe('enforce: timers', () => {
  beforeAll(loadSandwormInProductionMode);

  describe('timersAsync', () => {
    test('setImmediate', () => {
      expectCallToThrow(() => timers.setImmediate(() => {}));
    });

    test('setInterval', () => {
      expectCallToThrow(() => timers.setInterval(() => {}, 100));
    });

    test('setTimeout', () => {
      expectCallToThrow(() => timers.setTimeout(() => {}, 100));
    });

    test('clearImmediate', () => {
      expectCallToThrow(() => timers.clearImmediate(1));
    });

    test('clearInterval', () => {
      expectCallToThrow(() => timers.clearInterval(1));
    });

    test('clearTimeout', () => {
      expectCallToThrow(() => timers.clearTimeout(1));
    });
  });

  if (timersPromises) {
    describe('timersPromises', () => {
      test('setImmediate', () => {
        expectCallToThrow(() => timersPromises.setImmediate(''));
      });

      testif(timersPromises.setInterval)('setInterval', () => {
        expectCallToThrow(() => timersPromises.setInterval(() => {}, 100));
      });

      test('setTimeout', () => {
        expectCallToThrow(() => timersPromises.setTimeout(() => {}, 100));
      });
    });
  }
});
