const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasGlobalFeature} = require('../utils');

test.describe('WebSocket', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasGlobalFeature('WebSocket', page))) {
      test.skip('WebSocket API not available');
    }
  });

  test('WebSocket', async ({page}) => {
    const url = await page.evaluate(async () => new WebSocket(new URL('ws://localhost')).url);
    expect(url).toEqual('ws://localhost/');
    await expectWebCallToMatch({
      family: 'WebSocket',
      method: 'WebSocket',
      page,
    });
  });

  test('close', async ({page}) => {
    await page.evaluate(async () => {
      const socket = new WebSocket(new URL('ws://localhost'));
      socket.close();
    });
    await expectWebCallToMatch({
      family: 'WebSocket',
      method: 'close',
      index: 1,
      page,
    });
  });

  test('send', async ({page}) => {
    try {
      await page.evaluate(async () => {
        const socket = new WebSocket(new URL('ws://localhost'));
        socket.send('');
        socket.close();
      });
    } catch (error) {}
    await expectWebCallToMatch({
      family: 'WebSocket',
      method: 'send',
      index: 1,
      page,
    });
  });
});
