'use strict';

var bcrypt = require('bcrypt');


var SALT_ROUNDS_EXPONENT = 10;

/**
 * Create a hash from a provided plaintext password.
 * @param {String} plaintextPassword
 * @param {Number} saltRoundsExponent The higher, the more secure and slower.
 * @returns {String}
 */
var makePasswordHash = function(plaintextPassword, saltRoundsExponent) {
  var salt = bcrypt.genSaltSync(saltRoundsExponent || SALT_ROUNDS_EXPONENT);
  return bcrypt.hashSync(plaintextPassword, salt);
};

/**
 * Returns true if a provided password matches the provided hash.
 * @returns {Boolean}
 */
var passwordMatchesHash = bcrypt.compareSync;


module.exports = {
  makePasswordHash    : makePasswordHash,
  passwordMatchesHash : passwordMatchesHash
};
