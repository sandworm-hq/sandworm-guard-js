const {loadSandwormInProductionMode, testif, expectCallToThrow} = require('../utils');

describe('enforce: fetch', () => {
  beforeAll(loadSandwormInProductionMode);

  testif(typeof fetch !== 'undefined')('fetch', () => {
    expectCallToThrow(() => fetch('https://google.com'));
  });
});
