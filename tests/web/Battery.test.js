const {test} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasNavigatorFeature} = require('../utils');

test.describe('Battery', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasNavigatorFeature('getBattery', page))) {
      test.skip('Battery API not available');
    }
  });

  test('getBattery', async ({page}) => {
    await page.evaluate(async () => navigator.getBattery());
    await expectWebCallToMatch({
      family: 'Battery',
      method: 'getBattery',
      page,
    });
  });
});
