const dns = require('dns');
const {loadSandwormInProductionMode, testif, expectCallToThrow} = require('../utils');

describe('enforce: dns', () => {
  beforeAll(loadSandwormInProductionMode);

  test('Resolver', () => {
    expectCallToThrow(() => new dns.Resolver());
  });

  test('getServers', () => {
    expectCallToThrow(() => dns.getServers());
  });

  test('lookup', () => {
    expectCallToThrow(() => dns.lookup('localhost', () => {}));
  });

  test('lookupService', () => {
    expectCallToThrow(() => dns.lookupService('127.0.0.1', 22, () => {}));
  });

  test('resolve', () => {
    expectCallToThrow(() => dns.resolve('localhost', () => {}));
  });

  test('resolve4', () => {
    expectCallToThrow(() => dns.resolve4('localhost', () => {}));
  });

  test('resolve6', () => {
    expectCallToThrow(() => dns.resolve6('localhost', () => {}));
  });

  test('resolveAny', () => {
    expectCallToThrow(() => dns.resolveAny('localhost', () => {}));
  });

  testif(dns.resolveCaa)('resolveCaa', () => {
    expectCallToThrow(() => dns.resolveCaa('localhost', () => {}));
  });

  test('resolveCname', () => {
    expectCallToThrow(() => dns.resolveCname('localhost', () => {}));
  });

  test('resolveMx', () => {
    expectCallToThrow(() => dns.resolveMx('localhost', () => {}));
  });

  test('resolveNaptr', () => {
    expectCallToThrow(() => dns.resolveNaptr('localhost', () => {}));
  });

  test('resolveNs', () => {
    expectCallToThrow(() => dns.resolveNs('localhost', () => {}));
  });

  test('resolvePtr', () => {
    expectCallToThrow(() => dns.resolvePtr('localhost', () => {}));
  });

  test('resolveSoa', () => {
    expectCallToThrow(() => dns.resolveSoa('localhost', () => {}));
  });

  test('resolveSrv', () => {
    expectCallToThrow(() => dns.resolveSrv('localhost', () => {}));
  });

  test('resolveTxt', () => {
    expectCallToThrow(() => dns.resolveTxt('localhost', () => {}));
  });

  test('reverse', () => {
    expectCallToThrow(() => dns.reverse('127.0.0.1', () => {}));
  });

  test('setServers', () => {
    expectCallToThrow(() => dns.setServers(['localhost']));
  });
});
