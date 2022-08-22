// eslint-disable-next-line import/no-extraneous-dependencies
const {devices} = require('@playwright/test');

const config = {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  testDir: '../web/',
  testMatch: '*.test.js',
  use: {
    trace: 'on-first-retry',
  },
  globalSetup: require.resolve('../web/setup'),
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
    {
      name: 'firefox',
      use: {...devices['Desktop Firefox']},
    },
    {
      name: 'webkit',
      use: {...devices['Desktop Safari']},
    },
  ],
  reporter: [['list'], ['junit', {outputFile: 'junit-web-capture.xml'}]],
};

module.exports = config;
