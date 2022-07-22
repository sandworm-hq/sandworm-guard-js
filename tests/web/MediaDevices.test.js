const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasNavigatorFeature} = require('../utils');

test.describe('MediaDevices', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasNavigatorFeature('mediaDevices', page))) {
      test.skip('MediaDevices API not available');
    }
  });

  test('enumerateDevices', async ({page}) => {
    const devices = await page.evaluate(async () => navigator.mediaDevices.enumerateDevices());
    expect(Array.isArray(devices)).toBeTruthy();
    await expectWebCallToMatch({
      family: 'MediaDevices',
      method: 'enumerateDevices',
      page,
    });
  });

  test('getDisplayMedia', async ({page, context}) => {
    try {
      await context.grantPermissions(['camera']);
    } catch (error) {
      test.skip('User media is not available');
    }
    try {
      await page.evaluate(async () => navigator.mediaDevices.getDisplayMedia());
    } catch (error) {}
    await expectWebCallToMatch({
      family: 'MediaDevices',
      method: 'getDisplayMedia',
      page,
    });
  });

  test('getSupportedConstraints', async ({page}) => {
    await page.evaluate(async () => navigator.mediaDevices.getSupportedConstraints());
    await expectWebCallToMatch({
      family: 'MediaDevices',
      method: 'getSupportedConstraints',
      page,
    });
  });

  test('getUserMedia', async ({page, context}) => {
    try {
      await context.grantPermissions(['camera']);
    } catch (error) {
      test.skip('User media is not available');
    }
    try {
      await page.evaluate(async () => navigator.mediaDevices.getUserMedia({video: true}));
    } catch (error) {}
    await expectWebCallToMatch({
      family: 'MediaDevices',
      method: 'getUserMedia',
      page,
    });
  });

  test('selectAudioOutput', async ({page}) => {
    if (!(await hasNavigatorFeature('mediaDevices', 'selectAudioOutput', page))) {
      test.skip('MediaDevices.selectAudioOutput is not available');
    }
    await page.evaluate(async () => navigator.mediaDevices.selectAudioOutput());
    await expectWebCallToMatch({
      family: 'MediaDevices',
      method: 'selectAudioOutput',
      page,
    });
  });
});
