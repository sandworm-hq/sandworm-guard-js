// eslint-disable-next-line no-underscore-dangle
global.__non_webpack_require__ = require;

const spy = jest.fn();
window.XMLHttpRequest = jest.fn().mockImplementation(() => ({
  addEventListener: jest.fn(),
}));
window.XMLHttpRequest.prototype.open = jest.fn();
window.XMLHttpRequest.prototype.send = spy;
window.XMLHttpRequest.prototype.setRequestHeader = jest.fn();

const {default: track, sendBatch} = require('../../src/track');

describe('track', () => {
  test('should track and send batch', () => {
    track({});
    sendBatch();
    expect(spy).toBeCalledTimes(1);
  });

  test('should batch', async () => {
    track({});
    // Request should not be sent immediately
    expect(spy).toBeCalledTimes(0);
    // Batch should go out one second later
    await new Promise((r) => {
      setTimeout(r, 1200);
    });
    expect(spy).toBeCalledTimes(1);
  });
});
