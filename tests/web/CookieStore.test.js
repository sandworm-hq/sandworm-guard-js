const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasGlobalFeature} = require('../utils');

test.describe('CookieStore', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasGlobalFeature('cookieStore', page))) {
      test.skip('Cookie Store not available');
    }
  });

  test('get', async ({page}) => {
    const cookie = await page.evaluate(async () => self.cookieStore.get('cookie1'));
    expect(cookie).toBeNull();
    await expectWebCallToMatch({
      family: 'CookieStore',
      method: 'get',
      firstArg: 'cookie1',
      page,
    });
  });

  test('getAll', async ({page}) => {
    const cookies = await page.evaluate(async () => self.cookieStore.getAll());
    expect(Array.isArray(cookies)).toBeTruthy();
    await expectWebCallToMatch({
      family: 'CookieStore',
      method: 'getAll',
      page,
    });
  });

  test('set', async ({page}) => {
    await page.evaluate(async () => self.cookieStore.set('cookie1', 'test'));
    const cookie = await page.evaluate(async () => self.cookieStore.get('cookie1'));
    expect(cookie).not.toBeNull();
    expect(cookie.value).toEqual('test');
    await expectWebCallToMatch({
      family: 'CookieStore',
      method: 'set',
      page,
    });
  });

  test('delete', async ({page}) => {
    await page.evaluate(async () => self.cookieStore.delete('cookie1'));
    await expectWebCallToMatch({
      family: 'CookieStore',
      method: 'delete',
      page,
    });
  });
});
