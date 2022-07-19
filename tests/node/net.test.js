const net = require('net');
const Sandworm = require('../../dist/index');
const {expectCallToMatch} = require('../utils');

describe('net', () => {
  beforeAll(async () => Sandworm.init({devMode: true}));
  afterEach(() => Sandworm.clearHistory());

  test('Server', () => {
    const server = new net.Server();
    expect(server).toBeInstanceOf(net.Server);
    expectCallToMatch({family: 'net', method: 'Server'});
  });

  test('Socket', () => {
    const socket = new net.Socket();
    expect(socket).toBeInstanceOf(net.Socket);
    expectCallToMatch({family: 'net', method: 'Socket'});
  });

  test('connect', () => {
    try {
      net.connect();
    } catch (error) {
      expectCallToMatch({family: 'net', method: 'connect'});
    }
  });

  test('createConnection', () => {
    try {
      net.createConnection();
    } catch (error) {
      expectCallToMatch({family: 'net', method: 'createConnection'});
    }
  });

  test('createServer', () => {
    const server = net.createServer();
    expect(server).toBeInstanceOf(net.Server);
    expectCallToMatch({family: 'net', method: 'createServer'});
  });

  test('isIP', () => {
    expect(net.isIP('127.0.0.1')).toBeTruthy();
    expectCallToMatch({family: 'net', method: 'isIP'});
  });

  test('isIPv4', () => {
    expect(net.isIPv4('127.0.0.1')).toBeTruthy();
    expectCallToMatch({family: 'net', method: 'isIPv4'});
  });

  test('isIPv6', () => {
    expect(net.isIPv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBeTruthy();
    expectCallToMatch({family: 'net', method: 'isIPv6'});
  });
});
