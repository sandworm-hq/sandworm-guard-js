/* eslint-disable no-empty */
const trace = require('trace_events');
const Sandworm = require('../../dist/index');
const {expectCallToMatch} = require('../utils');

describe('trace_events', () => {
  beforeAll(async () => Sandworm.init({devMode: true}));
  afterEach(() => Sandworm.clearHistory());

  test('createTracing', () => {
    const tracing = trace.createTracing({categories: ['node.perf']});
    expectCallToMatch({family: 'trace_events', method: 'createTracing'});
    tracing.disable();
  });

  test('getEnabledCategories', () => {
    trace.getEnabledCategories();
    expectCallToMatch({family: 'trace_events', method: 'getEnabledCategories'});
  });
});
