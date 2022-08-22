const dgram = require('dgram');
const {loadSandwormInProductionMode, expectCallToThrow} = require('../utils');

describe('enforce: dgram', () => {
  beforeAll(loadSandwormInProductionMode);

  test('disconnect', () => {
    expectCallToThrow(() => dgram.createSocket({type: 'udp4'}));
  });
});
