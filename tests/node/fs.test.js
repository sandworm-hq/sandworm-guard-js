import syncSuite from './fs/sync';
import asyncSuite from './fs/async';
import promisesSuite from './fs/promises';

describe('fs', () => {
  asyncSuite();
  syncSuite();
  promisesSuite();
});
