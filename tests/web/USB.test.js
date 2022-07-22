const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasNavigatorFeature} = require('../utils');

test.describe('USB', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasNavigatorFeature('usb', page))) {
      test.skip('USB API not available');
    }
  });

  test('getDevices', async ({page}) => {
    const devices = await page.evaluate(async () => navigator.usb.getDevices());
    expect(Array.isArray(devices)).toBeTruthy();
    await expectWebCallToMatch({
      family: 'USB',
      method: 'getDevices',
      page,
    });
  });

  test('requestDevice', async ({page}) => {
    try {
      await page.evaluate(async () => navigator.usb.requestDevice({filters: []}));
    } catch (error) {}
    await expectWebCallToMatch({
      family: 'USB',
      method: 'requestDevice',
      page,
    });
  });
});
