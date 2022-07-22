const {test} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasGlobalFeature} = require('../utils');

test.describe('Scheduler', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasGlobalFeature('scheduler', page))) {
      test.skip('Scheduler API not available');
    }
  });

  test('postTask', async ({page}) => {
    await page.evaluate(async () => {
      self.scheduler.postTask(() => {});
    });
    await expectWebCallToMatch({
      family: 'Scheduler',
      method: 'postTask',
      page,
    });
  });
});
