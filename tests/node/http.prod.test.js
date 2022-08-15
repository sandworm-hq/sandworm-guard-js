const http = require('http');
const {loadSandwormInProductionMode, expectCallToThrow} = require('../utils');

describe('enforce: http', () => {
  beforeAll(loadSandwormInProductionMode);

  test('Agent', () => {
    expectCallToThrow(() => new http.Agent());
  });

  test('createServer', () => {
    expectCallToThrow(() => http.createServer());
  });

  test('get', () => {
    expectCallToThrow(() => http.get('http://google.com', () => {}));
  });

  test('request', () => {
    expectCallToThrow(() => http.request('http://google.com', () => {}));
  });
});
