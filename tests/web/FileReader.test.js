const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb} = require('../utils');

test.describe('FileReader', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
  });

  test('FileReader', async ({page}) => {
    const readyState = await page.evaluate(() => {
      const reader = new FileReader();
      return reader.readyState;
    });
    expect(readyState).toEqual(0);
    await expectWebCallToMatch({family: 'FileReader', method: 'FileReader', page});
  });

  test('abort', async ({page}) => {
    await page.evaluate(() => {
      const reader = new FileReader();
      reader.abort();
    });
    await expectWebCallToMatch({family: 'FileReader', method: 'abort', index: 1, page});
  });

  test('readAsArrayBuffer', async ({page}) => {
    await page.evaluate(() => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(new Blob());
    });
    await expectWebCallToMatch({family: 'FileReader', method: 'readAsArrayBuffer', index: 1, page});
  });

  test('readAsBinaryString', async ({page}) => {
    await page.evaluate(() => {
      const reader = new FileReader();
      reader.readAsBinaryString(new Blob());
    });
    await expectWebCallToMatch({
      family: 'FileReader',
      method: 'readAsBinaryString',
      index: 1,
      page,
    });
  });

  test('readAsDataURL', async ({page}) => {
    await page.evaluate(() => {
      const reader = new FileReader();
      reader.readAsDataURL(new Blob());
    });
    await expectWebCallToMatch({
      family: 'FileReader',
      method: 'readAsDataURL',
      index: 1,
      page,
    });
  });

  test('readAsText', async ({page}) => {
    await page.evaluate(() => {
      const reader = new FileReader();
      reader.readAsText(new Blob());
    });
    await expectWebCallToMatch({
      family: 'FileReader',
      method: 'readAsText',
      index: 1,
      page,
    });
  });
});
