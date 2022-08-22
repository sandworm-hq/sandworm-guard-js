const https = require('https');
const {loadSandwormInProductionMode, expectCallToThrow} = require('../utils');

describe('enforce: https', () => {
  beforeAll(loadSandwormInProductionMode);

  test('Agent', () => {
    expectCallToThrow(() => new https.Agent());
  });

  test('createServer', () => {
    expectCallToThrow(() => https.createServer());
  });

  test('get', () => {
    expectCallToThrow(() => https.get('https://google.com', () => {}));
  });

  test('request', () => {
    expectCallToThrow(() => https.request('https://google.com', () => {}));
  });
});
