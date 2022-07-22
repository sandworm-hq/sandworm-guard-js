const {test} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb} = require('../utils');

test.describe('EventSource', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
  });

  test('EventSource', async ({page}) => {
    await page.evaluate(() => new EventSource(''));
    await expectWebCallToMatch({family: 'EventSource', method: 'EventSource', page});
  });
});
