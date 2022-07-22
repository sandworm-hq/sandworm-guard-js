const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasGlobalFeature} = require('../utils');

test.describe('XMLHttpRequest', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasGlobalFeature('XMLHttpRequest', page))) {
      test.skip('XMLHttpRequest not available');
    }
  });

  test('XMLHttpRequest', async ({page}) => {
    const status = await page.evaluate(async () => new XMLHttpRequest().status);
    expect(status).toEqual(0);
    await expectWebCallToMatch({
      family: 'XMLHttpRequest',
      method: 'XMLHttpRequest',
      page,
    });
  });

  test('abort', async ({page}) => {
    await page.evaluate(async () => {
      const request = new XMLHttpRequest();
      request.abort();
    });
    await expectWebCallToMatch({
      family: 'XMLHttpRequest',
      method: 'abort',
      page,
      index: 1,
    });
  });

  test('getAllResponseHeaders', async ({page}) => {
    await page.evaluate(async () => {
      const request = new XMLHttpRequest();
      request.getAllResponseHeaders();
    });
    await expectWebCallToMatch({
      family: 'XMLHttpRequest',
      method: 'getAllResponseHeaders',
      page,
      index: 1,
    });
  });

  test('getResponseHeader', async ({page}) => {
    await page.evaluate(async () => {
      const request = new XMLHttpRequest();
      request.getResponseHeader('');
    });
    await expectWebCallToMatch({
      family: 'XMLHttpRequest',
      method: 'getResponseHeader',
      page,
      index: 1,
    });
  });

  test('open', async ({page}) => {
    await page.evaluate(async () => {
      const request = new XMLHttpRequest();
      request.open('GET', 'http://localhost');
    });
    await expectWebCallToMatch({
      family: 'XMLHttpRequest',
      method: 'open',
      page,
      index: 1,
    });
  });

  test('overrideMimeType', async ({page}) => {
    await page.evaluate(async () => {
      const request = new XMLHttpRequest();
      request.overrideMimeType('application/json');
    });
    await expectWebCallToMatch({
      family: 'XMLHttpRequest',
      method: 'overrideMimeType',
      page,
      index: 1,
    });
  });

  test('send', async ({page}) => {
    try {
      await page.evaluate(async () => {
        const request = new XMLHttpRequest();
        request.send('test');
      });
    } catch (error) {}
    await expectWebCallToMatch({
      family: 'XMLHttpRequest',
      method: 'send',
      page,
      index: 1,
    });
  });

  test('setRequestHeader', async ({page}) => {
    try {
      await page.evaluate(async () => {
        const request = new XMLHttpRequest();
        request.setRequestHeader('content-type', 'application/json');
      });
    } catch (error) {}
    await expectWebCallToMatch({
      family: 'XMLHttpRequest',
      method: 'setRequestHeader',
      page,
      index: 1,
    });
  });
});
