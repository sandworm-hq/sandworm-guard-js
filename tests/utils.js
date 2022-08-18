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
  // console.log(Sandworm.getHistory().map((call) => `${call.module}: ${call.family}.${call.method}`));
  const call = Sandworm.getHistory().filter(({module}) =>
    (fromRoot
      ? ['root']
      : ['jest-cli>@jest/core>jest-runner>jest-circus', 'jest-runner>jest-circus', 'jest-circus']
    ).includes(module),
  )[index];

  callExpects({call, family, method, firstArg, secondArg});
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

const loadSandworm = async () =>
  Sandworm.init({devMode: true, skipTracking: true, allowInitFrom: /jest-circus/});

const loadSandwormInProductionMode = async () =>
  Sandworm.init({
    devMode: false,
    skipTracking: true,
    allowInitFrom: /jest-circus/,
    permissions: [
      // These are the Jest runner modules on node v12.0.0+
      {module: 'jest-runner>jest-circus>expect', permissions: false},
      {module: 'jest-runner>jest-circus', permissions: false},
      // These are the Jest runner modules on node v12.0.0 and below
      {module: 'jest-circus>expect', permissions: false},
      {module: 'jest-circus', permissions: false},
      // These are required by Jest
      {module: /jest/, permissions: true},
      {module: /istanbul/, permissions: true},
      {module: /babel/, permissions: true},
      {module: 'react-is', permissions: true},
      {module: 'write-file-atomic', permissions: true},
      {module: 'stack-utils', permissions: true},
      {module: 'terminal-link', permissions: true},
      {module: 'pretty-format', permissions: true},
      {module: '@bcoe/v8-coverage', permissions: true},
      {module: 'source-map-support', permissions: true},
      {module: 'mkdirp', permissions: true},
      {module: 'make-dir', permissions: true},
      {module: 'convert-source-map', permissions: true},
      {module: 'glob', permissions: true},
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
