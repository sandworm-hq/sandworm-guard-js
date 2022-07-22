const {test} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasGlobalFeature} = require('../utils');

test.describe('BackgroundTasks', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasGlobalFeature('requestIdleCallback', page))) {
      test.skip('Background Tasks not available');
    }
  });

  test('requestIdleCallback', async ({page}) => {
    await page.evaluate(async () => {
      self.requestIdleCallback(() => {});
    });
    await expectWebCallToMatch({
      family: 'BackgroundTasks',
      method: 'requestIdleCallback',
      page,
    });
  });

  test('cancelIdleCallback', async ({page}) => {
    await page.evaluate(async () => {
      self.cancelIdleCallback(1);
    });
    await expectWebCallToMatch({
      family: 'BackgroundTasks',
      method: 'cancelIdleCallback',
      firstArg: 1,
      page,
    });
  });
});
