const childProcess = require('child_process');
const path = require('path');
const Sandworm = require('../../dist/index');
const {expectCallToMatch, loadSandworm} = require('../utils');

describe('child_process', () => {
  beforeAll(loadSandworm);
  afterEach(() => Sandworm.clearHistory());

  test('exec', () => {
    const cp = childProcess.exec('echo "test"');
    expect(cp).toBeInstanceOf(childProcess.ChildProcess);
    expectCallToMatch({family: 'child_process', method: 'exec', firstArg: 'echo "test"'});
  });

  test('execFile', () => {
    const cp = childProcess.execFile('node', ['--version']);
    expect(cp).toBeInstanceOf(childProcess.ChildProcess);
    expectCallToMatch({
      family: 'child_process',
      method: 'execFile',
      firstArg: 'node',
      secondArg: ['--version'],
    });
  });

  test('fork', () => {
    const scriptPath = path.join(__dirname, 'log.js');
    const cp = childProcess.fork(scriptPath, ['test']);
    expect(cp).toBeInstanceOf(childProcess.ChildProcess);
    cp.kill();
    expectCallToMatch({
      family: 'child_process',
      method: 'fork',
      firstArg: scriptPath,
      secondArg: ['test'],
    });
  });

  test('spawn', () => {
    const cp = childProcess.spawn('node', ['--version']);
    expect(cp).toBeInstanceOf(childProcess.ChildProcess);
    expectCallToMatch({
      family: 'child_process',
      method: 'spawn',
      firstArg: 'node',
      secondArg: ['--version'],
    });
  });

  test('execSync', () => {
    const stdout = childProcess.execSync('echo "test"');
    expect(stdout.toString().trim()).toEqual('test');
    expectCallToMatch({family: 'child_process', method: 'execSync', firstArg: 'echo "test"'});
  });

  test('execFileSync', () => {
    const stdout = childProcess.execFileSync('echo', ['test']);
    expect(stdout.toString().trim()).toBe('test');
    expectCallToMatch({
      family: 'child_process',
      method: 'execFileSync',
      firstArg: 'echo',
      secondArg: ['test'],
    });
  });

  test('spawnSync', () => {
    const cp = childProcess.spawnSync('echo', ['test']);
    expect(cp.stdout.toString().trim()).toBe('test');
    expectCallToMatch({
      family: 'child_process',
      method: 'spawnSync',
      firstArg: 'echo',
      secondArg: ['test'],
    });
  });
});
