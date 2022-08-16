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
        fromRoot: true,
      });
    });

    test('appendFile', async () => {
      await fs.appendFile(newTestFilePath, 'test');
      expectCallToMatch({
        family: 'fs/promises',
        method: 'appendFile',
        firstArg: newTestFilePath,
        fromRoot: true,
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
        fromRoot: true,
      });
    });

    test('chown', async () => {
      await fs.chown(testFilePath, testFileStats.uid, testFileStats.gid);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'chown',
        firstArg: testFilePath,
        secondArg: testFileStats.uid,
        fromRoot: true,
      });
    });

    test('copyFile', async () => {
      await fs.copyFile(testFilePath, newTestFilePath);
      expect(standardFs.existsSync(newTestFilePath)).toBeTruthy();
      expectCallToMatch({
        family: 'fs/promises',
        method: 'copyFile',
        firstArg: testFilePath,
        secondArg: newTestFilePath,
        fromRoot: true,
      });
      standardFs.unlinkSync(newTestFilePath);
    });

    testif(fs.cp)('cp', async () => {
      await fs.cp(testFilePath, newTestFilePath);
      expect(standardFs.existsSync(newTestFilePath)).toBeTruthy();
      expectCallToMatch({
        family: 'fs/promises',
        method: 'cp',
        firstArg: testFilePath,
        secondArg: newTestFilePath,
        fromRoot: true,
      });
      standardFs.unlinkSync(newTestFilePath);
    });

    test('lchown', async () => {
      await fs.lchown(testFilePath, testFileStats.uid, testFileStats.gid);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'lchown',
        firstArg: testFilePath,
        fromRoot: true,
      });
    });

    test('lstat', async () => {
      const stats = await fs.lstat(testFilePath);
      expect(stats.mode).toEqual(testFileStats.mode);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'lstat',
        firstArg: testFilePath,
        fromRoot: true,
      });
    });

    testif(fs.lutimes)('lutimes', async () => {
      await fs.lutimes(testFilePath, testFileStats.atime, testFileStats.mtime);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'lutimes',
        firstArg: testFilePath,
        secondArg: testFileStats.atime,
        fromRoot: true,
      });
    });

    test('link', async () => {
      await fs.link(testFilePath, newTestFilePath);
      expect(standardFs.existsSync(newTestFilePath)).toBeTruthy();
      expectCallToMatch({
        family: 'fs/promises',
        method: 'link',
        firstArg: testFilePath,
        secondArg: newTestFilePath,
        fromRoot: true,
      });
      standardFs.unlinkSync(newTestFilePath);
    });

    test('mkdir', async () => {
      await fs.mkdir(newTestDirPath);
      expect(standardFs.existsSync(newTestDirPath)).toBeTruthy();
      expectCallToMatch({
        family: 'fs/promises',
        method: 'mkdir',
        firstArg: newTestDirPath,
        fromRoot: true,
      });
      standardFs.rmdirSync(newTestDirPath);
    });

    test('mkdtemp', async () => {
      const dirPath = await fs.mkdtemp(__dirname);
      expect(standardFs.existsSync(dirPath)).toBeTruthy();
      expectCallToMatch({
        family: 'fs/promises',
        method: 'mkdtemp',
        firstArg: __dirname,
        fromRoot: true,
      });
      await fs.rmdir(dirPath);
    });

    test('open', async () => {
      const fd = await fs.open(testFilePath);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'open',
        firstArg: testFilePath,
        fromRoot: true,
      });
      await fd.close();
    });

    test('opendir', async () => {
      const dir = await fs.opendir(testDirPath);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'opendir',
        firstArg: testDirPath,
        fromRoot: true,
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
        fromRoot: true,
      });
    });

    test('readFile', async () => {
      const data = await fs.readFile(testFilePath);
      expect(data.toString()).toMatch('just for testing');
      expectCallToMatch({
        family: 'fs/promises',
        method: 'readFile',
        firstArg: testFilePath,
        fromRoot: true,
      });
    });

    test('realpath', async () => {
      const p = await fs.realpath(testFilePath);
      expect(p).toBe(testFilePath);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'realpath',
        firstArg: testFilePath,
        fromRoot: true,
      });
    });

    test('rename', async () => {
      await fs.rename(testFilePath, newTestFilePath);
      expect(standardFs.existsSync(newTestFilePath)).toBeTruthy();
      expectCallToMatch({
        family: 'fs/promises',
        method: 'rename',
        firstArg: testFilePath,
        secondArg: newTestFilePath,
        fromRoot: true,
      });
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
        fromRoot: true,
      });
    });

    test('stat', async () => {
      const stats = await fs.stat(testFilePath);
      expect(stats).toBeInstanceOf(standardFs.Stats);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'stat',
        firstArg: testFilePath,
        fromRoot: true,
      });
    });

    test('symlink', async () => {
      await fs.symlink(testFilePath, newTestFilePath);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'symlink',
        firstArg: testFilePath,
        fromRoot: true,
      });

      standardFs.unlinkSync(newTestFilePath);
    });

    test('truncate', async () => {
      await fs.truncate(testFilePath, 16);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'truncate',
        firstArg: testFilePath,
        fromRoot: true,
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
        fromRoot: true,
      });
    });

    test('utimes', async () => {
      await fs.utimes(testFilePath, testFileStats.atime, testFileStats.mtime);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'utimes',
        firstArg: testFilePath,
        fromRoot: true,
      });
    });

    testif(fs.watch)('watch', async () => {
      await fs.watch(testFilePath);
      expectCallToMatch({
        family: 'fs/promises',
        method: 'watch',
        firstArg: testFilePath,
        fromRoot: true,
      });
    });

    test('writeFile', async () => {
      await fs.writeFile(testFilePath, 'just for testing');
      expectCallToMatch({
        family: 'fs/promises',
        method: 'writeFile',
        firstArg: testFilePath,
        fromRoot: true,
      });
    });
  });
