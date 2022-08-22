const childProcess = require('child_process');
const path = require('path');
const {loadSandwormInProductionMode, expectCallToThrow} = require('../utils');

describe('enforce: child_process', () => {
  beforeAll(loadSandwormInProductionMode);

  test('exec', () => {
    expectCallToThrow(() => childProcess.exec('echo "test"'));
  });

  test('execFile', () => {
    expectCallToThrow(() => childProcess.execFile('node', ['--version']));
  });

  test('fork', () => {
    const scriptPath = path.join(__dirname, 'log.js');
    expectCallToThrow(() => childProcess.fork(scriptPath, ['test']));
  });

  test('spawn', () => {
    expectCallToThrow(() => childProcess.spawn('node', ['--version']));
  });

  test('execSync', () => {
    expectCallToThrow(() => childProcess.execSync('echo "test"'));
  });

  test('execFileSync', () => {
    expectCallToThrow(() => childProcess.execFileSync('echo', ['test']));
  });

  test('spawnSync', () => {
    expectCallToThrow(() => childProcess.spawnSync('echo', ['test']));
  });
});
