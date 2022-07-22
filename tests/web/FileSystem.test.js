const {test} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasGlobalFeature} = require('../utils');

test.describe('FileSystem', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);

    // Playwright doesn't support the File System Access API yet
    // See https://github.com/microsoft/playwright/issues/8850
    test.skip('No Playwright support');
  });

  test('showOpenFilePicker', async ({page}) => {
    if (!(await hasGlobalFeature('showOpenFilePicker', page))) {
      test.skip('FileSystem.showOpenFilePicker not available');
    }
    await page.evaluate(async () => self.showOpenFilePicker());
    await expectWebCallToMatch({
      family: 'FileSystem',
      method: 'showOpenFilePicker',
      page,
    });
  });

  test('showSaveFilePicker', async ({page}) => {
    if (!(await hasGlobalFeature('showSaveFilePicker', page))) {
      test.skip('FileSystem.showSaveFilePicker not available');
    }
    await page.evaluate(async () => self.showSaveFilePicker());
    await expectWebCallToMatch({
      family: 'FileSystem',
      method: 'showSaveFilePicker',
      page,
    });
  });

  test('showDirectoryPicker', async ({page}) => {
    if (!(await hasGlobalFeature('showDirectoryPicker', page))) {
      test.skip('FileSystem.showDirectoryPicker not available');
    }
    await page.evaluate(async () => self.showDirectoryPicker());
    await expectWebCallToMatch({
      family: 'FileSystem',
      method: 'showDirectoryPicker',
      page,
    });
  });
});
