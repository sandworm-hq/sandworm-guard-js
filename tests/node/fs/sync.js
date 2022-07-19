const fs = require('fs');
const path = require('path');
const Sandworm = require('../../../dist/index');
const {expectCallToMatch} = require('../../utils');

const testDirPath = path.join(__dirname, 'test-dir');
const testFilePath = path.join(__dirname, 'test.txt');
const testFileStats = fs.statSync(testFilePath);
const newTestFilePath = path.join(__dirname, 'new-test.txt');
const newTestDirPath = path.join(__dirname, 'new-test-dir');

const withTestFile = (operation) => {
  const fd = fs.openSync(testFilePath, 'r+');
  operation(fd);
  fs.closeSync(fd);
};

export default () =>
  describe('fsSync', () => {
    beforeAll(async () => Sandworm.init({devMode: true}));
    afterEach(() => Sandworm.clearHistory());

    test('accessSync', () => {
      fs.accessSync(testFilePath, fs.constants.F_OK);
      expectCallToMatch({family: 'fs', method: 'accessSync', firstArg: testFilePath});
    });

    test('appendFileSync', () => {
      fs.appendFileSync(newTestFilePath, 'test');
      expectCallToMatch({family: 'fs', method: 'appendFileSync', firstArg: newTestFilePath});
      fs.rmSync(newTestFilePath);
    });

    test('chmodSync', () => {
      fs.chmodSync(testFilePath, testFileStats.mode);
      expectCallToMatch({
        family: 'fs',
        method: 'chmodSync',
        firstArg: testFilePath,
        secondArg: testFileStats.mode,
      });
    });

    test('chownSync', () => {
      fs.chownSync(testFilePath, testFileStats.uid, testFileStats.gid);
      expectCallToMatch({
        family: 'fs',
        method: 'chownSync',
        firstArg: testFilePath,
        secondArg: testFileStats.uid,
      });
    });

    test('closeSync', () => {
      const fd = fs.openSync(testFilePath);
      fs.closeSync(fd);
      expectCallToMatch({
        family: 'fs',
        method: 'closeSync',
        firstArg: fd,
        index: 1,
      });
    });

    test('copyFileSync', () => {
      fs.copyFileSync(testFilePath, newTestFilePath);
      expect(fs.existsSync(newTestFilePath)).toBeTruthy();
      expectCallToMatch({
        family: 'fs',
        method: 'copyFileSync',
        firstArg: testFilePath,
        secondArg: newTestFilePath,
      });
      fs.rmSync(newTestFilePath);
    });

    test('cpSync', () => {
      fs.cpSync(testFilePath, newTestFilePath);
      expect(fs.existsSync(newTestFilePath)).toBeTruthy();
      expectCallToMatch({
        family: 'fs',
        method: 'cpSync',
        firstArg: testFilePath,
        secondArg: newTestFilePath,
      });
      fs.rmSync(newTestFilePath);
    });

    test('existsSync', () => {
      expect(fs.existsSync(testFilePath)).toBeTruthy();
    });

    test('fchmodSync', () => {
      withTestFile((fd) => {
        fs.fchmodSync(fd, testFileStats.mode);
        expectCallToMatch({
          index: 1,
          family: 'fs',
          method: 'fchmodSync',
          firstArg: fd,
        });
      });
    });

    test('fchownSync', () => {
      withTestFile((fd) => {
        fs.fchownSync(fd, testFileStats.uid, testFileStats.gid);
        expectCallToMatch({
          index: 1,
          family: 'fs',
          method: 'fchownSync',
          firstArg: fd,
        });
      });
    });

    test('fdatasyncSync', () => {
      withTestFile((fd) => {
        fs.fdatasyncSync(fd);
        expectCallToMatch({
          index: 1,
          family: 'fs',
          method: 'fdatasyncSync',
          firstArg: fd,
        });
      });
    });

    test('fstatSync', () => {
      withTestFile((fd) => {
        const stats = fs.fstatSync(fd);
        expect(stats.mode).toEqual(testFileStats.mode);
        expectCallToMatch({
          index: 1,
          family: 'fs',
          method: 'fstatSync',
          firstArg: fd,
        });
      });
    });

    test('fsyncSync', () => {
      withTestFile((fd) => {
        fs.fsyncSync(fd);
        expectCallToMatch({
          index: 1,
          family: 'fs',
          method: 'fsyncSync',
          firstArg: fd,
        });
      });
    });

    test('ftruncateSync', () => {
      withTestFile((fd) => {
        fs.ftruncateSync(fd, 16);
        expectCallToMatch({
          index: 1,
          family: 'fs',
          method: 'ftruncateSync',
          firstArg: fd,
          secondArg: 16,
        });
      });
    });

    test('futimesSync', () => {
      withTestFile((fd) => {
        fs.futimesSync(fd, testFileStats.atime, testFileStats.mtime);
        expectCallToMatch({
          index: 1,
          family: 'fs',
          method: 'futimesSync',
          firstArg: fd,
          secondArg: testFileStats.atime,
        });
      });
    });

    test('linkSync', () => {
      fs.linkSync(testFilePath, newTestFilePath);
      expect(fs.existsSync(newTestFilePath)).toBeTruthy();
      expectCallToMatch({
        family: 'fs',
        method: 'linkSync',
        firstArg: testFilePath,
        secondArg: newTestFilePath,
      });
      fs.rmSync(newTestFilePath);
    });

    test('mkdirSync', () => {
      fs.mkdirSync(newTestDirPath);
      expect(fs.existsSync(newTestDirPath)).toBeTruthy();
      expectCallToMatch({
        family: 'fs',
        method: 'mkdirSync',
        firstArg: newTestDirPath,
      });
      fs.rmdirSync(newTestDirPath);
    });

    test('mkdtempSync', () => {
      const dirPath = fs.mkdtempSync(__dirname);
      expect(fs.existsSync(dirPath)).toBeTruthy();
      expectCallToMatch({
        family: 'fs',
        method: 'mkdtempSync',
        firstArg: __dirname,
      });
      fs.rmdirSync(dirPath);
    });

    test('openSync', () => {
      const fd = fs.openSync(testFilePath);
      expectCallToMatch({
        family: 'fs',
        method: 'openSync',
        firstArg: testFilePath,
      });
      fs.closeSync(fd);
    });

    test('opendirSync', () => {
      const dir = fs.opendirSync(testDirPath);
      expectCallToMatch({
        family: 'fs',
        method: 'opendirSync',
        firstArg: testDirPath,
      });
      dir.closeSync();
    });

    test('readSync', () => {
      withTestFile((fd) => {
        const buf = Buffer.alloc(16);
        fs.readSync(fd, buf);
        expect(buf.toString()).toEqual('just for testing');
        expectCallToMatch({
          index: 1,
          family: 'fs',
          method: 'readSync',
          firstArg: fd,
        });
      });
    });

    test('readdirSync', () => {
      const files = fs.readdirSync(testDirPath);
      expect(Array.isArray(files)).toBeTruthy();
      expectCallToMatch({
        family: 'fs',
        method: 'readdirSync',
        firstArg: testDirPath,
      });
    });

    test('readFileSync', () => {
      const data = fs.readFileSync(testFilePath);
      expect(data.toString()).toMatch('just for testing');
      expectCallToMatch({family: 'fs', method: 'readFileSync', firstArg: testFilePath});
    });

    test('realpathSync', () => {
      const p = fs.realpathSync(testFilePath);
      expect(p).toBe(testFilePath);
      expectCallToMatch({
        family: 'fs',
        method: 'realpathSync',
        firstArg: testFilePath,
      });
    });

    test('renameSync', () => {
      fs.renameSync(testFilePath, newTestFilePath);
      expect(fs.existsSync(newTestFilePath)).toBeTruthy();
      expectCallToMatch({
        family: 'fs',
        method: 'renameSync',
        firstArg: testFilePath,
        secondArg: newTestFilePath,
      });
      fs.renameSync(newTestFilePath, testFilePath);
    });

    test('rmSync', () => {
      fs.cpSync(testFilePath, newTestFilePath);
      fs.rmSync(newTestFilePath);
      expectCallToMatch({
        index: 3,
        family: 'fs',
        method: 'rmSync',
        firstArg: newTestFilePath,
      });
    });

    test('statSync', () => {
      const stats = fs.statSync(testFilePath);
      expect(stats).toBeInstanceOf(fs.Stats);
      expectCallToMatch({
        family: 'fs',
        method: 'statSync',
        firstArg: testFilePath,
      });
    });

    test('symlinkSync', () => {
      fs.symlinkSync(testFilePath, newTestFilePath);
      expectCallToMatch({
        family: 'fs',
        method: 'symlinkSync',
        firstArg: testFilePath,
      });

      fs.rmSync(newTestFilePath);
    });

    test('truncateSync', () => {
      fs.truncateSync(testFilePath, 16);
      expectCallToMatch({
        family: 'fs',
        method: 'truncateSync',
        firstArg: testFilePath,
      });
    });

    test('unlinkSync', () => {
      fs.cpSync(testFilePath, newTestFilePath);
      fs.unlinkSync(newTestFilePath);
      expectCallToMatch({
        index: 3,
        family: 'fs',
        method: 'unlinkSync',
        firstArg: newTestFilePath,
      });
    });

    test('utimesSync', () => {
      fs.utimesSync(testFilePath, testFileStats.atime, testFileStats.mtime);
      expectCallToMatch({
        family: 'fs',
        method: 'utimesSync',
        firstArg: testFilePath,
      });
    });

    test('writeSync', () => {
      withTestFile((fd) => {
        fs.writeSync(fd, 'just for testing');
        expectCallToMatch({
          index: 1,
          family: 'fs',
          method: 'writeSync',
          firstArg: fd,
        });
      });
    });

    test('writeFileSync', () => {
      fs.writeFileSync(testFilePath, 'just for testing');
      expectCallToMatch({
        family: 'fs',
        method: 'writeFileSync',
        firstArg: testFilePath,
      });
    });
  });
