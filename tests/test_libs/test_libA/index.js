const axios = require('axios').default;

const sanityCheck = () => {
  console.log('It werks!');
};

const vanillaGetReq = async () => {
  // Make a request for a user with a given ID
  const gets = await axios.get('http://localhost:3000/');
  console.log(gets);
  return gets;
};

module.exports = {sanityCheck, vanillaGetReq};
