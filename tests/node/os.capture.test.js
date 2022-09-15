const os = require('os');
const Sandworm = require('../../dist/index');
const {expectCallToMatch, loadSandworm, testif} = require('../utils');

describe('os', () => {
  beforeAll(loadSandworm);
  afterEach(() => Sandworm.clearHistory());

  test('arch', () => {
    os.arch();
    expectCallToMatch({family: 'os', method: 'arch'});
  });

  test('cpus', () => {
    os.cpus();
    expectCallToMatch({family: 'os', method: 'cpus'});
  });

  test('endianness', () => {
    os.endianness();
    expectCallToMatch({family: 'os', method: 'endianness'});
  });

  test('freemem', () => {
    os.freemem();
    expectCallToMatch({family: 'os', method: 'freemem'});
  });

  test('getPriority', () => {
    os.getPriority();
    expectCallToMatch({family: 'os', method: 'getPriority'});
  });

  test('homedir', () => {
    os.homedir();
    expectCallToMatch({family: 'os', method: 'homedir'});
  });

  test('hostname', () => {
    os.hostname();
    expectCallToMatch({family: 'os', method: 'hostname'});
  });

  test('loadavg', () => {
    os.loadavg();
    expectCallToMatch({family: 'os', method: 'loadavg'});
  });

  test('networkInterfaces', () => {
    os.networkInterfaces();
    expectCallToMatch({family: 'os', method: 'networkInterfaces'});
  });

  test('platform', () => {
    os.platform();
    expectCallToMatch({family: 'os', method: 'platform'});
  });

  test('release', () => {
    os.release();
    expectCallToMatch({family: 'os', method: 'release'});
  });

  test('setPriority', () => {
    os.setPriority(os.getPriority());
    expectCallToMatch({family: 'os', method: 'setPriority'});
  });

  test('tmpdir', () => {
    os.tmpdir();
    expectCallToMatch({family: 'os', method: 'tmpdir'});
  });

  test('totalmem', () => {
    os.totalmem();
    expectCallToMatch({family: 'os', method: 'totalmem'});
  });

  test('type', () => {
    os.type();
    expectCallToMatch({family: 'os', method: 'type'});
  });

  test('uptime', () => {
    os.uptime();
    expectCallToMatch({family: 'os', method: 'uptime'});
  });

  test('userInfo', () => {
    os.userInfo();
    expectCallToMatch({family: 'os', method: 'userInfo'});
  });

  testif(os.version)('version', () => {
    os.version();
    expectCallToMatch({family: 'os', method: 'version'});
  });
});
