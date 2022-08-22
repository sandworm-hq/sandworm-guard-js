const tls = require('tls');
const {loadSandwormInProductionMode, expectCallToThrow} = require('../utils');

describe('enforce: tls', () => {
  beforeAll(loadSandwormInProductionMode);

  test('Server', () => {
    expectCallToThrow(() => new tls.Server());
  });

  test('TLSSocket', () => {
    expectCallToThrow(() => new tls.TLSSocket());
  });

  test('checkServerIdentity', () => {
    expectCallToThrow(() => tls.checkServerIdentity());
  });

  test('connect', () => {
    expectCallToThrow(() => tls.connect());
  });

  test('createSecureContext', () => {
    expectCallToThrow(() => tls.createSecureContext());
  });

  test('createSecurePair', () => {
    expectCallToThrow(() => tls.createSecurePair());
  });

  test('createServer', () => {
    expectCallToThrow(() => tls.createServer());
  });

  test('getCiphers', () => {
    expectCallToThrow(() => tls.getCiphers());
  });
});
