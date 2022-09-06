const {createWriteStream} = require('fs');
const path = require('path');

const webLibrary = require('../src/library/web.json');
const nodeLibrary = require('../src/library/node.json');
const {buildNodeLibraryFrom, buildWebLibraryFrom} = require('../src/library/builder');

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
writeLib(buildNodeLibraryFrom(nodeLibrary));

stream.write('\n## Web\n');
writeLib(buildWebLibraryFrom(webLibrary));

stream.write('\n## `bind` calls\n');
stream.write(
  'For each method listed above, Sandworm also intercepts `bind` calls. To allow `bind` calls with more than one argument, the `bind.args` permission is required. [Read more](/README.md#bind-calls).',
);

stream.end();
