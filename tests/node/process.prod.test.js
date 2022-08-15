const process = require('process');
const {loadSandwormInProductionMode, testif, expectCallToThrow} = require('../utils');

describe('enforce: os', () => {
  beforeAll(loadSandwormInProductionMode);

  test('abort', () => {
    expectCallToThrow(() => process.abort());
  });

  test('chdir', () => {
    expectCallToThrow(() => process.chdir('.'));
  });

  test('cpuUsage', () => {
    expectCallToThrow(() => process.cpuUsage());
  });

  test('cwd', () => {
    expectCallToThrow(() => process.cwd());
  });

  test('disconnect', () => {
    expectCallToThrow(() => process.disconnect());
  });

  test('dlopen', () => {
    expectCallToThrow(() => process.dlopen());
  });

  test('emitWarning', () => {
    expectCallToThrow(() => process.emitWarning('test warning, all good'));
  });

  test('exit', () => {
    expectCallToThrow(() => process.exit());
  });

  testif(process.getActiveResourcesInfo)('getActiveResourcesInfo', () => {
    expectCallToThrow(() => process.getActiveResourcesInfo());
  });

  test('getegid', () => {
    expectCallToThrow(() => process.getegid());
  });

  test('geteuid', () => {
    expectCallToThrow(() => process.geteuid());
  });

  test('getgid', () => {
    expectCallToThrow(() => process.getgid());
  });

  test('getgroups', () => {
    expectCallToThrow(() => process.getgroups());
  });

  test('getuid', () => {
    expectCallToThrow(() => process.getuid());
  });

  test('hasUncaughtExceptionCaptureCallback', () => {
    expectCallToThrow(() => process.hasUncaughtExceptionCaptureCallback());
  });

  test('hrtime', () => {
    expectCallToThrow(() => process.hrtime());
  });

  test('initgroups', () => {
    expectCallToThrow(() => process.initgroups());
  });

  test('kill', () => {
    expectCallToThrow(() => process.kill());
  });

  test('memoryUsage', () => {
    expectCallToThrow(() => process.memoryUsage());
  });

  testif(process.resourceUsage)('resourceUsage', () => {
    expectCallToThrow(() => process.resourceUsage());
  });

  test('send', () => {
    expectCallToThrow(() => process.send('test'));
  });

  test('setegid', () => {
    expectCallToThrow(() => process.setegid(-1));
  });

  test('seteuid', () => {
    expectCallToThrow(() => process.seteuid(-1));
  });

  test('setgid', () => {
    expectCallToThrow(() => process.setgid(-1));
  });

  test('setgroups', () => {
    expectCallToThrow(() => process.setgroups([-1]));
  });

  test('setuid', () => {
    expectCallToThrow(() => process.setuid(-1));
  });

  testif(process.setSourceMapsEnabled)('setSourceMapsEnabled', () => {
    expectCallToThrow(() => process.setSourceMapsEnabled(true));
  });

  test('setUncaughtExceptionCaptureCallback', () => {
    expectCallToThrow(() => process.setUncaughtExceptionCaptureCallback());
  });

  test('umask', () => {
    expectCallToThrow(() => process.umask());
  });

  test('uptime', () => {
    expectCallToThrow(() => process.uptime());
  });

  test('on', () => {
    expectCallToThrow(() => process.on('test', () => {}));
  });
});
