// expose our config directly to our application using module.exports
var keys = require('../keys.js');
module.exports = {
  facebookAuth: keys.facebook
};
