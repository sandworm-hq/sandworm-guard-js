const https = require('https');
const Sandworm = require('../../dist/index');
const {expectCallToMatch, loadSandworm} = require('../utils');

describe('https', () => {
  beforeAll(loadSandworm);
  afterEach(() => Sandworm.clearHistory());

  test('Agent', () => {
    const agent = new https.Agent();
    expect(agent).toBeInstanceOf(https.Agent);
    expectCallToMatch({family: 'https', method: 'Agent'});
    agent.destroy();

    const agent2 = https.Agent();
    expect(agent2).toBeInstanceOf(https.Agent);
  });

  test('createServer', () => {
    const server = https.createServer();
    expect(server).toBeInstanceOf(https.Server);
    expectCallToMatch({family: 'https', method: 'createServer'});
  });

  test('get', () => {
    https.get('https://google.com', () => {});
    expectCallToMatch({family: 'https', method: 'get'});
  });

  test('request', () => {
    https.request('https://google.com', () => {});
    expectCallToMatch({family: 'https', method: 'request'});
  });
});
