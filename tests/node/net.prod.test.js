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

  test('isIP', () => {
    expectCallToThrow(() => net.isIP('127.0.0.1'));
  });

  test('isIPv4', () => {
    expectCallToThrow(() => net.isIPv4('127.0.0.1'));
  });

  test('isIPv6', () => {
    expectCallToThrow(() => net.isIPv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334'));
  });
});
