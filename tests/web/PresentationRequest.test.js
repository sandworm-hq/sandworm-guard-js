const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasGlobalFeature} = require('../utils');

test.describe('PresentationRequest', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasGlobalFeature('PresentationRequest', page))) {
      test.skip('Presentation API not available');
    }
  });

  test('PresentationRequest', async ({page}) => {
    const isProperClass = await page.evaluate(
      async () => new PresentationRequest(['https://example.com']) instanceof PresentationRequest,
    );
    expect(isProperClass).toBeTruthy();
    await expectWebCallToMatch({
      family: 'PresentationRequest',
      method: 'PresentationRequest',
      page,
    });
  });

  test('start', async ({page}) => {
    let error;
    try {
      await page.evaluate(async () => {
        const pres = new PresentationRequest(['https://example.com']);
        await pres.start();
      });
    } catch (err) {
      error = err;
    }
    expect(error).toBeDefined();
    await expectWebCallToMatch({
      family: 'PresentationRequest',
      method: 'start',
      page,
      index: 1,
    });
  });
});
