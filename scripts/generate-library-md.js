const {createWriteStream} = require('fs');
const path = require('path');

const webLibrary = require('../src/library/web');
const nodeLibrary = require('../src/library/node');

const filePath = path.join(__dirname, '..', 'LIBRARY.md');
const stream = createWriteStream(filePath, {flags: 'w'});

const writeLib = (library) => {
  stream.write('| Method | Description | Docs |\n');
  stream.write('|---|---|---|\n');
  library.forEach(({name: familyName, methods}) =>
    methods.forEach(({name: methodName, description, url}) => {
      stream.write(`| \`${familyName}.${methodName}\` | ${description} | [Docs](${url}) |\n`);
    }),
  );
};

stream.write('# Sandworm.JS Library\n');

stream.write('## Node\n');
writeLib(nodeLibrary());

stream.write('## Web\n');
writeLib(webLibrary());

stream.end();
