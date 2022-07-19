/* eslint-disable no-cond-assign */

const isBrowser = typeof window !== 'undefined' && window.window === window && window.navigator;
const nixSlashes = (x) => x.replace(/\\/g, '/');

class Stack {
  constructor(input, offset) {
    const originalInput = input;
    let processedInput = input;
    let processedOffset = offset;
    const isParseableSyntaxError =
      processedInput && processedInput instanceof SyntaxError && !isBrowser;

    if (!processedInput) {
      processedInput = new Error();
      processedOffset = processedOffset === undefined ? 1 : processedOffset;
    }

    if (processedInput instanceof Error) {
      processedInput = processedInput.stack || '';
    }

    if (typeof processedInput === 'string') {
      processedInput = Stack.rawParse(processedInput).slice(processedOffset);
    }

    if (Array.isArray(processedInput)) {
      if (isParseableSyntaxError) {
        const rawLines = __non_webpack_require__('util').inspect(originalInput).split('\n');
        const fileLine = rawLines[0].split(':');
        const line = fileLine.pop();
        const file = fileLine.join(':');

        if (file) {
          processedInput.unshift({
            file: nixSlashes(file),
            line,
            column: (rawLines[2] || '').indexOf('^') + 1,
            sourceLine: rawLines[1],
            callee: '(syntax error)',
            syntaxError: true,
          });
        }
      }

      this.items = processedInput;
    } else {
      this.items = [];
    }
  }

  static rawParse(str) {
    const lines = (str || '').split('\n');

    const entries = lines
      .map((line) => line.trim())
      .map((line) => {
        let callee;
        let fileLineColumn = [];
        let native;
        let planA;
        let planB;

        if (
          (planA = line.match(/at (.+) \(eval at .+ \((.+)\), .+\)/)) || // eval calls
          (planA = line.match(/at (.+) \((.+)\)/)) ||
          (line.slice(0, 3) !== 'at ' && (planA = line.match(/(.*)@(.*)/)))
        ) {
          [callee] = planA;
          native = planA[2] === 'native';
          fileLineColumn = (
            planA[2].match(/(.*):(\d+):(\d+)/) ||
            planA[2].match(/(.*):(\d+)/) ||
            []
          ).slice(1);
        } else if ((planB = line.match(/^(at\s+)*(.+):(\d+):(\d+)/))) {
          fileLineColumn = planB.slice(2);
        } else {
          return undefined;
        }

        return {
          beforeParse: line,
          callee: callee || '',
          index: isBrowser && fileLineColumn[0] === window.location.href,
          native: native || false,
          file: nixSlashes(fileLineColumn[0] || ''),
          line: parseInt(fileLineColumn[1] || '', 10) || undefined,
          column: parseInt(fileLineColumn[2] || '', 10) || undefined,
        };
      });

    return entries.filter((x) => x !== undefined);
  }
}

export default Stack;
