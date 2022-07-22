const {test} = require('@playwright/test');
const {
  expectWebCallToMatch,
  serviceWorkersAvailable,
  serviceWorkerRegistrationHasFeature,
  loadSandwormOnWeb,
} = require('../utils');

test.describe('BackgroundFetchManager', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (
      !(await serviceWorkersAvailable(page)) ||
      !(await serviceWorkerRegistrationHasFeature('backgroundFetch', page))
    ) {
      test.skip('Background Fetch not available');
    }
  });

  test('fetch', async ({page}) => {
    await page.evaluate(async () => {
      const swReg = await navigator.serviceWorker.ready;
      await swReg.backgroundFetch.fetch('my-fetch', ['image.png']);
    });
    await expectWebCallToMatch({
      family: 'BackgroundFetchManager',
      method: 'fetch',
      firstArg: 'my-fetch',
      page,
    });
  });

  test('get', async ({page}) => {
    await page.evaluate(async () => {
      const swReg = await navigator.serviceWorker.ready;
      await swReg.backgroundFetch.get('my-fetch');
    });
    await expectWebCallToMatch({
      family: 'BackgroundFetchManager',
      method: 'get',
      firstArg: 'my-fetch',
      page,
    });
  });

  test('getIds', async ({page}) => {
    await page.evaluate(async () => {
      const swReg = await navigator.serviceWorker.ready;
      await swReg.backgroundFetch.getIds();
    });
    await expectWebCallToMatch({
      family: 'BackgroundFetchManager',
      method: 'getIds',
      page,
    });
  });
});
