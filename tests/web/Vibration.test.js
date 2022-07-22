const {test} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasNavigatorFeature} = require('../utils');

test.describe('Vibration', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasNavigatorFeature('vibrate', page))) {
      test.skip('Vibration API not available');
    }
  });

  test('vibrate', async ({page}) => {
    await page.evaluate(async () => navigator.vibrate(1));
    await expectWebCallToMatch({
      family: 'Vibration',
      method: 'vibrate',
      firstArg: 1,
      page,
    });
  });
});
