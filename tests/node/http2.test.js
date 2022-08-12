const http2 = require('http2');
const net = require('net');
const Sandworm = require('../../dist/index');
const {expectCallToMatch, loadSandworm} = require('../utils');

describe('http2', () => {
  beforeAll(loadSandworm);
  afterEach(() => Sandworm.clearHistory());

  test('createServer', () => {
    const server = http2.createServer();
    expect(server).toBeInstanceOf(net.Server);
    expectCallToMatch({family: 'http2', method: 'createServer'});
  });

  test('createSecureServer', () => {
    const server = http2.createSecureServer();
    expect(server).toBeInstanceOf(net.Server);
    expectCallToMatch({family: 'http2', method: 'createSecureServer'});
  });

  test('connect', () => {
    try {
      http2.connect('https://google.com');
    } catch (err) {
      expectCallToMatch({family: 'http2', method: 'connect'});
    }
  });
});
