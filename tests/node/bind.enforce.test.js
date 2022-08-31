const http = require('http');
const {loadSandwormInProductionMode, expectCallToThrow} = require('../utils');

describe('enforce: bind', () => {
  beforeAll(loadSandwormInProductionMode);

  test('args', () => {
    http.request.bind(this);
    expectCallToThrow(() => http.request.bind(this, {}));
  });
});
