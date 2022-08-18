const http2 = require('http2');
const net = require('net');
const Sandworm = require('../../dist/index');
const {expectCallToMatch, loadSandworm} = require('../utils');

describe('http2', () => {
  beforeAll(loadSandworm);
  afterEach(() => Sandworm.clearHistory());

  test('createServer', () => {
    const server = http2.createServer();
    server.close();
    expect(server).toBeInstanceOf(net.Server);
    expectCallToMatch({family: 'http2', method: 'createServer'});
  });

  test('createSecureServer', () => {
    const server = http2.createSecureServer();
    server.close();
    expect(server).toBeInstanceOf(net.Server);
    expectCallToMatch({family: 'http2', method: 'createSecureServer'});
  });

  test('connect', () => {
    const session = http2.connect('https://google.com');
    session.close();
    expectCallToMatch({family: 'http2', method: 'connect'});
  });
});
