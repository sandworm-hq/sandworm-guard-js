const {test} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasGlobalFeature} = require('../utils');

test.describe('SpeechSynthesis', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasGlobalFeature('speechSynthesis', page))) {
      test.skip('SpeechSynthesis API not available');
    }
  });

  test('cancel', async ({page}) => {
    await page.evaluate(async () => self.speechSynthesis.cancel());
    await expectWebCallToMatch({
      family: 'SpeechSynthesis',
      method: 'cancel',
      page,
    });
  });
});
