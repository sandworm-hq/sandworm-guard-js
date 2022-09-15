const path = require('path');
// The path below might be missing initially
// It is created by running tests via the package.json scripts
// eslint-disable-next-line import/no-unresolved, import/extensions
const Sandworm = require('../dist/node_modules/sandworm');

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

const getLastCall = (offset = 0) =>
  Sandworm.getHistory()
    .filter(({module}) => module === 'root')
    .slice(-1 - offset)[0];

const expectCallToMatch = ({family, method, firstArg, secondArg, offset}) => {
  // console.log(Sandworm.getHistory().map((call) => `${call.module}: ${call.family}.${call.method}`));
  const call = getLastCall(offset);

  callExpects({call, family, method, firstArg, secondArg});
};

const expectNoCall = () => {
  const call = getLastCall();
  expect(call).toBeUndefined();
};

const expectCallToThrow = (call) => {
  expect(call).toThrow(Sandworm.Error);
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

const loadSandwormInProductionMode = async () =>
  Sandworm.init({
    devMode: false,
    skipTracking: true,
    permissions: [
      // Jest runner needs vm.runInContext and bind.args, we explicitly allow them below
      {module: /jest/, permissions: ['vm', 'bind', '*']},
      {module: 'root', permissions: false},
      {module: 'source-map-support', permissions: ['fs']},
    ],
  });

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
  expectNoCall,
  expectCallToMatch,
  expectWebCallToMatch,
  expectWebWorkerCallToMatch,
  expectCallToThrow,
  loadSandworm,
  loadSandwormInProductionMode,
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
