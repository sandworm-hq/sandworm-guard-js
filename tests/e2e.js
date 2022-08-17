const {sanityCheck, vanillaGetReq} = require('test-libA');

const Sandworm = require('../dist/index');

Sandworm.init({devMode: true, verbose: true});

sanityCheck();
vanillaGetReq();
