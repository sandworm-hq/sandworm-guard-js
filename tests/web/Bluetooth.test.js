const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasNavigatorFeature} = require('../utils');

test.describe('Bluetooth', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasNavigatorFeature('bluetooth', page))) {
      test.skip('Bluetooth not available');
    }
  });

  test('getAvailability', async ({page}) => {
    const availability = await page.evaluate(async () => navigator.bluetooth.getAvailability());
    expect(typeof availability).toEqual('boolean');
    await expectWebCallToMatch({
      family: 'Bluetooth',
      method: 'getAvailability',
      page,
    });
  });

  test('getDevices', async ({page}) => {
    if (await hasNavigatorFeature('bluetooth', 'getDevices', page)) {
      try {
        await page.evaluate(async () => navigator.bluetooth.getDevices());
      } catch (error) {
      } finally {
        await expectWebCallToMatch({
          family: 'Bluetooth',
          method: 'getDevices',
          page,
        });
      }
    } else {
      test.skip('Bluetooth.getDevices is not available');
    }
  });

  test('requestDevice', async ({page}) => {
    if (await hasNavigatorFeature('bluetooth', 'requestDevice', page)) {
      // Web Bluetooth is not supported on this platform.
      try {
        await page.evaluate(async () =>
          navigator.bluetooth.requestDevice({acceptAllDevices: true}),
        );
      } catch (error) {
      } finally {
        await expectWebCallToMatch({
          family: 'Bluetooth',
          method: 'requestDevice',
          page,
        });
      }
    } else {
      test.skip('Bluetooth.requestDevice is not available');
    }
  });
});
