const {test} = require('@playwright/test');
const {expectCallToMatch, loadSandwormOnWeb, webWorkersAvailable} = require('../utils');

test.describe('Worker', () => {
  test.beforeEach(async ({page}) => {
    // Worker API seems overridden by Playwright
    test.skip('Worker API not available');

    await loadSandwormOnWeb(page);
    if (!(await webWorkersAvailable(page))) {
      test.skip('Worker API not available');
    }
  });

  test('Worker', async ({page}) => {
    await page.evaluate(() => new Worker('worker.js'));
    await expectCallToMatch({
      family: 'Worker',
      method: 'Worker',
      firstArg: 'worker.js',
      page,
    });
  });

  test('postMessage', async ({page}) => {
    await page.evaluate(() => {
      const worker = new Worker('worker.js');
      worker.postMessage('test');
    });
    await expectCallToMatch({
      family: 'Worker',
      method: 'postMessage',
      firstArg: 'test',
      page,
    });
  });

  test('terminate', async ({page}) => {
    await page.evaluate(() => {
      const worker = new Worker('worker.js');
      worker.terminate();
    });
    await expectCallToMatch({
      family: 'Worker',
      method: 'terminate',
      page,
    });
  });
});
