const os = require('os');
const {loadSandwormInProductionMode, testif, expectCallToThrow} = require('../utils');

describe('enforce: os', () => {
  beforeAll(loadSandwormInProductionMode);

  test('arch', () => {
    expectCallToThrow(() => os.arch());
  });

  test('cpus', () => {
    expectCallToThrow(() => os.cpus());
  });

  test('endianness', () => {
    expectCallToThrow(() => os.endianness());
  });

  test('freemem', () => {
    expectCallToThrow(() => os.freemem());
  });

  test('getPriority', () => {
    expectCallToThrow(() => os.getPriority());
  });

  test('homedir', () => {
    expectCallToThrow(() => os.homedir());
  });

  test('hostname', () => {
    expectCallToThrow(() => os.hostname());
  });

  test('loadavg', () => {
    expectCallToThrow(() => os.loadavg());
  });

  test('networkInterfaces', () => {
    expectCallToThrow(() => os.networkInterfaces());
  });

  test('platform', () => {
    expectCallToThrow(() => os.platform());
  });

  test('release', () => {
    expectCallToThrow(() => os.release());
  });

  test('setPriority', () => {
    expectCallToThrow(() => os.setPriority());
  });

  test('tmpdir', () => {
    expectCallToThrow(() => os.tmpdir());
  });

  test('totalmem', () => {
    expectCallToThrow(() => os.totalmem());
  });

  test('type', () => {
    expectCallToThrow(() => os.type());
  });

  test('uptime', () => {
    expectCallToThrow(() => os.uptime());
  });

  test('userInfo', () => {
    expectCallToThrow(() => os.userInfo());
  });

  testif(os.version)('version', () => {
    expectCallToThrow(() => os.version());
  });
});
