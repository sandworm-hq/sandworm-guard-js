const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasGlobalFeature} = require('../utils');

test.describe('Fetch', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasGlobalFeature('fetch', page))) {
      test.skip('Fetch not available');
    }
  });

  test('fetch', async ({page}) => {
    const text = await page.evaluate(async () => {
      const response = await fetch('http://localhost:7070');
      return response.text();
    });
    expect(text).toEqual('Hello World\n');
    await expectWebCallToMatch({
      family: 'Fetch',
      method: 'fetch',
      page,
    });
  });
});
