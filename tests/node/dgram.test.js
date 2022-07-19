const dgram = require('dgram');
const Sandworm = require('../../dist/index');
const {expectCallToMatch} = require('../utils');

describe('dgram', () => {
  beforeAll(async () => Sandworm.init({devMode: true}));
  afterEach(() => Sandworm.clearHistory());

  test('disconnect', (done) => {
    const socket = dgram.createSocket({type: 'udp4'});
    expectCallToMatch({family: 'dgram', method: 'createSocket'});
    socket.close(done);
  });
});
