const {writeFileSync} = require('fs');
const path = require('path');

const webLibrary = require('../src/library/web.json');
const nodeLibrary = require('../src/library/node.json');

const webMinLibraryPath = path.join(__dirname, '..', 'src', 'library', 'web.min.json');
const nodeMinLibraryPath = path.join(__dirname, '..', 'src', 'library', 'node.min.json');

const cleanMethod = (method) => ({
  ...method,
  description: undefined,
  url: undefined,
});

[
  {lib: webLibrary, output: webMinLibraryPath},
  {lib: nodeLibrary, output: nodeMinLibraryPath},
].forEach(({lib, output}) => {
  const minimized = lib.map((family) => ({
    ...family,
    constructorDescription: undefined,
    constructorUrl: undefined,
    methods: family.methods?.map(cleanMethod),
    globalMethods: family.globalMethods?.map(cleanMethod),
    globalPropertyMethods: family.globalPropertyMethods?.map(cleanMethod),
    navigatorMethods: family.navigatorMethods?.map(cleanMethod),
    documentMethods: family.documentMethods?.map(cleanMethod),
    swrMethods: family.swrMethods?.map(cleanMethod),
    globalConstructors: family.globalConstructors?.map(cleanMethod),
  }));
  writeFileSync(output, JSON.stringify(minimized));
});
