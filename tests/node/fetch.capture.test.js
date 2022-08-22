const Sandworm = require('../../dist/index');
const {expectCallToMatch, loadSandworm, testif} = require('../utils');

describe('fetch', () => {
  beforeAll(loadSandworm);
  afterEach(() => Sandworm.clearHistory());

  testif(typeof fetch !== 'undefined')('fetch', async () => {
    await fetch('https://google.com');
    expectCallToMatch({family: 'fetch', method: 'fetch', firstArg: 'https://google.com'});
  });
});
