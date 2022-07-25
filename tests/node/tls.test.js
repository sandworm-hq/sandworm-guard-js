const tls = require('tls');
const Sandworm = require('../../dist/index');
const {expectCallToMatch} = require('../utils');

describe('tls', () => {
  beforeAll(async () => Sandworm.init({devMode: true}));
  afterEach(() => Sandworm.clearHistory());

  test('Server', () => {
    const server = new tls.Server();
    expect(server).toBeInstanceOf(tls.Server);
    expectCallToMatch({family: 'tls', method: 'Server'});
  });

  test('TLSSocket', () => {
    try {
      const socket = new tls.TLSSocket();
      socket.destroy();
    } catch (error) {
    } finally {
      expectCallToMatch({family: 'tls', method: 'TLSSocket'});
    }
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
