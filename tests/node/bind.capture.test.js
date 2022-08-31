const http = require('http');
const Sandworm = require('../../dist/index');
const {expectNoCall, loadSandworm, expectCallToMatch} = require('../utils');

describe('bind', () => {
  beforeAll(loadSandworm);
  afterEach(() => Sandworm.clearHistory());

  test('args', async () => {
    http.request.bind(this);
    expectNoCall();

    http.request.bind(this, []);
    expectCallToMatch({family: 'bind', method: 'args'});
  });
});
