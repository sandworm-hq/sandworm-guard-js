const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasGlobalFeature} = require('../utils');

test.describe('Selection', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasGlobalFeature('getSelection', page))) {
      test.skip('Selection API not available');
    }
  });

  test('getSelection', async ({page}) => {
    const text = await page.evaluate(async () => self.getSelection().toString());
    expect(text).toEqual('');
    await expectWebCallToMatch({
      family: 'Selection',
      method: 'getSelection',
      page,
    });
  });
});
