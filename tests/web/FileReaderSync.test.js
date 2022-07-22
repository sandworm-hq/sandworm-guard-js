const {test} = require('@playwright/test');
const {
  expectWebWorkerCallToMatch,
  loadSandwormOnWeb,
  webWorkersAvailable,
  webWorkerHasFeature,
  startWebWorker,
} = require('../utils');

test.describe('FileReaderSync', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (
      !(await webWorkersAvailable(page)) ||
      !(await webWorkerHasFeature('FileReaderSync', page))
    ) {
      test.skip('FileReaderSync not available');
    }
  });

  test('FileReaderSync', async ({page}) => {
    const worker = await startWebWorker(page);
    await worker.evaluate(() => new FileReaderSync());
    await expectWebWorkerCallToMatch({family: 'FileReaderSync', method: 'FileReaderSync', worker});
  });

  test('readAsArrayBuffer', async ({page}) => {
    const worker = await startWebWorker(page);
    await worker.evaluate(() => {
      const reader = new FileReaderSync();
      reader.readAsArrayBuffer(new Blob());
    });
    await expectWebWorkerCallToMatch({
      family: 'FileReaderSync',
      method: 'readAsArrayBuffer',
      index: 1,
      worker,
    });
  });

  test('readAsBinaryString', async ({page}) => {
    const worker = await startWebWorker(page);
    await worker.evaluate(() => {
      const reader = new FileReaderSync();
      reader.readAsBinaryString(new Blob());
    });
    await expectWebWorkerCallToMatch({
      family: 'FileReaderSync',
      method: 'readAsBinaryString',
      index: 1,
      worker,
    });
  });

  test('readAsDataURL', async ({page}) => {
    const worker = await startWebWorker(page);
    await worker.evaluate(() => {
      const reader = new FileReaderSync();
      reader.readAsDataURL(new Blob());
    });
    await expectWebWorkerCallToMatch({
      family: 'FileReaderSync',
      method: 'readAsDataURL',
      index: 1,
      worker,
    });
  });

  test('readAsText', async ({page}) => {
    const worker = await startWebWorker(page);
    await worker.evaluate(() => {
      const reader = new FileReaderSync();
      reader.readAsText(new Blob());
    });
    await expectWebWorkerCallToMatch({
      family: 'FileReaderSync',
      method: 'readAsText',
      index: 1,
      worker,
    });
  });
});
