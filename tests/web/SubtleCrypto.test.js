const {test} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb} = require('../utils');

test.describe('SubtleCrypto', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await page.evaluate(async () => 'crypto' in self && 'subtle' in self.crypto))) {
      test.skip('SubtleCrypto API not available');
    }
  });

  test('decrypt', async ({page}) => {
    try {
      await page.evaluate(async () => self.crypto.subtle.decrypt());
    } catch (error) {}

    await expectWebCallToMatch({
      family: 'SubtleCrypto',
      method: 'decrypt',
      page,
    });
  });

  test('deriveBits', async ({page}) => {
    try {
      await page.evaluate(async () => self.crypto.subtle.deriveBits());
    } catch (error) {}

    await expectWebCallToMatch({
      family: 'SubtleCrypto',
      method: 'deriveBits',
      page,
    });
  });

  test('deriveKey', async ({page}) => {
    try {
      await page.evaluate(async () => self.crypto.subtle.deriveKey());
    } catch (error) {}

    await expectWebCallToMatch({
      family: 'SubtleCrypto',
      method: 'deriveKey',
      page,
    });
  });

  test('digest', async ({page}) => {
    try {
      await page.evaluate(async () => self.crypto.subtle.digest());
    } catch (error) {}

    await expectWebCallToMatch({
      family: 'SubtleCrypto',
      method: 'digest',
      page,
    });
  });

  test('encrypt', async ({page}) => {
    try {
      await page.evaluate(async () => self.crypto.subtle.encrypt());
    } catch (error) {}

    await expectWebCallToMatch({
      family: 'SubtleCrypto',
      method: 'encrypt',
      page,
    });
  });

  test('exportKey', async ({page}) => {
    try {
      await page.evaluate(async () => self.crypto.subtle.exportKey());
    } catch (error) {}

    await expectWebCallToMatch({
      family: 'SubtleCrypto',
      method: 'exportKey',
      page,
    });
  });

  test('generateKey', async ({page}) => {
    try {
      await page.evaluate(async () => self.crypto.subtle.generateKey());
    } catch (error) {}

    await expectWebCallToMatch({
      family: 'SubtleCrypto',
      method: 'generateKey',
      page,
    });
  });

  test('importKey', async ({page}) => {
    try {
      await page.evaluate(async () => self.crypto.subtle.importKey());
    } catch (error) {}

    await expectWebCallToMatch({
      family: 'SubtleCrypto',
      method: 'importKey',
      page,
    });
  });

  test('sign', async ({page}) => {
    try {
      await page.evaluate(async () => self.crypto.subtle.sign());
    } catch (error) {}

    await expectWebCallToMatch({
      family: 'SubtleCrypto',
      method: 'sign',
      page,
    });
  });

  test('unwrapKey', async ({page}) => {
    try {
      await page.evaluate(async () => self.crypto.subtle.unwrapKey());
    } catch (error) {}

    await expectWebCallToMatch({
      family: 'SubtleCrypto',
      method: 'unwrapKey',
      page,
    });
  });

  test('verify', async ({page}) => {
    try {
      await page.evaluate(async () => self.crypto.subtle.verify());
    } catch (error) {}

    await expectWebCallToMatch({
      family: 'SubtleCrypto',
      method: 'verify',
      page,
    });
  });

  test('wrapKey', async ({page}) => {
    try {
      await page.evaluate(async () => self.crypto.subtle.wrapKey());
    } catch (error) {}

    await expectWebCallToMatch({
      family: 'SubtleCrypto',
      method: 'wrapKey',
      page,
    });
  });
});
