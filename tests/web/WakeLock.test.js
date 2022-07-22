const {test} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasNavigatorFeature} = require('../utils');

test.describe('WakeLock', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasNavigatorFeature('wakeLock', page))) {
      test.skip('WakeLock API not available');
    }
  });

  test('request', async ({page}) => {
    try {
      await page.evaluate(async () => navigator.wakeLock.request('screen'));
    } catch (error) {}
    await expectWebCallToMatch({
      family: 'WakeLock',
      method: 'request',
      firstArg: 'screen',
      page,
    });
  });
});
