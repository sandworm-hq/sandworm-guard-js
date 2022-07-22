const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasNavigatorFeature} = require('../utils');

test.describe('Clipboard', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasNavigatorFeature('clipboard', page))) {
      test.skip('Clipboard not available');
    }
  });

  test('read', async ({page, context}) => {
    if (await hasNavigatorFeature('clipboard', 'read', page)) {
      try {
        await context.grantPermissions(['clipboard-read']);
      } catch (error) {
        test.skip('Could not grant `clipboard-read` permissions');
        return;
      }
      const type = await page.evaluate(async () => typeof navigator.clipboard.read());
      expect(type).toEqual('object');
      await expectWebCallToMatch({
        family: 'Clipboard',
        method: 'read',
        page,
      });
    } else {
      test.skip('Clipboard.read is not available');
    }
  });

  test('readText', async ({page, context}) => {
    try {
      await context.grantPermissions(['clipboard-read']);
    } catch (error) {
      test.skip('Could not grant `clipboard-read` permissions');
      return;
    }
    const text = await page.evaluate(async () => navigator.clipboard.readText());
    expect(typeof text).toEqual('string');
    await expectWebCallToMatch({
      family: 'Clipboard',
      method: 'readText',
      page,
    });
  });

  test('write', async ({page, context}) => {
    if (await hasNavigatorFeature('clipboard', 'write', page)) {
      try {
        await context.grantPermissions(['clipboard-write']);
      } catch (error) {
        test.skip('Could not grant `clipboard-write` permissions');
        return;
      }
      await page.evaluate(async () => typeof navigator.clipboard.write([]));
      await expectWebCallToMatch({
        family: 'Clipboard',
        method: 'write',
        page,
      });
    } else {
      test.skip('Clipboard.write is not available');
    }
  });

  test('writeText', async ({page, context}) => {
    try {
      await context.grantPermissions(['clipboard-write', 'clipboard-read']);
    } catch (error) {
      test.skip('Could not grant `clipboard-write` permissions');
      return;
    }
    await page.evaluate(async () => navigator.clipboard.writeText('sandworm test'));
    await expectWebCallToMatch({
      family: 'Clipboard',
      method: 'writeText',
      page,
    });

    const text = await page.evaluate(async () => navigator.clipboard.readText());
    expect(text).toEqual('sandworm test');
  });
});
