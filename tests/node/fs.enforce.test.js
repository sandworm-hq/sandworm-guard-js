const fs = require('fs');

let fsPromises;

try {
  // eslint-disable-next-line global-require
  fsPromises = require('fs/promises');
  // eslint-disable-next-line no-empty
} catch (error) {}

const {loadSandwormInProductionMode, expectCallToThrow, testif} = require('../utils');

describe('enforce: fs', () => {
  beforeAll(loadSandwormInProductionMode);

  describe('fsAsync', () => {
    test('access', () => {
      expectCallToThrow(() => fs.access('/tmp/foo', fs.constants.F_OK, () => {}));
    });

    test('appendFile', () => {
      expectCallToThrow(() => fs.appendFile('/tmp/foo', 'bar', () => {}));
    });

    test('chmod', () => {
      expectCallToThrow(() => fs.chmod('/tmp/foo', 0x777, () => {}));
    });

    test('chown', () => {
      expectCallToThrow(() => fs.chown('/tmp/foo', 0, 0, () => {}));
    });

    test('close', () => {
      expectCallToThrow(() => fs.close(0, () => {}));
    });

    test('copyFile', () => {
      expectCallToThrow(() => fs.copyFile('/tmp/foo', '/tmp/bar', () => {}));
    });

    testif(fs.cp)('cp', () => {
      expectCallToThrow(() => fs.cp('/tmp/foo', '/tmp/bar', () => {}));
    });

    test('createReadStream', () => {
      expectCallToThrow(() => fs.createReadStream('/tmp/foo'));
    });

    test('createWriteStream', () => {
      expectCallToThrow(() => fs.createWriteStream('/tmp/foo'));
    });

    test('exists', () => {
      expectCallToThrow(() => fs.exists('/tmp/foo', () => {}));
    });

    test('fchmod', () => {
      expectCallToThrow(() => fs.fchmod(0, 0x777, () => {}));
    });

    test('fchown', () => {
      expectCallToThrow(() => fs.fchown(0, 0, 0, () => {}));
    });

    test('fdatasync', () => {
      expectCallToThrow(() => fs.fdatasync(0, () => {}));
    });

    test('fstat', () => {
      expectCallToThrow(() => fs.fstat(0, () => {}));
    });

    test('fsync', () => {
      expectCallToThrow(() => fs.fsync(0, () => {}));
    });

    test('ftruncate', () => {
      expectCallToThrow(() => fs.ftruncate(0, 0, () => {}));
    });

    test('futimes', () => {
      expectCallToThrow(() => fs.futimes(0, new Date(), new Date(), () => {}));
    });

    test('link', () => {
      expectCallToThrow(() => fs.link('/tmp/foo', '/tmp/bar', () => {}));
    });

    test('mkdir', () => {
      expectCallToThrow(() => fs.mkdir('/tmp/foo', () => {}));
    });

    test('mkdtemp', () => {
      expectCallToThrow(() => fs.mkdtemp('/tmp/foo', () => {}));
    });

    test('open', () => {
      expectCallToThrow(() => fs.open('/tmp/foo', 'r', () => {}));
    });

    testif(fs.opendir)('opendir', () => {
      expectCallToThrow(() => fs.opendir('/tmp/foo', () => {}));
    });

    test('read', () => {
      expectCallToThrow(() => fs.read(0, Buffer.alloc(0), 0, 0, null, () => {}));
    });

    test('readdir', () => {
      expectCallToThrow(() => fs.readdir('/tmp/foo', () => {}));
    });

    test('readFile', () => {
      expectCallToThrow(() => fs.readFile('/tmp/foo', () => {}));
    });

    test('realpath', () => {
      expectCallToThrow(() => fs.realpath('/tmp/foo', () => {}));
    });

    test('rename', () => {
      expectCallToThrow(() => fs.rename('/tmp/foo', '/tmp/bar', () => {}));
    });

    testif(fs.rm)('rm', () => {
      expectCallToThrow(() => fs.rm('/tmp/foo', () => {}));
    });

    test('stat', () => {
      expectCallToThrow(() => fs.stat('/tmp/foo', () => {}));
    });

    test('symlink', () => {
      expectCallToThrow(() => fs.symlink('/tmp/foo', '/tmp/bar', () => {}));
    });

    test('truncate', () => {
      expectCallToThrow(() => fs.truncate('/tmp/foo', 0, () => {}));
    });

    test('unlink', () => {
      expectCallToThrow(() => fs.unlink('/tmp/foo', () => {}));
    });

    test('unwatchFile', () => {
      expectCallToThrow(() => fs.unwatchFile('/tmp/foo', () => {}));
    });

    test('utimes', () => {
      expectCallToThrow(() => fs.utimes('/tmp/foo', new Date(), new Date(), () => {}));
    });

    test('watch', () => {
      expectCallToThrow(() => fs.watch('/tmp/foo'));
    });

    test('watchFile', () => {
      expectCallToThrow(() => fs.watchFile('/tmp/foo', () => {}));
    });

    test('write', () => {
      expectCallToThrow(() => fs.write(0, '', () => {}));
    });

    test('writeFile', () => {
      expectCallToThrow(() => fs.writeFile('/tmp/foo', 'bar', () => {}));
    });
  });

  describe('fsSync', () => {
    test('accessSync', () => {
      expectCallToThrow(() => fs.accessSync('/tmp/foo', fs.constants.F_OK));
    });

    test('appendFileSync', () => {
      expectCallToThrow(() => fs.appendFileSync('/tmp/foo', 'bar'));
    });

    test('chmodSync', () => {
      expectCallToThrow(() => fs.chmodSync('/tmp/foo', 0x777));
    });

    test('chownSync', () => {
      expectCallToThrow(() => fs.chownSync('/tmp/foo', 0, 0));
    });

    test('closeSync', () => {
      expectCallToThrow(() => fs.closeSync(0));
    });

    testif(fs.copyFileSync)('copyFileSync', () => {
      expectCallToThrow(() => fs.copyFileSync('/tmp/foo', '/tmp/bar'));
    });

    testif(fs.cpSync)('cpSync', () => {
      expectCallToThrow(() => fs.cpSync('/tmp/foo', '/tmp/bar'));
    });

    test('existsSync', () => {
      expectCallToThrow(() => fs.existsSync('/tmp/foo'));
    });

    test('fchmodSync', () => {
      expectCallToThrow(() => fs.fchmodSync(0, 0x777));
    });

    test('fchownSync', () => {
      expectCallToThrow(() => fs.fchownSync(0, 0, 0));
    });

    test('fdatasyncSync', () => {
      expectCallToThrow(() => fs.fdatasyncSync(0));
    });

    test('fstatSync', () => {
      expectCallToThrow(() => fs.fstatSync(0));
    });

    test('fsyncSync', () => {
      expectCallToThrow(() => fs.fsyncSync(0));
    });

    test('ftruncateSync', () => {
      expectCallToThrow(() => fs.ftruncateSync(0, 0));
    });

    test('futimesSync', () => {
      expectCallToThrow(() => fs.futimesSync(0, new Date(), new Date()));
    });

    test('linkSync', () => {
      expectCallToThrow(() => fs.linkSync('/tmp/foo', '/tmp/bar'));
    });

    test('mkdirSync', () => {
      expectCallToThrow(() => fs.mkdirSync('/tmp/foo'));
    });

    test('mkdtempSync', () => {
      expectCallToThrow(() => fs.mkdtempSync('/tmp/foo'));
    });

    test('openSync', () => {
      expectCallToThrow(() => fs.openSync('/tmp/foo', 'r'));
    });

    testif(fs.opendirSync)('opendirSync', () => {
      expectCallToThrow(() => fs.opendirSync('/tmp/foo'));
    });

    test('readSync', () => {
      expectCallToThrow(() => fs.readSync(0, Buffer.alloc(0), 0, 0));
    });

    test('readdirSync', () => {
      expectCallToThrow(() => fs.readdirSync('/tmp/foo'));
    });

    test('readFileSync', () => {
      expectCallToThrow(() => fs.readFileSync('/tmp/foo'));
    });

    test('realpathSync', () => {
      expectCallToThrow(() => fs.realpathSync('/tmp/foo'));
    });

    test('renameSync', () => {
      expectCallToThrow(() => fs.renameSync('/tmp/foo', '/tmp/bar'));
    });

    testif(fs.rmSync)('rmSync', () => {
      expectCallToThrow(() => fs.rmSync('/tmp/foo'));
    });

    test('statSync', () => {
      expectCallToThrow(() => fs.statSync('/tmp/foo'));
    });

    test('symlinkSync', () => {
      expectCallToThrow(() => fs.symlinkSync('/tmp/foo', '/tmp/bar'));
    });

    test('truncateSync', () => {
      expectCallToThrow(() => fs.truncateSync('/tmp/foo', 0));
    });

    test('unlinkSync', () => {
      expectCallToThrow(() => fs.unlinkSync('/tmp/foo'));
    });

    test('utimesSync', () => {
      expectCallToThrow(() => fs.utimesSync('/tmp/foo', new Date(), new Date()));
    });

    test('writeSync', () => {
      expectCallToThrow(() => fs.writeSync(0, ''));
    });

    test('writeFileSync', () => {
      expectCallToThrow(() => fs.writeFileSync('/tmp/foo', 'bar'));
    });
  });

  describe('fsPromises', () => {
    testif(fsPromises)('access', () => {
      expectCallToThrow(() => fsPromises.access('/tmp/foo', fs.constants.F_OK));
    });

    testif(fsPromises)('appendFile', () => {
      expectCallToThrow(() => fsPromises.appendFile('/tmp/foo', 'bar'));
    });

    testif(fsPromises)('chmod', () => {
      expectCallToThrow(() => fsPromises.chmod('/tmp/foo', 0x777));
    });

    testif(fsPromises)('chown', () => {
      expectCallToThrow(() => fsPromises.chown('/tmp/foo', 0, 0));
    });

    testif(fsPromises)('copyFile', () => {
      expectCallToThrow(() => fsPromises.copyFile('/tmp/foo', '/tmp/bar'));
    });

    testif(fsPromises && fsPromises.cp)('cp', () => {
      expectCallToThrow(() => fsPromises.cp('/tmp/foo', '/tmp/bar'));
    });

    testif(fsPromises)('lchown', () => {
      expectCallToThrow(() => fsPromises.lchown('/tmp/foo', 0, 0));
    });

    testif(fsPromises)('lstat', () => {
      expectCallToThrow(() => fsPromises.lstat('/tmp/foo'));
    });

    testif(fsPromises && fsPromises.lutimes)('lutimes', () => {
      expectCallToThrow(() => fsPromises.lutimes('/tmp/foo', new Date(), new Date()));
    });

    testif(fsPromises)('link', () => {
      expectCallToThrow(() => fsPromises.link('/tmp/foo', '/tmp/bar'));
    });

    testif(fsPromises)('mkdir', () => {
      expectCallToThrow(() => fsPromises.mkdir('/tmp/foo'));
    });

    testif(fsPromises)('mkdtemp', () => {
      expectCallToThrow(() => fsPromises.mkdtemp('/tmp/foo'));
    });

    testif(fsPromises)('open', () => {
      expectCallToThrow(() => fsPromises.open('/tmp/foo'));
    });

    testif(fsPromises)('opendir', () => {
      expectCallToThrow(() => fsPromises.opendir('/tmp/foo'));
    });

    testif(fsPromises)('readdir', () => {
      expectCallToThrow(() => fsPromises.readdir('/tmp/foo'));
    });

    testif(fsPromises)('readFile', () => {
      expectCallToThrow(() => fsPromises.readFile('/tmp/foo'));
    });

    testif(fsPromises)('realpath', () => {
      expectCallToThrow(() => fsPromises.realpath('/tmp/foo'));
    });

    testif(fsPromises)('rename', () => {
      expectCallToThrow(() => fsPromises.rename('/tmp/foo', '/tmp/bar'));
    });

    testif(fsPromises && fsPromises.rm)('rm', () => {
      expectCallToThrow(() => fsPromises.rm('/tmp/foo'));
    });

    testif(fsPromises)('stat', () => {
      expectCallToThrow(() => fsPromises.stat('/tmp/foo'));
    });

    testif(fsPromises)('symlink', () => {
      expectCallToThrow(() => fsPromises.symlink('/tmp/foo', '/tmp/bar'));
    });

    testif(fsPromises)('truncate', () => {
      expectCallToThrow(() => fsPromises.truncate('/tmp/foo', 0));
    });

    testif(fsPromises)('unlink', () => {
      expectCallToThrow(() => fsPromises.unlink('/tmp/foo'));
    });

    testif(fsPromises)('utimes', () => {
      expectCallToThrow(() => fsPromises.utimes('/tmp/foo', new Date(), new Date()));
    });

    testif(fsPromises && fsPromises.watch)('watch', () => {
      expectCallToThrow(() => fsPromises.watch('/tmp/foo'));
    });

    testif(fsPromises)('writeFile', () => {
      expectCallToThrow(() => fsPromises.writeFile('/tmp/foo', 'bar'));
    });
  });
});
