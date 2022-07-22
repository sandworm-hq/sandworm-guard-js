const {test, expect} = require('@playwright/test');
const {
  expectWebCallToMatch,
  serviceWorkersAvailable,
  serviceWorkerRegistrationHasFeature,
  loadSandwormOnWeb,
} = require('../utils');

test.describe('PushManager', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (
      !(await serviceWorkersAvailable(page)) ||
      !(await serviceWorkerRegistrationHasFeature('pushManager', page))
    ) {
      test.skip('Push API not available');
    }
  });

  test('getSubscription', async ({page}) => {
    try {
      await page.evaluate(async () => {
        const swReg = await navigator.serviceWorker.ready;
        await swReg.pushManager.getSubscription();
      });
    } catch (error) {}
    await expectWebCallToMatch({
      family: 'PushManager',
      method: 'getSubscription',
      page,
    });
  });

  test('hasPermission', async ({page}) => {
    if (!(await serviceWorkerRegistrationHasFeature('pushManager', 'hasPermission', page))) {
      test.skip('PushManager.hasPermission is not available');
    }
    await page.evaluate(async () => {
      const swReg = await navigator.serviceWorker.ready;
      await swReg.pushManager.hasPermission();
    });
    await expectWebCallToMatch({
      family: 'PushManager',
      method: 'hasPermission',
      page,
    });
  });

  test('permissionState', async ({page}) => {
    const state = await page.evaluate(async () => {
      const swReg = await navigator.serviceWorker.ready;
      return swReg.pushManager.permissionState({userVisibleOnly: true});
    });
    expect(state).toEqual('prompt');
    await expectWebCallToMatch({
      family: 'PushManager',
      method: 'permissionState',
      page,
    });
  });

  test('register', async ({page}) => {
    if (!(await serviceWorkerRegistrationHasFeature('pushManager', 'register', page))) {
      test.skip('PushManager.register is not available');
    }
    await page.evaluate(async () => {
      const swReg = await navigator.serviceWorker.ready;
      return swReg.pushManager.register();
    });
    await expectWebCallToMatch({
      family: 'PushManager',
      method: 'register',
      page,
    });
  });

  test('registrations', async ({page}) => {
    if (!(await serviceWorkerRegistrationHasFeature('pushManager', 'registrations', page))) {
      test.skip('PushManager.registrations is not available');
    }
    await page.evaluate(async () => {
      const swReg = await navigator.serviceWorker.ready;
      return swReg.pushManager.registrations();
    });
    await expectWebCallToMatch({
      family: 'PushManager',
      method: 'registrations',
      page,
    });
  });

  test('subscribe', async ({page}) => {
    await page.evaluate(async () => {
      const swReg = await navigator.serviceWorker.ready;
      // This hangs on firefox
      // Intentionally not awaiting the promise
      swReg.pushManager.subscribe();
    });
    await expectWebCallToMatch({
      family: 'PushManager',
      method: 'subscribe',
      page,
    });
  });

  test('unregister', async ({page}) => {
    if (!(await serviceWorkerRegistrationHasFeature('pushManager', 'unregister', page))) {
      test.skip('PushManager.unregister is not available');
    }
    await page.evaluate(async () => {
      const swReg = await navigator.serviceWorker.ready;
      return swReg.pushManager.unregister('');
    });
    await expectWebCallToMatch({
      family: 'PushManager',
      method: 'unregister',
      page,
    });
  });
});
