const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasGlobalFeature} = require('../utils');

test.describe('PerformanceObserver', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasGlobalFeature('PerformanceObserver', page))) {
      test.skip('PerformanceObserver not available');
    }
  });

  test('PerformanceObserver', async ({page}) => {
    const observer = await page.evaluate(async () => new PerformanceObserver(() => {}));
    expect(observer).toBeDefined();
    await expectWebCallToMatch({
      family: 'PerformanceObserver',
      method: 'PerformanceObserver',
      page,
    });
  });
});
