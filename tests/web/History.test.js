const {test} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasGlobalFeature} = require('../utils');

test.describe('History', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasGlobalFeature('history', page))) {
      test.skip('History not available');
    }
  });

  test('back', async ({page}) => {
    await page.goto('http://localhost:7070#testing', {
      waitUntil: 'load',
    });
    await page.evaluate(async () => self.history.back());
    await expectWebCallToMatch({
      family: 'History',
      method: 'back',
      page,
    });
  });

  test('forward', async ({page}) => {
    await page.evaluate(async () => self.history.forward());
    await expectWebCallToMatch({
      family: 'History',
      method: 'forward',
      page,
    });
  });

  test('go', async ({page}) => {
    await page.evaluate(async () => self.history.go(1));
    await expectWebCallToMatch({
      family: 'History',
      method: 'go',
      page,
    });
  });

  test('pushState', async ({page}) => {
    await page.evaluate(async () => self.history.pushState({}, ''));
    await expectWebCallToMatch({
      family: 'History',
      method: 'pushState',
      page,
    });
  });

  test('replaceState', async ({page}) => {
    await page.evaluate(async () => self.history.replaceState({}, ''));
    await expectWebCallToMatch({
      family: 'History',
      method: 'replaceState',
      page,
    });
  });
});
