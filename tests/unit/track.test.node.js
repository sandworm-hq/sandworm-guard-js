// eslint-disable-next-line no-underscore-dangle
global.__non_webpack_require__ = require;

const http = require('http');

const spy = jest.spyOn(http, 'request');

const {default: track, sendBatch, setTrackingServer} = require('../../src/track');

describe('track', () => {
  test('should apply updated tracking server info', () => {
    setTrackingServer('201.123.68.122', 9031);
    track({});
    sendBatch();
    expect(spy).toBeCalledWith(
      expect.objectContaining({
        host: '201.123.68.122',
        port: 9031,
      }),
      expect.any(Function),
    );
  });
});
