const net = require('net');
const Sandworm = require('../../dist/index');
const {expectCallToMatch, loadSandworm} = require('../utils');

describe('net', () => {
  beforeAll(loadSandworm);
  afterEach(() => Sandworm.clearHistory());

  test('Server', () => {
    const server = new net.Server();
    expect(server).toBeInstanceOf(net.Server);
    expectCallToMatch({family: 'net', method: 'Server'});

    const server2 = net.Server();
    expect(server2).toBeInstanceOf(net.Server);
  });

  test('Socket', () => {
    const socket = new net.Socket();
    expect(socket).toBeInstanceOf(net.Socket);
    expectCallToMatch({family: 'net', method: 'Socket'});

    const socket2 = net.Socket();
    expect(socket2).toBeInstanceOf(net.Socket);
  });

  test('connect', () => {
    try {
      net.connect().on('error', () => {});
    } catch (error) {
    } finally {
      expectCallToMatch({family: 'net', method: 'connect'});
    }
  });

  test('createConnection', () => {
    try {
      net.createConnection().on('error', () => {});
    } catch (error) {
    } finally {
      expectCallToMatch({family: 'net', method: 'createConnection'});
    }
  });

  test('createServer', () => {
    const server = net.createServer();
    expect(server).toBeInstanceOf(net.Server);
    expectCallToMatch({family: 'net', method: 'createServer'});
  });
});
