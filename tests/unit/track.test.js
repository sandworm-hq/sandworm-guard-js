// eslint-disable-next-line no-underscore-dangle
global.__non_webpack_require__ = require;

const http = require('http');

const spy = jest.spyOn(http, 'request');

const {default: track, getCircularReplacer, sendBatch} = require('../../src/track');

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

  test('track', async () => {
    // No events to send, should not call request
    sendBatch();
    expect(spy).not.toBeCalled();

    track({});
    sendBatch();
    expect(spy).toBeCalledTimes(1);

    track({});
    expect(spy).toBeCalledTimes(1);
    await new Promise((r) => {
      setTimeout(r, 1500);
    });
    expect(spy).toBeCalledTimes(2);
  });
});
