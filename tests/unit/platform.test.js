const {default: platform, PLATFORMS} = require('../../src/platform');

describe('platform', () => {
  test('platform', () => {
    expect(platform()).toBe(PLATFORMS.NODE);
  });
});
