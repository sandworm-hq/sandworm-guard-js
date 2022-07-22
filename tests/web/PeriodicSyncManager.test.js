const {test} = require('@playwright/test');
const {
  expectWebCallToMatch,
  loadSandwormOnWeb,
  serviceWorkersAvailable,
  serviceWorkerRegistrationHasFeature,
} = require('../utils');

test.describe('PeriodicSyncManager', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (
      !(await serviceWorkersAvailable(page)) ||
      !(await serviceWorkerRegistrationHasFeature('periodicSync', page))
    ) {
      test.skip('PeriodicSyncManager not available');
    }
  });

  test('register', async ({page}) => {
    await page.evaluate(async () => {
      const swReg = await navigator.serviceWorker.ready;
      swReg.periodicSync.register('test');
    });
    await expectWebCallToMatch({
      family: 'PeriodicSyncManager',
      method: 'register',
      page,
    });
  });

  test('unregister', async ({page}) => {
    await page.evaluate(async () => {
      const swReg = await navigator.serviceWorker.ready;
      swReg.periodicSync.unregister('test');
    });
    await expectWebCallToMatch({
      family: 'PeriodicSyncManager',
      method: 'unregister',
      page,
    });
  });

  test('getTags', async ({page}) => {
    try {
      await page.evaluate(async () => {
        const swReg = await navigator.serviceWorker.ready;
        swReg.periodicSync.getTags();
      });
    } catch (error) {}
    await expectWebCallToMatch({
      family: 'PeriodicSyncManager',
      method: 'getTags',
      page,
    });
  });
});
