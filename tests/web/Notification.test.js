const {test, expect} = require('@playwright/test');
const {
  expectWebCallToMatch,
  loadSandwormOnWeb,
  hasGlobalFeature,
  serviceWorkersAvailable,
  serviceWorkerRegistrationHasFeature,
} = require('../utils');

test.describe('Notification', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasGlobalFeature('Notification', page))) {
      test.skip('Notification API not available');
    }
  });

  test('Notification', async ({page}) => {
    const notificationTitle = await page.evaluate(async () => new Notification('test').title);
    expect(notificationTitle).toEqual('test');
    await expectWebCallToMatch({
      family: 'Notification',
      method: 'Notification',
      firstArg: 'test',
      page,
    });
  });

  test('requestPermission', async ({page, context}) => {
    try {
      await context.grantPermissions(['notifications']);
    } catch (error) {
      test.skip('Could not grant notifications permission');
    }

    if (!(await page.evaluate(() => 'requestPermission' in self))) {
      test.skip('Notification.requestPermission is not available');
    }

    const permissionResult = await page.evaluate(async () => Notification.requestPermission());
    expect(permissionResult).toEqual('granted');
    await expectWebCallToMatch({
      family: 'Notification',
      method: 'requestPermission',
      page,
    });
  });

  test('showNotification', async ({page, context}) => {
    try {
      await context.grantPermissions(['notifications']);
    } catch (error) {
      test.skip('Could not grant notifications permission');
    }

    if (
      !(await serviceWorkersAvailable(page)) ||
      !(await serviceWorkerRegistrationHasFeature('showNotification', page))
    ) {
      test.skip('Notification.showNotification not available');
    }

    try {
      await page.evaluate(async () => {
        const swReg = await navigator.serviceWorker.ready;
        await swReg.showNotification('test');
      });
    } catch (error) {}
    await expectWebCallToMatch({
      family: 'Notification',
      method: 'showNotification',
      firstArg: 'test',
      page,
    });
  });

  test('getNotifications', async ({page, context}) => {
    try {
      await context.grantPermissions(['notifications']);
    } catch (error) {
      test.skip('Could not grant notifications permission');
    }

    if (
      !(await serviceWorkersAvailable(page)) ||
      !(await serviceWorkerRegistrationHasFeature('getNotifications', page))
    ) {
      test.skip('Notification.getNotifications not available');
    }

    const notifications = await page.evaluate(async () => {
      const swReg = await navigator.serviceWorker.ready;
      return swReg.getNotifications();
    });
    expect(Array.isArray(notifications)).toBeTruthy();
    await expectWebCallToMatch({
      family: 'Notification',
      method: 'getNotifications',
      page,
    });
  });
});
