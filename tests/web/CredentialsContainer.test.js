const {test} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasNavigatorFeature} = require('../utils');

test.describe('CredentialsContainer', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasNavigatorFeature('credentials', page))) {
      test.skip('Credentials Container not available');
    }
  });

  test('get', async ({page}) => {
    try {
      await page.evaluate(async () => navigator.credentials.get());
    } catch (error) {}
    await expectWebCallToMatch({
      family: 'CredentialsContainer',
      method: 'get',
      page,
    });
  });

  test('create', async ({page}) => {
    try {
      await page.evaluate(async () => navigator.credentials.create());
    } catch (error) {}
    await expectWebCallToMatch({
      family: 'CredentialsContainer',
      method: 'create',
      page,
    });
  });

  test('preventSilentAccess', async ({page}) => {
    try {
      await page.evaluate(async () => navigator.credentials.preventSilentAccess());
    } catch (error) {}
    await expectWebCallToMatch({
      family: 'CredentialsContainer',
      method: 'preventSilentAccess',
      page,
    });
  });

  test('store', async ({page}) => {
    try {
      await page.evaluate(async () => navigator.credentials.store());
    } catch (error) {}
    await expectWebCallToMatch({
      family: 'CredentialsContainer',
      method: 'store',
      page,
    });
  });
});
