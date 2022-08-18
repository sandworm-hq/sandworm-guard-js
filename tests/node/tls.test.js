const tls = require('tls');
const Sandworm = require('../../dist/index');
const {expectCallToMatch, loadSandworm} = require('../utils');

describe('tls', () => {
  beforeAll(loadSandworm);
  afterEach(() => Sandworm.clearHistory());

  test('Server', () => {
    const server = new tls.Server();
    expect(server).toBeInstanceOf(tls.Server);
    expectCallToMatch({family: 'tls', method: 'Server'});

    const server2 = tls.Server();
    expect(server2).toBeInstanceOf(tls.Server);
  });

  test('TLSSocket', () => {
    const socket = new tls.TLSSocket();
    socket.destroy();
    expectCallToMatch({family: 'tls', method: 'TLSSocket'});
  });

  test('checkServerIdentity', () => {
    try {
      tls.checkServerIdentity();
    } catch (error) {
    } finally {
      expectCallToMatch({family: 'tls', method: 'checkServerIdentity'});
    }
  });

  test('connect', () => {
    try {
      tls.connect();
    } catch (error) {
    } finally {
      expectCallToMatch({family: 'tls', method: 'connect'});
    }
  });

  test('createSecureContext', () => {
    tls.createSecureContext();
    expectCallToMatch({family: 'tls', method: 'createSecureContext'});
  });

  test('createSecurePair', () => {
    try {
      tls.createSecurePair();
    } catch (error) {
    } finally {
      expectCallToMatch({family: 'tls', method: 'createSecurePair'});
    }
  });

  test('createServer', () => {
    const server = tls.createServer();
    expect(server).toBeInstanceOf(tls.Server);
    expectCallToMatch({family: 'tls', method: 'createServer'});
    server.close();
  });

  test('getCiphers', () => {
    tls.getCiphers();
    expectCallToMatch({family: 'tls', method: 'getCiphers'});
  });
});
