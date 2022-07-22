const {test} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasDocumentFeature} = require('../utils');

test.describe('StorageAccess', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasDocumentFeature('requestStorageAccess', page))) {
      test.skip('StorageAccess API not available');
    }
  });

  test('requestStorageAccess', async ({page}) => {
    await page.evaluate(async () => document.requestStorageAccess());
    await expectWebCallToMatch({
      family: 'StorageAccess',
      method: 'requestStorageAccess',
      page,
    });
  });

  test('hasStorageAccess', async ({page}) => {
    await page.evaluate(async () => document.hasStorageAccess());
    await expectWebCallToMatch({
      family: 'StorageAccess',
      method: 'hasStorageAccess',
      page,
    });
  });
});
