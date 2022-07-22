const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasGlobalFeature} = require('../utils');

test.describe('MessageChannel', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasGlobalFeature('MessageChannel', page))) {
      test.skip('MessageChannel not available');
    }
  });

  test('MessageChannel', async ({page}) => {
    const streamActive = await page.evaluate(async () => new MessageChannel().port1);
    expect(streamActive).toBeDefined();
    await expectWebCallToMatch({
      family: 'MessageChannel',
      method: 'MessageChannel',
      page,
    });
  });

  test('postMessage', async ({page}) => {
    await page.evaluate(async () => self.postMessage(''));
    await expectWebCallToMatch({
      family: 'MessageChannel',
      method: 'postMessage',
      page,
    });
  });
});
