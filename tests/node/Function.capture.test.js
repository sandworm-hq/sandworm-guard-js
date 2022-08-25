const Sandworm = require('../../dist/index');
const {expectCallToMatch, loadSandworm} = require('../utils');

describe('Function', () => {
  beforeAll(loadSandworm);
  afterEach(() => Sandworm.clearHistory());

  test('Function', async () => {
    const script = 'console.log("hello from eval")';
    // eslint-disable-next-line no-new-func
    const func = new Function(script);
    func();
    expectCallToMatch({family: 'Function', method: 'Function', firstArg: script});

    // eslint-disable-next-line no-new-func
    const func2 = Function(script);
    func2();
    expectCallToMatch({family: 'Function', method: 'Function', firstArg: script, index: 1});
  });
});
