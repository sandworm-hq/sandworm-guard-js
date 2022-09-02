// eslint-disable-next-line no-underscore-dangle
global.__non_webpack_require__ = require;

const path = require('path');
const {TraceMap} = require('@jridgewell/trace-mapping');
const {
  getSourceFromUrl,
  getSourceFromPath,
  getSource,
  getSourceMap,
  getSourceMapFromSource,
} = require('../../src/source');

describe('source', () => {
  test('getSourceFromUrl', async () => {
    global.fetch = jest.fn((url) => ({text: () => url}));

    const data = await getSourceFromUrl('https://google.com');
    expect(global.fetch).toBeCalledWith('https://google.com');
    expect(data).toBe('https://google.com');
  });

  test('getSourceFromPath', async () => {
    const data = await getSourceFromPath(
      path.resolve(__dirname, 'nosources-cheap-source-map', 'main.js'),
    );
    expect(data.length).toBe(548767);

    const nullData = await getSourceFromPath(
      path.resolve(__dirname, 'nosources-cheap-source-map', 'bogus.js'),
    );
    expect(nullData).toBeNull();
  });

  test('getSource', async () => {
    global.fetch = jest.fn((url) => ({text: () => url.toString()}));

    const urlData = await getSource('https://google.com');
    expect(global.fetch).toBeCalledWith(new URL('https://google.com'));
    expect(urlData).toBe('https://google.com/');

    const pathData = await getSource(
      path.resolve(__dirname, 'nosources-cheap-source-map', 'main.js'),
    );
    expect(pathData.length).toBe(548767);
  });

  test('getSourceMap', async () => {
    const source = await getSourceMap(
      path.resolve(__dirname, 'nosources-cheap-source-map', 'main.js.map'),
    );
    expect(source).toBeInstanceOf(TraceMap);

    const nullSource = await getSourceMap(
      path.resolve(__dirname, 'nosources-cheap-source-map', 'bogus.js.map'),
    );
    expect(nullSource).toBeNull();
  });

  test('getSourceMapFromSource', async () => {
    const externalSource = await getSourceMapFromSource(
      path.resolve(__dirname, 'nosources-cheap-source-map', 'main.js'),
    );
    expect(externalSource).toBeInstanceOf(TraceMap);

    const internalSource = await getSourceMapFromSource(
      path.resolve(__dirname, 'inline-nosources-cheap-source-map', 'main.js'),
    );
    expect(internalSource).toBeInstanceOf(TraceMap);

    const nullSource = await getSourceMapFromSource(
      path.resolve(__dirname, 'nosources-cheap-source-map', 'bogus.js'),
    );
    expect(nullSource).toBeNull();
  });
});
