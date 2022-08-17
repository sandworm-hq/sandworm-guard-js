const {parseStackLine, currentStack} = require('../../src/stack');

describe('stack', () => {
  test('parse V8 stack lines', () => {
    const lines = [
      ['at i (index.js:2:1)', 'index.js', 2, 1],
      [
        '    at Object.exports.test (/Users/jason/code/sandworm/tests/node/prod/stack.test.js:10:11)',
        '/Users/jason/code/sandworm/tests/node/prod/stack.test.js',
        10,
        11,
      ],
      [
        '    at eval (eval at <anonymous> (http://localhost:3000/static/js/bundle.js:196037:31), <anonymous>:1:1)',
        'http://localhost:3000/static/js/bundle.js',
        196037,
        31,
      ],
      [
        '    at Object.<anonymous> (/Users/user/projects/Arbiter/arbiter/test.js:6:1)',
        '/Users/user/projects/Arbiter/arbiter/test.js',
        6,
        1,
      ],
      [
        '    at Object.send (chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/react_devtools_backend.js:13173:14)',
        'chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/build/react_devtools_backend.js',
        13173,
        14,
      ],
      ['    at App.jsx:29:1', 'App.jsx', 29, 1],
      ['    at new Promise (<anonymous>)', '', undefined, undefined],
      ['    at hook.js:1:131676', 'hook.js', 1, 131676],
      [
        '    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)',
        'node:internal/modules/run_main',
        81,
        12,
      ],
      [
        '    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)',
        'node:internal/modules/run_main',
        81,
        12,
      ],
    ];
    lines.forEach(([line, expectedFile, expectedLine, expectedColumn]) => {
      const {file, line: lineNumber, column} = parseStackLine(line);
      expect(file).toBe(expectedFile);
      expect(lineNumber).toBe(expectedLine);
      expect(column).toBe(expectedColumn);
    });
  });

  test('Parse Safari/FF stack lines', () => {
    [
      [
        'init@http://localhost:3000/static/js/bundle.js:24496:21',
        'http://localhost:3000/static/js/bundle.js',
        24496,
        21,
      ],
      [
        '@http://localhost:3000/static/js/bundle.js:345:11',
        'http://localhost:3000/static/js/bundle.js',
        345,
        11,
      ],
      [
        './node_modules/webpack-dev-server/client/socket.js/initSocket/<@http://localhost:3000/static/js/bundle.js:24496:21',
        'http://localhost:3000/static/js/bundle.js',
        24496,
        21,
      ],
      [
        './node_modules/@apollo/client/core/ObservableQuery.js/ObservableQuery.prototype.reobserve@http://localhost:3000/static/js/bundle.js:213084:24',
        'http://localhost:3000/static/js/bundle.js',
        213084,
        24,
      ],
      [
        'async*./src/App.jsx/App/<@http://localhost:3000/static/js/bundle.js:24496:21',
        'http://localhost:3000/static/js/bundle.js',
        24496,
        21,
      ],
      [
        'w@moz-extension://2565e007-5770-7e4c-9c8d-5bb85f96082e/inpage.js:1:24223',
        'moz-extension://2565e007-5770-7e4c-9c8d-5bb85f96082e/inpage.js',
        1,
        24223,
      ],
      [
        '[1]</</<@moz-extension://2565e007-5770-7e4c-9c8d-5bb85f96082e/inpage.js:1:950',
        'moz-extension://2565e007-5770-7e4c-9c8d-5bb85f96082e/inpage.js',
        1,
        950,
      ],
    ].forEach(([line, expectedFile, expectedLine, expectedColumn]) => {
      const {file, line: lineNumber, column} = parseStackLine(line);
      expect(file).toBe(expectedFile);
      expect(lineNumber).toBe(expectedLine);
      expect(column).toBe(expectedColumn);
    });
  });

  test('ignore Safari native code lines', () => {
    ['asyncFunctionResume@[native code]', '@[native code]', 'Promise@[native code]'].forEach(
      (line) => {
        const {file, line: lineNumber, column} = parseStackLine(line);
        expect(file).toBe('');
        expect(lineNumber).toBeUndefined();
        expect(column).toBeUndefined();
      },
    );
  });

  test('parse void stack line', () => {
    const data = parseStackLine();
    expect(data).toBeUndefined();
  });

  test('use cache', () => {
    const spy = jest.spyOn(String.prototype, 'match');
    const line = 'at http://localhost:3000/static/js/unique.js:14143:106';
    parseStackLine(line);
    expect(spy).toBeCalledTimes(3);
    parseStackLine(line);
    expect(spy).toBeCalledTimes(3);
  });

  test('get current stack', () => {
    const stack = currentStack();
    expect(stack).toBeDefined();
    expect(stack.length).toBeGreaterThan(0);
    stack.forEach((s) => {
      expect(s.file).toBeDefined();
    });
  });
});
