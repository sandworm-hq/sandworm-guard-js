const cluster = require('cluster');
const Sandworm = require('../../dist/index');
const {expectCallToMatch, loadSandworm, testif} = require('../utils');

describe('cluster', () => {
  beforeAll(loadSandworm);
  afterEach(() => Sandworm.clearHistory());

  test('fork', () => {
    if (cluster.isMaster) {
      cluster.fork();
      expectCallToMatch({family: 'cluster', method: 'fork'});
      Object.values(cluster.workers).forEach((worker) => worker.kill());
    }
  });

  // Calling disconnect like this throws on Node v18+
  testif(!process.versions.node.startsWith('18'))('disconnect', () => {
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
