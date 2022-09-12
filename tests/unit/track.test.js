// eslint-disable-next-line no-underscore-dangle
global.__non_webpack_require__ = require;

const http = require('http');

const spy = jest.spyOn(http, 'request');

const {
  default: track,
  getCircularReplacer,
  sendBatch,
  setSkipTracking,
} = require('../../src/track');

describe('track', () => {
  test('getCircularReplacer', async () => {
    const replacer = getCircularReplacer();
    const dummy = {test: true};
    expect(replacer(undefined, 1)).toBe(1);
    expect(replacer(undefined, 1)).toBe(1);
    expect(replacer(undefined, 'test')).toBe('test');
    expect(replacer(undefined, 'test')).toBe('test');
    expect(replacer(undefined, dummy)).toBe(dummy);
    expect(replacer(undefined, dummy)).toBeUndefined();
  });

  test('should skip empty batch', () => {
    // No events to send, should not call request
    sendBatch();
    expect(spy).not.toBeCalled();
  });

  test('should skip invalid events', () => {
    track();
    track(2);
    sendBatch();
    expect(spy).not.toBeCalled();
  });

  test('should honor `skipTracking`', () => {
    setSkipTracking(true);
    track({});
    sendBatch();
    setSkipTracking(false);
    expect(spy).not.toBeCalled();
  });

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
