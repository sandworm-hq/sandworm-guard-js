const Sandworm = require('../dist/index');

Sandworm.init({
  devMode: true,
  verbose: true,
  skipTracking: true,
  permissions: [
    {
      module: 'test-addon',
      permissions: [
        'process.dlopen',
        'vm.compileFunction',
        'fs.readSync',
        'fs.realpathSync',
        'fs.readFileSync',
        'fs.openSync',
        'fs.closeSync',
      ],
    },
    {
      module: 'test-libB>test-libA',
      permissions: [
        'vm.compileFunction',
        'fs.readSync',
        'fs.realpathSync',
        'fs.readFileSync',
        'fs.openSync',
        'fs.closeSync',
      ],
    },
    {
      module: 'test-libB>test-libA>axios',
      permissions: [
        'vm.compileFunction',
        'fs.readSync',
        'fs.realpathSync',
        'fs.readFileSync',
        'fs.openSync',
        'fs.closeSync',
      ],
    },
    {
      module: 'test-libB>test-libA>axios>follow-redirects',
      permissions: [
        'vm.compileFunction',
        'fs.readSync',
        'fs.realpathSync',
        'fs.readFileSync',
        'fs.openSync',
        'fs.closeSync',
      ],
    },
    {
      module: 'test-libB>test-libA>axios>form-data',
      permissions: [
        'vm.compileFunction',
        'fs.readSync',
        'fs.realpathSync',
        'fs.readFileSync',
        'fs.openSync',
        'fs.closeSync',
      ],
    },
    {
      module: 'test-libB>test-libA>axios>form-data>combined-stream',
      permissions: [
        'vm.compileFunction',
        'fs.readSync',
        'fs.realpathSync',
        'fs.readFileSync',
        'fs.openSync',
        'fs.closeSync',
      ],
    },
    {
      module: 'test-libB>test-libA>axios>form-data>mime-types',
      permissions: [
        'vm.compileFunction',
        'fs.readSync',
        'fs.realpathSync',
        'fs.readFileSync',
        'fs.openSync',
        'fs.closeSync',
      ],
    },
    {
      module: 'test-libB>test-libA>axios>form-data>mime-types>mime-db',
      permissions: [
        'vm.compileFunction',
        'fs.readSync',
        'fs.realpathSync',
        'fs.readFileSync',
        'fs.openSync',
        'fs.closeSync',
      ],
    },
    {
      module: 'test-libB>test-libA>axios>form-data>asynckit',
      permissions: [
        'vm.compileFunction',
        'fs.readSync',
        'fs.realpathSync',
        'fs.readFileSync',
        'fs.openSync',
        'fs.closeSync',
      ],
    },
  ],
});

const {sneakyGetReq} = require('test-libB');

sneakyGetReq();
console.log("Hello World");