const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasNavigatorFeature} = require('../utils');

test.describe('Gamepad', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasNavigatorFeature('getGamepads', page))) {
      test.skip('Gamepad API not available');
    }
  });

  test('getGamepads', async ({page}) => {
    const gamepads = await page.evaluate(async () => navigator.getGamepads());
    expect(Array.isArray(gamepads)).toBeTruthy();
    await expectWebCallToMatch({
      family: 'Gamepad',
      method: 'getGamepads',
      page,
    });
  });
});
