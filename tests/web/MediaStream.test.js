const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasGlobalFeature} = require('../utils');

test.describe('MediaStream', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasGlobalFeature('MediaStream', page))) {
      test.skip('MediaStream not available');
    }
  });

  test('MediaStream', async ({page}) => {
    const streamActive = await page.evaluate(async () => new MediaStream().active);
    expect(streamActive).toBeFalsy();
    await expectWebCallToMatch({
      family: 'MediaStream',
      method: 'MediaStream',
      page,
    });
  });
});
