const {test} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasNavigatorFeature} = require('../utils');

test.describe('Beacon', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasNavigatorFeature('sendBeacon', page))) {
      test.skip('Beacon not available');
    }
  });

  test('sendBeacon', async ({page}) => {
    await page.evaluate(async () => {
      navigator.sendBeacon('');
    });
    await expectWebCallToMatch({
      family: 'Beacon',
      method: 'sendBeacon',
      page,
    });
  });
});
