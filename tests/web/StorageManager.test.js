const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasNavigatorFeature} = require('../utils');

test.describe('StorageManager', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasNavigatorFeature('storage', page))) {
      test.skip('StorageManager API not available');
    }
  });

  test('estimate', async ({page}) => {
    if (!(await hasNavigatorFeature('storage', 'estimate', page))) {
      test.skip('StorageManager.estimate() not available');
    }
    const usage = await page.evaluate(async () => (await navigator.storage.estimate()).usage);
    expect(usage).toEqual(0);
    await expectWebCallToMatch({
      family: 'StorageManager',
      method: 'estimate',
      page,
    });
  });

  test('persist', async ({page, browser}) => {
    if (browser.browserType().name() === 'firefox') {
      test.skip('StorageManager.persist hangs on Firefox');
    }
    await page.evaluate(async () => navigator.storage.persist());
    await expectWebCallToMatch({
      family: 'StorageManager',
      method: 'persist',
      page,
    });
  });

  test('persisted', async ({page}) => {
    const persisted = await page.evaluate(async () => navigator.storage.persisted());
    expect(persisted).toBeFalsy();
    await expectWebCallToMatch({
      family: 'StorageManager',
      method: 'persisted',
      page,
    });
  });
});
