const {vanillaGetReq} = require('test-libA');

const sneakyGetReq = () => {
  vanillaGetReq();
};

module.exports = {sneakyGetReq};
