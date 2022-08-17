/* eslint-disable no-cond-assign */
const lineParseCache = {};
const nixSlashes = (x) => x.replace(/\\/g, '/');

export const parseStackLine = (l) => {
  const line = (l || '').trim();

  if (Object.keys(lineParseCache).includes(line)) {
    return lineParseCache[line];
  }

  let fileLineColumn = [];
  let match;

  if (
    (match = line.match(/at (.+) \(eval at .+ \((.+)\), .+\)/)) || // eval calls
    (match = line.match(/at (.+) \((.+)\)/)) ||
    (line.slice(0, 3) !== 'at ' && (match = line.match(/(.*)@(.*)/)))
  ) {
    fileLineColumn = (
      match[2].match(/(.*):(\d+):(\d+)/) ||
      match[2].match(/(.*):(\d+)/) ||
      []
    ).slice(1);
  } else if ((match = line.match(/^(at\s+)*(.+):(\d+):(\d+)/))) {
    fileLineColumn = match.slice(2);
  } else {
    lineParseCache[line] = undefined;
    return undefined;
  }

  lineParseCache[line] = {
    beforeParse: line,
    file: nixSlashes(fileLineColumn[0] || ''),
    line: parseInt(fileLineColumn[1] || '', 10) || undefined,
    column: parseInt(fileLineColumn[2] || '', 10) || undefined,
  };
  return lineParseCache[line];
};

export const currentStack = () => {
  const currentStackLimit = Error.stackTraceLimit;
  Error.stackTraceLimit = Infinity;
  const lines = (new Error().stack || '').split('\n');
  Error.stackTraceLimit = currentStackLimit;
  const entries = lines.map((line) => line.trim()).map(parseStackLine);
  return entries.filter((x) => x !== undefined);
};
