const {test} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasNavigatorFeature} = require('../utils');

test.describe('HID', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasNavigatorFeature('hid', page))) {
      test.skip('HID API not available');
    }
  });

  test('getDevices', async ({page}) => {
    await page.evaluate(async () => navigator.hid.getDevices());
    await expectWebCallToMatch({
      family: 'HID',
      method: 'getDevices',
      page,
    });
  });

  test('requestDevice', async ({page}) => {
    await page.evaluate(async () => navigator.hid.requestDevice({filters: [{vendorId: 1234}]}));
    await expectWebCallToMatch({
      family: 'HID',
      method: 'requestDevice',
      page,
    });
  });
});
