const {sneakyGetReq} = require('test-libB');

const Sandworm = require('../dist/index');

Sandworm.init({devMode: false, verbose: true});

sneakyGetReq();
