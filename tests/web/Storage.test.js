const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasGlobalFeature} = require('../utils');

test.describe('Storage', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasGlobalFeature('localStorage', page))) {
      test.skip('Storage API not available');
    }
  });

  test('getItem', async ({page}) => {
    const value = await page.evaluate(async () => self.localStorage.getItem('test'));
    expect(value).toBeNull();
    await expectWebCallToMatch({
      family: 'Storage',
      method: 'getItem',
      page,
    });
  });

  test('setItem', async ({page}) => {
    await page.evaluate(async () => self.localStorage.setItem('test', 'value'));
    const value = await page.evaluate(async () => self.localStorage.getItem('test'));
    expect(value).toEqual('value');
    await expectWebCallToMatch({
      family: 'Storage',
      method: 'setItem',
      page,
    });
  });

  test('removeItem', async ({page}) => {
    await page.evaluate(async () => self.localStorage.setItem('test', 'value'));
    await page.evaluate(async () => self.localStorage.removeItem('test'));
    const value = await page.evaluate(async () => self.localStorage.getItem('test'));
    expect(value).toBeNull();
    await expectWebCallToMatch({
      family: 'Storage',
      method: 'removeItem',
      page,
      index: 1,
    });
  });

  test('clear', async ({page}) => {
    await page.evaluate(async () => self.localStorage.clear());
    await expectWebCallToMatch({
      family: 'Storage',
      method: 'clear',
      page,
    });
  });

  test('key', async ({page}) => {
    await page.evaluate(async () => self.localStorage.key(0));
    await expectWebCallToMatch({
      family: 'Storage',
      method: 'key',
      page,
    });
  });
});
