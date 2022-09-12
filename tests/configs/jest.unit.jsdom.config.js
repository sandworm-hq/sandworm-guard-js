module.exports = {
  displayName: 'dom',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage/jsdom',
  coveragePathIgnorePatterns: ['/tests/', '/node_modules/'],
  coverageProvider: 'babel',
  reporters: ['default', ['jest-junit', {outputName: 'junit-jsdom-unit.xml'}]],
  rootDir: '../../',
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/unit/*.test.js', '**/tests/unit/*.test.jsdom.js'],
};
