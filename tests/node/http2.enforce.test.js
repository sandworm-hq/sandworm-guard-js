const http2 = require('http2');
const {loadSandwormInProductionMode, expectCallToThrow} = require('../utils');

describe('enforce: http2', () => {
  beforeAll(loadSandwormInProductionMode);

  test('createServer', () => {
    expectCallToThrow(() => http2.createServer());
  });

  test('createSecureServer', () => {
    expectCallToThrow(() => http2.createSecureServer());
  });

  test('connect', () => {
    expectCallToThrow(() => http2.connect('https://google.com'));
  });
});
