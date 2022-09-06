/* eslint-disable no-cond-assign */
const lineParseCache = {};
const nixSlashes = (x) => x.replace(/\\/g, '/');

export const parseStackLine = (l) => {
  const line = (l || '').trim();

  if (Object.keys(lineParseCache).includes(line)) {
    return lineParseCache[line];
  }

  let fileLineColumn = [];
  let name;
  let alias;
  let match;

  // Try to parse standard stack lines, like:
  // V8: "at eval (eval at <anonymous> (http://localhost:3000/static/js/bundle.js:196037:31), <anonymous>:1:1)"
  // V8: "at Object.exports.test (/Users/jason/code/sandworm/tests/node/prod/stack.test.js:10:11)"
  // Safari/FF: "init@http://localhost:3000/static/js/bundle.js:24496:21"
  if (
    (match = line.match(/at (.+) \(eval at .+ \((.+)\), .+\)/)) || // eval calls
    (match = line.match(/at (.+) \((.+)\)/)) ||
    (line.slice(0, 3) !== 'at ' && (match = line.match(/(.*)@(.*)/)))
  ) {
    [, name] = match;
    fileLineColumn = (
      match[2].match(/(.*):(\d+):(\d+)/) ||
      match[2].match(/(.*):(\d+)/) ||
      []
    ).slice(1);
    // Try to parse stack lines with no caller info, like:
    // "at App.js:32:10"
  } else if ((match = line.match(/^(at\s+)*(.+):(\d+):(\d+)/))) {
    fileLineColumn = match.slice(2);
  } else {
    lineParseCache[line] = undefined;
    return undefined;
  }

  // Caller info sometimes includes an alias, like:
  // "at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)"
  // Try to extract the alias.
  if (name?.includes?.(' [as ')) {
    [name, alias] = name.slice(0, -1).split(' [as ');
  }

  lineParseCache[line] = {
    beforeParse: line,
    file: nixSlashes(fileLineColumn[0] || ''),
    line: parseInt(fileLineColumn[1] || '', 10) || undefined,
    column: parseInt(fileLineColumn[2] || '', 10) || undefined,
    name,
    alias,
  };
  return lineParseCache[line];
};

export const currentStack = () => {
  // We want the whole stack trace. Temporarily disable the limit.
  const currentStackLimit = Error.stackTraceLimit;
  Error.stackTraceLimit = Infinity;
  const lines = (new Error().stack || '').split('\n');
  Error.stackTraceLimit = currentStackLimit;
  const entries = lines
    .map(parseStackLine)
    .filter((x) => x !== undefined)
    // Augment every stack item with details about the call chain.
    // Who called the current method? Who did the current method call next?
    .map((value, index, original) => {
      const pre = original[index + 1];
      const post = original[index - 1];
      return {
        ...value,
        caller: pre ? pre.alias || pre.name : undefined,
        called: post ? post.alias || post.name : undefined,
      };
    });
  return entries;
};
