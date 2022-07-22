const {test, expect} = require('@playwright/test');
const {expectWebCallToMatch, loadSandwormOnWeb, hasGlobalFeature} = require('../utils');

test.describe('PaymentRequest', () => {
  test.beforeEach(async ({page}) => {
    await loadSandwormOnWeb(page);
    if (!(await hasGlobalFeature('PaymentRequest', page))) {
      test.skip('Payment API not available');
    }
  });

  test('PaymentRequest', async ({page}) => {
    const requestId = await page.evaluate(async () => {
      const request = new PaymentRequest(
        [
          {
            supportedMethods: 'https://example.com/pay',
          },
        ],
        {
          total: {label: 'Donation', amount: {currency: 'USD', value: '65.00'}},
          displayItems: [
            {
              label: 'Original donation amount',
              amount: {currency: 'USD', value: '65.00'},
            },
          ],
          shippingOptions: [
            {
              id: 'standard',
              label: 'Standard shipping',
              amount: {currency: 'USD', value: '0.00'},
              selected: true,
            },
          ],
        },
        {requestShipping: true},
      );

      return request.id;
    });
    expect(requestId).toBeDefined();
    await expectWebCallToMatch({
      family: 'PaymentRequest',
      method: 'PaymentRequest',
      page,
    });
  });
});
