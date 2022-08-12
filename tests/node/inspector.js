const inspector = require('inspector');
const Sandworm = require('../../dist/index');
const {expectCallToMatch, loadSandworm} = require('../utils');

describe('inspector', () => {
  beforeAll(loadSandworm);
  afterEach(() => Sandworm.clearHistory());

  test('close', () => {
    inspector.close();
    expectCallToMatch({family: 'inspector', method: 'close'});
  });

  test('open', () => {
    inspector.open();
    expectCallToMatch({family: 'inspector', method: 'open'});
    inspector.close();
  });

  test('url', () => {
    inspector.url();
    expectCallToMatch({family: 'inspector', method: 'url'});
  });

  test('waitForDebugger', () => {
    try {
      inspector.waitForDebugger();
    } catch (error) {
      expectCallToMatch({family: 'inspector', method: 'waitForDebugger'});
    }
  });

  test('Session', () => {
    const session = new inspector.Session();
    expectCallToMatch({family: 'inspector', method: 'Session'});
    session.disconnect();
  });
});
