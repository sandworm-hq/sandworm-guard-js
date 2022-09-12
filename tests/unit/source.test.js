// eslint-disable-next-line no-underscore-dangle
global.__non_webpack_require__ = require;

const path = require('path');
const {SourceMapConsumer} = require('source-map-js');
const {
  getSourceFromUrl,
  getSourceFromPath,
  getSource,
  getSourceMap,
  getSourceMapFromSource,
} = require('../../src/source');

describe('source', () => {
  test('should get source from a url', async () => {
    global.fetch = jest.fn((url) => ({text: () => url}));

    const data = await getSourceFromUrl('https://google.com');
    expect(global.fetch).toBeCalledWith('https://google.com');
    expect(data).toBe('https://google.com');
  });

  test('should get source from a valid path', async () => {
    const data = await getSourceFromPath(
      path.resolve(__dirname, 'nosources-cheap-source-map', 'main.js'),
    );
    expect(data.length).toBe(548767);
  });

  test('should fail to get source from an invalid path', async () => {
    const nullData = await getSourceFromPath(
      path.resolve(__dirname, 'nosources-cheap-source-map', 'bogus.js'),
    );
    expect(nullData).toBeNull();
  });

  test('should accept both urls and paths with `getSource`', async () => {
    global.fetch = jest.fn((url) => ({text: () => url.toString()}));

    const urlData = await getSource('https://google.com');
    expect(global.fetch).toBeCalledWith(new URL('https://google.com'));
    expect(urlData).toBe('https://google.com/');

    const pathData = await getSource(
      path.resolve(__dirname, 'nosources-cheap-source-map', 'main.js'),
    );
    expect(pathData.length).toBe(548767);
  });

  test('should load a valid sourcemap', async () => {
    const source = await getSourceMap(
      path.resolve(__dirname, 'nosources-cheap-source-map', 'main.js.map'),
    );
    expect(source).toBeInstanceOf(SourceMapConsumer);
  });

  test('should fail to load an invalid sourcemap', async () => {
    const nullSource = await getSourceMap(
      path.resolve(__dirname, 'nosources-cheap-source-map', 'bogus.js.map'),
    );
    expect(nullSource).toBeNull();
  });

  test('should load an external sourcemap from a source file', async () => {
    const externalSource = await getSourceMapFromSource(
      path.resolve(__dirname, 'nosources-cheap-source-map', 'main.js'),
    );
    expect(externalSource).toBeInstanceOf(SourceMapConsumer);
  });

  test('should load an inline sourcemap from a source file', async () => {
    const internalSource = await getSourceMapFromSource(
      path.resolve(__dirname, 'inline-nosources-cheap-source-map', 'main.js'),
    );
    expect(internalSource).toBeInstanceOf(SourceMapConsumer);
  });

  test('should fail to load a sourcemap from an invalid source file', async () => {
    const nullSource = await getSourceMapFromSource(
      path.resolve(__dirname, 'nosources-cheap-source-map', 'bogus.js'),
    );
    expect(nullSource).toBeNull();
  });
});
