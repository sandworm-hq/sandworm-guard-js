const {default: platform, PLATFORMS} = require('../../src/platform');

describe('platform', () => {
  test('should detect the node platform', () => {
    expect(platform()).toBe(PLATFORMS.WEB);
  });
});
