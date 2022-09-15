let fs;

try {
  // eslint-disable-next-line global-require
  fs = require('fs/promises');
  // eslint-disable-next-line no-empty
} catch (error) {}

const standardFs = require('fs');
const path = require('path');
const {expectCallToMatch, testif} = require('../../utils');

const testDirPath = path.join(__dirname, 'test-dir');
const testFilePath = path.join(__dirname, 'test.txt');
const testFileStats = standardFs.statSync(testFilePath);
const newTestFilePath = path.join(__dirname, 'new-test.txt');
const newTestDirPath = path.join(__dirname, 'new-test-dir');

module.exports = () =>
  fs &&
  describe('fsPromises', () => {
    test('access', async () => {
      await fs.access(testFilePath, standardFs.constants.F_OK);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'access',
        firstArg: testFilePath,
      });
    });

    test('appendFile', async () => {
      await fs.appendFile(newTestFilePath, 'test');
      expectCallToMatch({
        family: 'fs/promises',
        method: 'appendFile',
        firstArg: newTestFilePath,
      });
      standardFs.unlinkSync(newTestFilePath);
    });

    test('chmod', async () => {
      await fs.chmod(testFilePath, testFileStats.mode);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'chmod',
        firstArg: testFilePath,
        secondArg: testFileStats.mode,
      });
    });

    test('chown', async () => {
      await fs.chown(testFilePath, testFileStats.uid, testFileStats.gid);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'chown',
        firstArg: testFilePath,
        secondArg: testFileStats.uid,
      });
    });

    test('copyFile', async () => {
      await fs.copyFile(testFilePath, newTestFilePath);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'copyFile',
        firstArg: testFilePath,
        secondArg: newTestFilePath,
      });
      expect(standardFs.existsSync(newTestFilePath)).toBeTruthy();
      standardFs.unlinkSync(newTestFilePath);
    });

    testif(fs.cp)('cp', async () => {
      await fs.cp(testFilePath, newTestFilePath);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'cp',
        firstArg: testFilePath,
        secondArg: newTestFilePath,
      });
      expect(standardFs.existsSync(newTestFilePath)).toBeTruthy();
      standardFs.unlinkSync(newTestFilePath);
    });

    test('lchown', async () => {
      await fs.lchown(testFilePath, testFileStats.uid, testFileStats.gid);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'lchown',
        firstArg: testFilePath,
      });
    });

    test('lstat', async () => {
      const stats = await fs.lstat(testFilePath);
      expect(stats.mode).toEqual(testFileStats.mode);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'lstat',
        firstArg: testFilePath,
      });
    });

    testif(fs.lutimes)('lutimes', async () => {
      await fs.lutimes(testFilePath, testFileStats.atime, testFileStats.mtime);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'lutimes',
        firstArg: testFilePath,
        secondArg: testFileStats.atime,
      });
    });

    test('link', async () => {
      await fs.link(testFilePath, newTestFilePath);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'link',
        firstArg: testFilePath,
        secondArg: newTestFilePath,
      });
      expect(standardFs.existsSync(newTestFilePath)).toBeTruthy();
      standardFs.unlinkSync(newTestFilePath);
    });

    test('mkdir', async () => {
      await fs.mkdir(newTestDirPath);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'mkdir',
        firstArg: newTestDirPath,
      });
      expect(standardFs.existsSync(newTestDirPath)).toBeTruthy();
      standardFs.rmdirSync(newTestDirPath);
    });

    test('mkdtemp', async () => {
      const dirPath = await fs.mkdtemp(__dirname);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'mkdtemp',
        firstArg: __dirname,
      });
      expect(standardFs.existsSync(dirPath)).toBeTruthy();
      await fs.rmdir(dirPath);
    });

    test('open', async () => {
      const fd = await fs.open(testFilePath);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'open',
        firstArg: testFilePath,
      });
      await fd.close();
    });

    test('opendir', async () => {
      const dir = await fs.opendir(testDirPath);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'opendir',
        firstArg: testDirPath,
      });
      await dir.close();
    });

    test('readdir', async () => {
      const files = await fs.readdir(testDirPath);
      expect(Array.isArray(files)).toBeTruthy();
      expectCallToMatch({
        family: 'fs/promises',
        method: 'readdir',
        firstArg: testDirPath,
      });
    });

    test('readFile', async () => {
      const data = await fs.readFile(testFilePath);
      expect(data.toString()).toMatch('just for testing');
      expectCallToMatch({
        family: 'fs/promises',
        method: 'readFile',
        firstArg: testFilePath,
      });
    });

    test('realpath', async () => {
      const p = await fs.realpath(testFilePath);
      expect(p).toBe(testFilePath);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'realpath',
        firstArg: testFilePath,
      });
    });

    test('rename', async () => {
      await fs.rename(testFilePath, newTestFilePath);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'rename',
        firstArg: testFilePath,
        secondArg: newTestFilePath,
      });
      expect(standardFs.existsSync(newTestFilePath)).toBeTruthy();
      await fs.rename(newTestFilePath, testFilePath);
    });

    testif(fs.rm)('rm', async () => {
      standardFs.copyFileSync(testFilePath, newTestFilePath);
      await fs.rm(newTestFilePath);
      expectCallToMatch({
        index: 1,
        family: 'fs/promises',
        method: 'rm',
        firstArg: newTestFilePath,
      });
    });

    test('stat', async () => {
      const stats = await fs.stat(testFilePath);
      expect(stats).toBeInstanceOf(standardFs.Stats);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'stat',
        firstArg: testFilePath,
      });
    });

    test('symlink', async () => {
      await fs.symlink(testFilePath, newTestFilePath);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'symlink',
        firstArg: testFilePath,
      });

      standardFs.unlinkSync(newTestFilePath);
    });

    test('truncate', async () => {
      await fs.truncate(testFilePath, 16);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'truncate',
        firstArg: testFilePath,
      });
    });

    test('unlink', async () => {
      standardFs.copyFileSync(testFilePath, newTestFilePath);
      await fs.unlink(newTestFilePath);
      expectCallToMatch({
        index: 1,
        family: 'fs/promises',
        method: 'unlink',
        firstArg: newTestFilePath,
      });
    });

    test('utimes', async () => {
      await fs.utimes(testFilePath, testFileStats.atime, testFileStats.mtime);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'utimes',
        firstArg: testFilePath,
      });
    });

    testif(fs.watch)('watch', async () => {
      await fs.watch(testFilePath);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'watch',
        firstArg: testFilePath,
      });
    });

    test('writeFile', async () => {
      await fs.writeFile(testFilePath, 'just for testing');
      expectCallToMatch({
        family: 'fs/promises',
        method: 'writeFile',
        firstArg: testFilePath,
      });
    });
  });
