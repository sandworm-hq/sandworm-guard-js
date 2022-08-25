const Sandworm = require('../../dist/index');
const {expectCallToMatch, loadSandworm} = require('../utils');

describe('eval', () => {
  beforeAll(loadSandworm);
  afterEach(() => Sandworm.clearHistory());

  test('eval', async () => {
    const script = 'console.log("hello from eval")';
    // eslint-disable-next-line no-eval
    eval(script);
    expectCallToMatch({family: 'eval', method: 'eval', firstArg: script});
  });
});
