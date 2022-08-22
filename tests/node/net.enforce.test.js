const net = require('net');
const {loadSandwormInProductionMode, expectCallToThrow} = require('../utils');

describe('enforce: net', () => {
  beforeAll(loadSandwormInProductionMode);

  test('Server', () => {
    expectCallToThrow(() => new net.Server());
  });

  test('Socket', () => {
    expectCallToThrow(() => new net.Socket());
  });

  test('connect', () => {
    expectCallToThrow(() => net.connect());
  });

  test('createConnection', () => {
    expectCallToThrow(() => net.createConnection());
  });

  test('createServer', () => {
    expectCallToThrow(() => net.createServer());
  });
});
