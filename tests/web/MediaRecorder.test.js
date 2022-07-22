const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasGlobalFeature} = require('../utils');

test.describe('MediaRecorder', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasGlobalFeature('MediaRecorder', page))) {
      test.skip('MediaRecorder not available');
    }
  });

  test('MediaRecorder', async ({page}) => {
    const recorderState = await page.evaluate(
      async () => new MediaRecorder(new MediaStream()).state,
    );
    expect(recorderState).toEqual('inactive');
    await expectWebCallToMatch({
      family: 'MediaRecorder',
      method: 'MediaRecorder',
      page,
      index: 1,
    });
  });
});
