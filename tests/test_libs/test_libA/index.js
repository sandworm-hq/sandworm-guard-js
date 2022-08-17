const axios = require('axios').default;

const sanityCheck = () => {
  console.log('It werks!');
};

const vanillaGetReq = () => {
  // Make a request for a user with a given ID
  axios.get('https://google.com').then((response) => {
    // handle success
    console.log(response);
  });
  // .catch((error) => {
  //   // handle error
  //   console.log(error);
  // })
  // .then(() => {
  //   // always executed
  // });
};

module.exports = {sanityCheck, vanillaGetReq};
