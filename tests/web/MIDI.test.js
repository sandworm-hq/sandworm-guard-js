const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasNavigatorFeature} = require('../utils');

test.describe('MIDI', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasNavigatorFeature('requestMIDIAccess', page))) {
      test.skip('MIDI API not available');
    }
  });

  test('requestMIDIAccess', async ({page}) => {
    try {
      const midiInputs = await page.evaluate(
        async () => (await navigator.requestMIDIAccess()).inputs,
      );
      expect(midiInputs).toBeDefined();
    } catch (error) {}
    await expectWebCallToMatch({
      family: 'MIDI',
      method: 'requestMIDIAccess',
      page,
    });
  });
});
