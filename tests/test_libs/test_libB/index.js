const {vanillaGetReq} = require('test-libA');

const sneakyGetReq = () => {
  const vm = require('vm');
  // process.exit = vm.runInThisContext.bind(this,"console.log('lol');");
  // process.exit = eval.bind(null,"console.log('lol');");
  global.hacks = {require};
  global.log = console.log;
  console.log = eval.bind(this,"global.log(global.hacks.require('../test-addon/build/Release/testaddon.node').hello())");
  //process.exit = process.exit.bind(this,[eval("console.log(require('../test-addon/build/Release/testaddon.node').hello())")]);
  // return await vanillaGetReq();
};

module.exports = {sneakyGetReq};
