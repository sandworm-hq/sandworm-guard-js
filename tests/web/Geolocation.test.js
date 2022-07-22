const {test} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasNavigatorFeature} = require('../utils');

test.describe('Geolocation', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasNavigatorFeature('geolocation', page))) {
      test.skip('Geolocation API not available');
    }
  });

  test('clearWatch', async ({page}) => {
    await page.evaluate(async () => navigator.geolocation.clearWatch(0));
    await expectWebCallToMatch({
      family: 'Geolocation',
      method: 'clearWatch',
      page,
    });
  });

  test('getCurrentPosition', async ({page, context}) => {
    context.grantPermissions(['geolocation']);
    await page.evaluate(async () => navigator.geolocation.getCurrentPosition(() => {}));
    await expectWebCallToMatch({
      family: 'Geolocation',
      method: 'getCurrentPosition',
      page,
    });
  });

  test('watchPosition', async ({page}) => {
    await page.evaluate(async () => {
      const watch = navigator.geolocation.watchPosition(() => {});
      navigator.geolocation.clearWatch(watch);
    });
    await expectWebCallToMatch({
      family: 'Geolocation',
      method: 'watchPosition',
      page,
    });
  });
});
