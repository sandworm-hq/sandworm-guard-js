const cluster = require('cluster');
const Sandworm = require('../../dist/index');
const {expectCallToMatch} = require('../utils');

describe('cluster', () => {
  beforeAll(async () => Sandworm.init({devMode: true}));
  afterEach(() => Sandworm.clearHistory());

  test('fork', () => {
    if (cluster.isMaster) {
      cluster.fork();
      expectCallToMatch({family: 'cluster', method: 'fork'});
      Object.values(cluster.workers).forEach((worker) => worker.kill());
    }
  });

  test('disconnect', () => {
    cluster.disconnect();
    expectCallToMatch({family: 'cluster', method: 'disconnect'});
  });

  test('setupPrimary', () => {
    if (cluster.setupPrimary) {
      cluster.setupPrimary();
      expectCallToMatch({family: 'cluster', method: 'setupPrimary'});
    }
  });

  test('setupMaster', () => {
    cluster.setupMaster();
    expectCallToMatch({family: 'cluster', method: 'setupMaster'});
  });
});
