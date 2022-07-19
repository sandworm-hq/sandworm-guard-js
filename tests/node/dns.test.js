const dns = require('dns');
const Sandworm = require('../../dist/index');
const {expectCallToMatch} = require('../utils');

describe('dns', () => {
  beforeAll(async () => Sandworm.init({devMode: true}));
  afterEach(() => Sandworm.clearHistory());

  test('Resolver', () => {
    const resolver = new dns.Resolver();
    expect(resolver).toBeInstanceOf(dns.Resolver);
    expectCallToMatch({family: 'dns', method: 'Resolver'});
  });

  test('getServers', () => {
    const servers = dns.getServers();
    expect(Array.isArray(servers)).toBeTruthy();
    expectCallToMatch({family: 'dns', method: 'getServers'});
  });

  test('lookup', (done) => {
    dns.lookup('localhost', (err, address) => {
      if (err) {
        done(err);
      }
      expect(address).toEqual('127.0.0.1');
      done();
    });
    expectCallToMatch({family: 'dns', method: 'lookup', firstArg: 'localhost'});
  });

  test('lookupService', (done) => {
    dns.lookupService('127.0.0.1', 22, (err, hostname, service) => {
      if (err) {
        done(err);
      }
      expect(hostname).toEqual('localhost');
      expect(service).toEqual('ssh');
      done();
    });
    expectCallToMatch({family: 'dns', method: 'lookupService', firstArg: '127.0.0.1'});
  });

  test('resolve', () => {
    dns.resolve('localhost', () => {});
    expectCallToMatch({family: 'dns', method: 'resolve', firstArg: 'localhost'});
  });

  test('resolve4', () => {
    dns.resolve4('localhost', () => {});
    expectCallToMatch({family: 'dns', method: 'resolve4', firstArg: 'localhost'});
  });

  test('resolve6', () => {
    dns.resolve6('localhost', () => {});
    expectCallToMatch({family: 'dns', method: 'resolve6', firstArg: 'localhost'});
  });

  test('resolveAny', () => {
    dns.resolveAny('localhost', () => {});
    expectCallToMatch({family: 'dns', method: 'resolveAny', firstArg: 'localhost'});
  });

  test('resolveCaa', () => {
    dns.resolveCaa('localhost', () => {});
    expectCallToMatch({family: 'dns', method: 'resolveCaa', firstArg: 'localhost'});
  });

  test('resolveCname', () => {
    dns.resolveCname('localhost', () => {});
    expectCallToMatch({family: 'dns', method: 'resolveCname', firstArg: 'localhost'});
  });

  test('resolveMx', () => {
    dns.resolveMx('localhost', () => {});
    expectCallToMatch({family: 'dns', method: 'resolveMx', firstArg: 'localhost'});
  });

  test('resolveNaptr', () => {
    dns.resolveNaptr('localhost', () => {});
    expectCallToMatch({family: 'dns', method: 'resolveNaptr', firstArg: 'localhost'});
  });

  test('resolveNs', () => {
    dns.resolveNs('localhost', () => {});
    expectCallToMatch({family: 'dns', method: 'resolveNs', firstArg: 'localhost'});
  });

  test('resolvePtr', () => {
    dns.resolvePtr('localhost', () => {});
    expectCallToMatch({family: 'dns', method: 'resolvePtr', firstArg: 'localhost'});
  });

  test('resolveSoa', () => {
    dns.resolveSoa('localhost', () => {});
    expectCallToMatch({family: 'dns', method: 'resolveSoa', firstArg: 'localhost'});
  });

  test('resolveSrv', () => {
    dns.resolveSrv('localhost', () => {});
    expectCallToMatch({family: 'dns', method: 'resolveSrv', firstArg: 'localhost'});
  });

  test('resolveTxt', () => {
    dns.resolveTxt('localhost', () => {});
    expectCallToMatch({family: 'dns', method: 'resolveTxt', firstArg: 'localhost'});
  });

  test('reverse', () => {
    dns.reverse('127.0.0.1', () => {});
    expectCallToMatch({family: 'dns', method: 'reverse', firstArg: '127.0.0.1'});
  });

  test('setServers', () => {
    const servers = dns.getServers();
    dns.setServers(servers);
    expectCallToMatch({index: 1, family: 'dns', method: 'setServers'});
  });
});
