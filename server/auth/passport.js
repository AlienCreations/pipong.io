'use strict';

var R        = require('ramda'),
    passport = require('passport'),
    facebook = require('./strategies/facebook');

var init = function() {
  passport.use(facebook);
  return passport;
};

module.exports = {
  init : init
};
