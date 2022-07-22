const {test} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb} = require('../utils');

test.describe('AudioContext', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
  });

  test('AudioContext', async ({page}) => {
    await page.evaluate(() => new AudioContext());
    await expectWebCallToMatch({family: 'AudioContext', method: 'AudioContext', page});
  });
});
