const process = require('process');
const Sandworm = require('../../dist/index');
const {expectCallToMatch} = require('../utils');

describe('os', () => {
  beforeAll(async () => Sandworm.init({devMode: true}));
  afterEach(() => Sandworm.clearHistory());

  // test('abort', () => {
  //   process.abort();
  //   expectCallToMatch({family: 'process', method: 'abort'});
  // });

  test('chdir', () => {
    process.chdir('.');
    expectCallToMatch({family: 'process', method: 'chdir'});
  });

  test('cpuUsage', () => {
    process.cpuUsage();
    expectCallToMatch({family: 'process', method: 'cpuUsage'});
  });

  test('cwd', () => {
    process.cwd();
    expectCallToMatch({family: 'process', method: 'cwd'});
  });

  // test('disconnect', () => {
  //   process.disconnect();
  //   expectCallToMatch({family: 'process', method: 'disconnect'});
  // });

  test('dlopen', () => {
    try {
      process.dlopen();
    } catch (err) {
    } finally {
      expectCallToMatch({family: 'process', method: 'dlopen'});
    }
  });

  test('emitWarning', () => {
    process.emitWarning('test warning, all good');
    expectCallToMatch({family: 'process', method: 'emitWarning'});
  });

  // test('exit', () => {
  //   process.exit();
  //   expectCallToMatch({family: 'process', method: 'exit'});
  // });

  test('getActiveResourcesInfo', () => {
    if (process.getActiveResourcesInfo) {
      process.getActiveResourcesInfo();
      expectCallToMatch({family: 'process', method: 'getActiveResourcesInfo'});
    }
  });

  test('getegid', () => {
    process.getegid();
    expectCallToMatch({family: 'process', method: 'getegid'});
  });

  test('geteuid', () => {
    process.geteuid();
    expectCallToMatch({family: 'process', method: 'geteuid'});
  });

  test('getgid', () => {
    process.getgid();
    expectCallToMatch({family: 'process', method: 'getgid'});
  });

  test('getgroups', () => {
    process.getgroups();
    expectCallToMatch({family: 'process', method: 'getgroups'});
  });

  test('getuid', () => {
    process.getuid();
    expectCallToMatch({family: 'process', method: 'getuid'});
  });

  test('hasUncaughtExceptionCaptureCallback', () => {
    process.hasUncaughtExceptionCaptureCallback();
    expectCallToMatch({family: 'process', method: 'hasUncaughtExceptionCaptureCallback'});
  });

  test('hrtime', () => {
    process.hrtime();
    expectCallToMatch({family: 'process', method: 'hrtime'});
  });

  test('initgroups', () => {
    try {
      process.initgroups();
    } catch (err) {
    } finally {
      expectCallToMatch({family: 'process', method: 'initgroups'});
    }
  });

  test('kill', () => {
    try {
      process.kill();
    } catch (err) {
    } finally {
      expectCallToMatch({family: 'process', method: 'kill'});
    }
  });

  test('memoryUsage', () => {
    process.memoryUsage();
    expectCallToMatch({family: 'process', method: 'memoryUsage'});
  });

  test('resourceUsage', () => {
    if (process.resourceUsage) {
      process.resourceUsage();
      expectCallToMatch({family: 'process', method: 'resourceUsage'});
    }
  });

  test('send', () => {
    process.send('test');
    expectCallToMatch({family: 'process', method: 'send', firstArg: 'test'});
  });

  test('send', () => {
    process.send('test');
    expectCallToMatch({family: 'process', method: 'send'});
  });

  test('setegid', () => {
    process.setegid(process.getegid());
    expectCallToMatch({family: 'process', method: 'setegid', index: 1});
  });

  test('seteuid', () => {
    process.seteuid(process.geteuid());
    expectCallToMatch({family: 'process', method: 'seteuid', index: 1});
  });

  test('setgid', () => {
    process.setgid(process.getgid());
    expectCallToMatch({family: 'process', method: 'setgid', index: 1});
  });

  test('setgroups', () => {
    try {
      process.setgroups(process.getgroups());
    } catch (err) {
    } finally {
      expectCallToMatch({family: 'process', method: 'setgroups', index: 1});
    }
  });

  test('setuid', () => {
    process.setuid(process.getuid());
    expectCallToMatch({family: 'process', method: 'setuid', index: 1});
  });

  test('setSourceMapsEnabled', () => {
    if (process.setSourceMapsEnabled) {
      process.setSourceMapsEnabled(true);
      expectCallToMatch({family: 'process', method: 'setSourceMapsEnabled'});
    }
  });

  test('setUncaughtExceptionCaptureCallback', () => {
    try {
      process.setUncaughtExceptionCaptureCallback();
    } catch (error) {
    } finally {
      expectCallToMatch({family: 'process', method: 'setUncaughtExceptionCaptureCallback'});
    }
  });

  test('umask', () => {
    process.umask();
    expectCallToMatch({family: 'process', method: 'umask'});
  });

  test('uptime', () => {
    process.uptime();
    expectCallToMatch({family: 'process', method: 'uptime'});
  });

  test('on', () => {
    process.on('', () => {});
    expectCallToMatch({family: 'process', method: 'on'});
  });
});
