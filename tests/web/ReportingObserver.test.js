const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasGlobalFeature} = require('../utils');

test.describe('ReportingObserver', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasGlobalFeature('ReportingObserver', page))) {
      test.skip('ReportingObserver API not available');
    }
  });

  test('ReportingObserver', async ({page}) => {
    const type = await page.evaluate(async () => typeof new ReportingObserver(() => {}).observe);
    expect(type).toEqual('function');
    await expectWebCallToMatch({
      family: 'ReportingObserver',
      method: 'ReportingObserver',
      page,
    });
  });
});
