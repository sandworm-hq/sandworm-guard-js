const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasNavigatorFeature} = require('../utils');

test.describe('Permissions', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasNavigatorFeature('permissions', page))) {
      test.skip('Permissions API not available');
    }
  });

  test('query', async ({page}) => {
    const state = await page.evaluate(
      async () => (await navigator.permissions.query({name: 'geolocation'})).state,
    );
    expect(state).toEqual('prompt');
    await expectWebCallToMatch({
      family: 'Permissions',
      method: 'query',
      page,
    });
  });

  test('revoke', async ({page}) => {
    if (!(await hasNavigatorFeature('permissions', 'revoke', page))) {
      test.skip('Permissions.revoke not available');
    }
    const state = await page.evaluate(
      async () => (await navigator.permissions.revoke({name: 'geolocation'})).state,
    );
    expect(state).toEqual('denied');
    await expectWebCallToMatch({
      family: 'Permissions',
      method: 'revoke',
      page,
    });
  });
});
