const fs = require('fs');
const path = require('path');
const {expectCallToMatch, testif} = require('../../utils');

const testDirPath = path.join(__dirname, 'test-dir');
const testFilePath = path.join(__dirname, 'test.txt');
const testFileStats = fs.statSync(testFilePath);
const newTestFilePath = path.join(__dirname, 'new-test.txt');
const newTestDirPath = path.join(__dirname, 'new-test-dir');

const withTestFile = (operation, done) => {
  fs.open(testFilePath, 'r+', (err, fd) => {
    if (err) {
      done(err);
      return;
    }
    operation(fd, (opErr) => fs.close(fd, (closeErr) => done(closeErr || opErr)));
  });
};

module.exports = () =>
  describe('fsAsync', () => {
    test('access', (done) => {
      fs.access(testFilePath, fs.constants.F_OK, done);
      expectCallToMatch({family: 'fs', method: 'access', firstArg: testFilePath});
    });

    test('appendFile', (done) => {
      fs.appendFile(newTestFilePath, 'test', () => {
        fs.unlink(newTestFilePath, () => {
          expectCallToMatch({
            family: 'fs',
            method: 'appendFile',
            firstArg: newTestFilePath,
            offset: 1,
          });
          done();
        });
      });
    });

    test('chmod', (done) => {
      fs.chmod(testFilePath, testFileStats.mode, (err) => {
        if (err) {
          done(err);
          return;
        }
        expectCallToMatch({
          family: 'fs',
          method: 'chmod',
          firstArg: testFilePath,
          secondArg: testFileStats.mode,
        });
        done();
      });
    });

    test('chown', (done) => {
      fs.chown(testFilePath, testFileStats.uid, testFileStats.gid, (err) => {
        if (err) {
          done(err);
          return;
        }
        expectCallToMatch({
          family: 'fs',
          method: 'chown',
          firstArg: testFilePath,
          secondArg: testFileStats.uid,
        });
        done();
      });
    });

    test('close', (done) => {
      fs.open(testFilePath, 'r', (err, fd) => {
        if (err) {
          done(err);
          return;
        }
        fs.close(fd, (err2) => {
          expectCallToMatch({
            fromRoot: true,
            family: 'fs',
            method: 'close',
            firstArg: fd,
          });
          done(err2);
        });
      });
    });

    test('copyFile', (done) => {
      fs.copyFile(testFilePath, newTestFilePath, (err) => {
        if (err) {
          done(err);
          return;
        }
        expectCallToMatch({
          family: 'fs',
          method: 'copyFile',
          firstArg: testFilePath,
          secondArg: newTestFilePath,
        });
        expect(fs.existsSync(newTestFilePath)).toBeTruthy();
        fs.unlink(newTestFilePath, done);
      });
    });

    test('cp', (done) => {
      if (fs.cp) {
        fs.cp(testFilePath, newTestFilePath, (err) => {
          if (err) {
            done(err);
            return;
          }
          expectCallToMatch({
            family: 'fs',
            method: 'cp',
            firstArg: testFilePath,
            secondArg: newTestFilePath,
          });
          expect(fs.existsSync(newTestFilePath)).toBeTruthy();
          fs.unlink(newTestFilePath, done);
        });
      } else {
        done();
      }
    });

    test('createReadStream', () => {
      const rs = fs.createReadStream(testFilePath);
      expectCallToMatch({
        family: 'fs',
        method: 'createReadStream',
        firstArg: testFilePath,
      });
      rs.close();
    });

    test('createWriteStream', (done) => {
      const ws = fs.createWriteStream(newTestFilePath);
      expectCallToMatch({
        family: 'fs',
        method: 'createWriteStream',
        firstArg: newTestFilePath,
      });
      ws.close();
      ws.on('close', () => {
        fs.unlink(newTestFilePath, done);
      });
    });

    test('exists', (done) => {
      fs.exists(testFilePath, (exists) => {
        expect(exists).toBeTruthy();
        done();
      });
    });

    test('fchmod', (done) => {
      withTestFile((fd, testDone) => {
        fs.fchmod(fd, testFileStats.mode, () => {
          expectCallToMatch({
            fromRoot: true,
            family: 'fs',
            method: 'fchmod',
            firstArg: fd,
          });
          testDone();
        });
      }, done);
    });

    test('fchown', (done) => {
      withTestFile((fd, testDone) => {
        fs.fchown(fd, testFileStats.uid, testFileStats.gid, () => {
          expectCallToMatch({
            fromRoot: true,
            family: 'fs',
            method: 'fchown',
            firstArg: fd,
          });
          testDone();
        });
      }, done);
    });

    test('fdatasync', (done) => {
      withTestFile((fd, testDone) => {
        fs.fdatasync(fd, () => {
          expectCallToMatch({
            fromRoot: true,
            family: 'fs',
            method: 'fdatasync',
            firstArg: fd,
          });
          testDone();
        });
      }, done);
    });

    test('fstat', (done) => {
      withTestFile((fd, testDone) => {
        fs.fstat(fd, (err, stats) => {
          if (err) {
            testDone(err);
            return;
          }
          expect(stats.mode).toEqual(testFileStats.mode);
          expectCallToMatch({
            fromRoot: true,
            family: 'fs',
            method: 'fstat',
            firstArg: fd,
          });
          testDone();
        });
      }, done);
    });

    test('fsync', (done) => {
      withTestFile((fd, testDone) => {
        fs.fsync(fd, () => {
          expectCallToMatch({
            fromRoot: true,
            family: 'fs',
            method: 'fsync',
            firstArg: fd,
          });
          testDone();
        });
      }, done);
    });

    test('ftruncate', (done) => {
      withTestFile((fd, testDone) => {
        fs.ftruncate(fd, 1024, () => {
          expectCallToMatch({
            fromRoot: true,
            family: 'fs',
            method: 'ftruncate',
            firstArg: fd,
            secondArg: 1024,
          });
          testDone();
        });
      }, done);
    });

    test('futimes', (done) => {
      withTestFile((fd, testDone) => {
        fs.futimes(fd, testFileStats.atime, testFileStats.mtime, () => {
          expectCallToMatch({
            fromRoot: true,
            family: 'fs',
            method: 'futimes',
            firstArg: fd,
            secondArg: testFileStats.atime,
          });
          testDone();
        });
      }, done);
    });

    test('link', (done) => {
      fs.link(testFilePath, newTestFilePath, (err) => {
        if (err) {
          done(err);
          return;
        }
        expectCallToMatch({
          family: 'fs',
          method: 'link',
          firstArg: testFilePath,
          secondArg: newTestFilePath,
        });
        expect(fs.existsSync(newTestFilePath)).toBeTruthy();
        fs.unlink(newTestFilePath, done);
      });
    });

    test('mkdir', (done) => {
      fs.mkdir(newTestDirPath, (err) => {
        if (err) {
          done(err);
          return;
        }
        expectCallToMatch({
          family: 'fs',
          method: 'mkdir',
          firstArg: newTestDirPath,
        });
        expect(fs.existsSync(newTestDirPath)).toBeTruthy();
        fs.rmdir(newTestDirPath, done);
      });
    });

    test('mkdtemp', (done) => {
      fs.mkdtemp(__dirname, (err, dirPath) => {
        if (err) {
          done(err);
          return;
        }
        expectCallToMatch({
          family: 'fs',
          method: 'mkdtemp',
          firstArg: __dirname,
        });
        expect(fs.existsSync(dirPath)).toBeTruthy();
        fs.rmdir(dirPath, done);
      });
    });

    test('open', (done) => {
      fs.open(testFilePath, 'r', (err, fd) => {
        if (err) {
          done(err);
          return;
        }
        expectCallToMatch({
          family: 'fs',
          method: 'open',
          firstArg: testFilePath,
        });
        fs.close(fd, done);
      });
    });

    testif(fs.opendir)('opendir', (done) => {
      fs.opendir(testDirPath, (err, dir) => {
        if (err) {
          done(err);
          return;
        }
        expectCallToMatch({
          family: 'fs',
          method: 'opendir',
          firstArg: testDirPath,
        });
        dir.closeSync();
        done();
      });
    });

    test('read', (done) => {
      withTestFile((fd, testDone) => {
        fs.read(fd, Buffer.alloc(16), 0, 16, null, (err, bytes, buffer) => {
          if (err) {
            testDone(err);
            return;
          }
          expect(buffer.toString()).toMatch('just for testing');
          expectCallToMatch({
            fromRoot: true,
            family: 'fs',
            method: 'read',
            firstArg: fd,
          });
          testDone();
        });
      }, done);
    });

    test('readdir', (done) => {
      fs.readdir(testDirPath, (err, files) => {
        if (err) {
          done(err);
          return;
        }
        expect(Array.isArray(files)).toBeTruthy();
        expectCallToMatch({
          family: 'fs',
          method: 'readdir',
          firstArg: testDirPath,
        });
        done(err);
      });
    });

    test('readFile', (done) => {
      fs.readFile(testFilePath, (err, data) => {
        expect(data.toString()).toMatch('just for testing');
        expectCallToMatch({family: 'fs', method: 'readFile', firstArg: testFilePath});
        done(err);
      });
    });

    test('realpath', (done) => {
      fs.realpath(testFilePath, (err, p) => {
        expect(p).toBe(testFilePath);
        expectCallToMatch({
          family: 'fs',
          method: 'realpath',
          firstArg: testFilePath,
        });
        done(err);
      });
    });

    test('rename', (done) => {
      fs.rename(testFilePath, newTestFilePath, (err) => {
        if (err) {
          done(err);
          return;
        }
        expectCallToMatch({
          family: 'fs',
          method: 'rename',
          firstArg: testFilePath,
          secondArg: newTestFilePath,
        });
        expect(fs.existsSync(newTestFilePath)).toBeTruthy();
        fs.rename(newTestFilePath, testFilePath, done);
      });
    });

    testif(fs.rm)('rm', (done) => {
      fs.copyFile(testFilePath, newTestFilePath, (err) => {
        if (err) {
          done(err);
          return;
        }
        fs.rm(newTestFilePath, (rmErr) => {
          expectCallToMatch({
            family: 'fs',
            method: 'rm',
            firstArg: newTestFilePath,
            fromRoot: true,
          });
          done(rmErr);
        });
      });
    });

    test('stat', (done) => {
      fs.stat(testFilePath, (err, stats) => {
        if (err) {
          done(err);
          return;
        }
        expect(stats).toBeInstanceOf(fs.Stats);
        expectCallToMatch({
          family: 'fs',
          method: 'stat',
          firstArg: testFilePath,
        });
        done();
      });
    });

    test('symlink', (done) => {
      fs.symlink(testFilePath, newTestFilePath, (err) => {
        if (err) {
          done(err);
          return;
        }

        expectCallToMatch({
          family: 'fs',
          method: 'symlink',
          firstArg: testFilePath,
        });

        fs.unlink(newTestFilePath, done);
      });
    });

    test('truncate', (done) => {
      fs.truncate(testFilePath, 16, (err) => {
        expectCallToMatch({
          family: 'fs',
          method: 'truncate',
          firstArg: testFilePath,
        });
        done(err);
      });
    });

    test('unlink', (done) => {
      fs.copyFile(testFilePath, newTestFilePath, (err) => {
        if (err) {
          done(err);
          return;
        }
        fs.unlink(newTestFilePath, (rmErr) => {
          expectCallToMatch({
            family: 'fs',
            method: 'unlink',
            firstArg: newTestFilePath,
            fromRoot: true,
          });
          done(rmErr);
        });
      });
    });

    test('unwatchFile', () => {
      fs.unwatchFile(testFilePath);
      expectCallToMatch({
        family: 'fs',
        method: 'unwatchFile',
        firstArg: testFilePath,
      });
    });

    test('utimes', (done) => {
      fs.utimes(testFilePath, testFileStats.atime, testFileStats.mtime, (err) => {
        expectCallToMatch({
          family: 'fs',
          method: 'utimes',
          firstArg: testFilePath,
        });
        done(err);
      });
    });

    test('watch', () => {
      const watcher = fs.watch(testFilePath);
      expectCallToMatch({
        family: 'fs',
        method: 'watch',
        firstArg: testFilePath,
      });
      watcher.close();
    });

    test('watchFile', () => {
      fs.watchFile(testFilePath, () => {});
      expectCallToMatch({
        family: 'fs',
        method: 'watchFile',
        firstArg: testFilePath,
      });
      fs.unwatchFile(testFilePath);
    });

    test('write', (done) => {
      withTestFile((fd, testDone) => {
        fs.write(fd, 'just for testing', (err) => {
          expectCallToMatch({
            family: 'fs',
            method: 'write',
            firstArg: fd,
            fromRoot: true,
          });
          testDone(err);
        });
      }, done);
    });

    test('writeFile', (done) => {
      fs.writeFile(testFilePath, 'just for testing', (err) => {
        expectCallToMatch({
          family: 'fs',
          method: 'writeFile',
          firstArg: testFilePath,
        });
        done(err);
      });
    });
  });
