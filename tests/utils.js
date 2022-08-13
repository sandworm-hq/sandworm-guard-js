const path = require('path');
const Sandworm = require('../dist');

let expect;
if (process.env.JEST_WORKER_ID) {
  expect = require('@jest/globals').expect;
} else {
  expect = require('@playwright/test').expect;
}

const callExpects = ({call, family, method, firstArg, secondArg}) => {
  expect(call).toBeDefined();
  expect(typeof call).toBe('object');
  if (family) {
    expect(call.family).toEqual(family);
  }
  if (method) {
    expect(call.method).toEqual(method);
  }
  if (firstArg) {
    expect(call.args).not.toBeUndefined();
    expect(call.args[0]).not.toBeUndefined();
    expect(call.args[0]).toEqual(firstArg);
  }
  if (secondArg) {
    expect(call.args).not.toBeUndefined();
    expect(call.args[1]).not.toBeUndefined();
    expect(call.args[1]).toEqual(secondArg);
  }
};

const expectCallToMatch = ({family, method, firstArg, secondArg, index = 0, fromRoot = false}) => {
  const call = Sandworm.getHistory().filter(
    ({module}) => module === (fromRoot ? 'root' : 'jest-circus'),
  )[index];

  callExpects({call, family, method, firstArg, secondArg});
};

const expectWebCallToMatch = async ({family, method, firstArg, secondArg, index = 0, page}) => {
  const call = (await page.evaluate('Sandworm.getHistory()'))[index];

  callExpects({call, family, method, firstArg, secondArg});
};

const expectWebWorkerCallToMatch = async ({
  family,
  method,
  firstArg,
  secondArg,
  index = 0,
  worker,
}) => {
  const calls = await worker.evaluate('Sandworm.getHistory()');
  const call = calls[index];

  callExpects({call, family, method, firstArg, secondArg});
};

const loadSandworm = async () => Sandworm.init({devMode: true, skipTracking: true});

const loadSandwormOnWeb = async (page) => {
  await page.goto('http://localhost:7070/', {
    waitUntil: 'load',
  });
  await page.addScriptTag({path: path.join(__dirname, '..', 'dist', 'index.js')});
  await page.evaluate(() =>
    Sandworm.init({devMode: true, loadSourceMaps: false, skipTracking: true}),
  );
};

const serviceWorkersAvailable = async (page) => {
  const swAvailable = await page.evaluate(() => 'serviceWorker' in navigator);
  if (swAvailable) {
    await page.evaluate(async () => navigator.serviceWorker.register('/sw.js'));
  }
  return swAvailable;
};

const hasGlobalFeature = async (feature, page) => page.evaluate((feat) => feat in self, feature);

const hasDocumentFeature = async (feature, page) =>
  page.evaluate((feat) => 'document' in self && feat in document, feature);

const hasNavigatorFeature = async (f, c, p) => {
  const page = typeof c === 'string' ? p : c;
  if (typeof c === 'string') {
    return page.evaluate(
      ({feature, container}) => navigator[container] && feature in navigator[container],
      {
        feature: c,
        container: f,
      },
    );
  }
  return page.evaluate((feat) => feat in navigator, f);
};

const serviceWorkerRegistrationHasFeature = async (f, c, p) => {
  const page = typeof c === 'string' ? p : c;
  if (typeof c === 'string') {
    return page.evaluate(
      async ({feature, container}) => {
        const swReg = await navigator.serviceWorker.ready;
        return swReg[container] && feature in swReg[container];
      },
      {
        feature: c,
        container: f,
      },
    );
  }

  return page.evaluate(async (feat) => {
    const swReg = await navigator.serviceWorker.ready;
    return feat in swReg;
  }, f);
};

const webWorkersAvailable = async (page) => page.evaluate(() => 'Worker' in self);

const startWebWorker = async (page) =>
  new Promise((resolve) => {
    page.on('worker', (worker) => {
      resolve(worker);
    });
    page.evaluate(() => new Worker('worker.js'));
  });

const webWorkerHasFeature = async (feature, page) => {
  const worker = await startWebWorker(page);
  return worker.evaluate((feat) => feat in self, feature);
};

const testif = (condition) => (condition ? test : test.skip);

module.exports = {
  expectCallToMatch,
  expectWebCallToMatch,
  expectWebWorkerCallToMatch,
  loadSandworm,
  loadSandwormOnWeb,
  serviceWorkersAvailable,
  webWorkersAvailable,
  serviceWorkerRegistrationHasFeature,
  webWorkerHasFeature,
  startWebWorker,
  hasGlobalFeature,
  hasNavigatorFeature,
  hasDocumentFeature,
  testif,
};
