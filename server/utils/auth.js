'use strict';

var R    = require('ramda'),
    atob = require('atob'),
    btoa = require('btoa');

/**
 * Encodes strings to URL Base64
 * @param {String} str
 * @returns {String}
 */
var urlBase64Encode = function(str) {
  var output;

  if (!str) {
    return '';
  }

  output = btoa(str);
  return output.replace('+', '-').replace('/', '_');
};

/**
 * Our application expects the client secret to be base64 encoded,
 * so we need to decode it before sending the secret to
 * jsonwebtoken's verify method.
 * @param {String} str
 * @returns {String}
 */
var urlBase64Decode = function(str) {
  var output;

  if (!str) {
    return '';
  }

  output = str.replace('-', '+').replace('_', '/');

  switch (output.length % 4) {
    case 0:
      break;

    case 2:
      output += '==';
      break;

    case 3:
      output += '=';
      break;

    default:
      throw 'Illegal base64url string!';

  }
  return atob(output);
};

/**
 * Get a token from a header or from a `token` query string parameter.
 * Function expects header token to be JWT which is prefixed with 'Bearer '.
 * @param req
 * @returns {String}
 */
var getTokenFromHeaderOrQueryString = function(req) {
  var isBearer         = R.identical('Bearer'),
      headerToken      = R.path(['headers', 'authorization'], req),
      headerTokenParts = R.split(' ', R.defaultTo('', headerToken)),
      headerTokenType  = R.head(headerTokenParts),
      queryToken       = R.path(['query', 'token'], req);

  return (isBearer(headerTokenType)) ? R.last(headerTokenParts) : R.defaultTo('', queryToken);
};

module.exports = {
  urlBase64Encode                 : urlBase64Encode,
  urlBase64Decode                 : urlBase64Decode,
  getTokenFromHeaderOrQueryString : getTokenFromHeaderOrQueryString
};
