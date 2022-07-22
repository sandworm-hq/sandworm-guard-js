const {test} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasGlobalFeature} = require('../utils');

test.describe('ImageCapture', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasGlobalFeature('ImageCapture', page))) {
      test.skip('ImageCapture API not available');
    }
  });

  test('ImageCapture', async ({page}) => {
    try {
      await page.evaluate(async () => new ImageCapture());
    } catch (error) {}
    await expectWebCallToMatch({
      family: 'ImageCapture',
      method: 'ImageCapture',
      page,
    });
  });
});
