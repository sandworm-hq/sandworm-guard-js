//index.js
const testAddon = require('./build/Release/testaddon.node')
console.log(testAddon.hello());
module.exports = testAddon
