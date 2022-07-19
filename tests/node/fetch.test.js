const Sandworm = require('../../dist/index');
const {expectCallToMatch} = require('../utils');

describe('fetch', () => {
  beforeAll(async () => Sandworm.init({devMode: true}));
  afterEach(() => Sandworm.clearHistory());

  test('fetch', async () => {
    if (typeof fetch !== 'undefined') {
      await fetch('https://google.com');
      expectCallToMatch({family: 'fetch', method: 'fetch', firstArg: 'https://google.com'});
    }
  });
});
