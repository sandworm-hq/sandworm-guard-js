const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasGlobalFeature} = require('../utils');

test.describe('SpeechRecognition', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (
      !(await hasGlobalFeature('SpeechRecognition', page)) &&
      !(await hasGlobalFeature('webkitSpeechRecognition', page))
    ) {
      test.skip('SpeechRecognition API not available');
    }
  });

  test('SpeechRecognition', async ({page}) => {
    if (!(await hasGlobalFeature('SpeechRecognition', page))) {
      test.skip('SpeechRecognition not available');
    }
    const text = await page.evaluate(async () => new SpeechRecognition().lang);
    expect(text).toEqual('');
    await expectWebCallToMatch({
      family: 'SpeechRecognition',
      method: 'SpeechRecognition',
      page,
    });
  });

  test('webkitSpeechRecognition', async ({page}) => {
    if (!(await hasGlobalFeature('webkitSpeechRecognition', page))) {
      test.skip('webkitSpeechRecognition not available');
    }
    // eslint-disable-next-line new-cap
    const text = await page.evaluate(async () => new webkitSpeechRecognition().lang);
    expect(text).toEqual('');
    await expectWebCallToMatch({
      family: 'SpeechRecognition',
      method: 'webkitSpeechRecognition',
      page,
    });
  });
});
