const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasNavigatorFeature} = require('../utils');

test.describe('Share', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasNavigatorFeature('share', page))) {
      test.skip('Share API not available');
    }
  });

  test('share', async ({page}) => {
    // This crashes webkit
    try {
      await page.evaluate(async () => navigator.share());
    } catch (error) {}
    await expectWebCallToMatch({
      family: 'Share',
      method: 'share',
      page,
    });
  });

  test('canShare', async ({page}) => {
    const canShare = await page.evaluate(async () => navigator.canShare());
    expect(canShare).toBeFalsy();
    await expectWebCallToMatch({
      family: 'Share',
      method: 'canShare',
      page,
    });
  });
});
