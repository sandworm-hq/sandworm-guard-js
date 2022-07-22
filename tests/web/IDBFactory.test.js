const {test} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasGlobalFeature} = require('../utils');

test.describe('IDBFactory', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasGlobalFeature('indexedDB', page))) {
      test.skip('IDBFactory not available');
    }
  });

  test('cmp', async ({page}) => {
    await page.evaluate(async () => self.indexedDB.cmp('a', 'b'));
    await expectWebCallToMatch({
      family: 'IDBFactory',
      method: 'cmp',
      page,
    });
  });

  test('databases', async ({page}) => {
    if (!(await page.evaluate(() => 'databases' in self.indexedDB))) {
      test.skip('IDBFactory.databases not available');
    }
    await page.evaluate(async () => self.indexedDB.databases());
    await expectWebCallToMatch({
      family: 'IDBFactory',
      method: 'databases',
      page,
    });
  });

  test('deleteDatabase', async ({page}) => {
    await page.evaluate(async () => self.indexedDB.deleteDatabase(''));
    await expectWebCallToMatch({
      family: 'IDBFactory',
      method: 'deleteDatabase',
      page,
    });
  });

  test('open', async ({page}) => {
    await page.evaluate(async () => self.indexedDB.open(''));
    await expectWebCallToMatch({
      family: 'IDBFactory',
      method: 'open',
      page,
    });
  });
});
