const http = require('http');
const Sandworm = require('../../dist/index');
const {expectCallToMatch} = require('../utils');

describe('http', () => {
  beforeAll(async () => Sandworm.init({devMode: true}));
  afterEach(() => Sandworm.clearHistory());

  test('Agent', () => {
    const agent = new http.Agent();
    expect(agent).toBeInstanceOf(http.Agent);
    expectCallToMatch({family: 'http', method: 'Agent'});
    agent.destroy();
  });

  test('createServer', () => {
    const server = http.createServer();
    expect(server).toBeInstanceOf(http.Server);
    expectCallToMatch({family: 'http', method: 'createServer'});
  });

  test('get', () => {
    const req = http.get('http://google.com', () => {});
    expect(req).toBeInstanceOf(http.ClientRequest);
    expectCallToMatch({family: 'http', method: 'get'});
    req.end();
  });

  test('request', () => {
    const req = http.request('http://google.com', () => {});
    expect(req).toBeInstanceOf(http.ClientRequest);
    expectCallToMatch({family: 'http', method: 'request'});
    req.end();
  });
});
