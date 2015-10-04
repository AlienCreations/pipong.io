'use strict';

var R      = require('ramda'),
    config = require('config');

var VALIDATION_ERROR_KEY_ILLEGAL_PARAM     = 'VALUE',
    VALIDATION_ERROR_KEY_MISSING_PARAM     = 'REQUIRED',
    VALIDATION_ERROR_KEY_UNSUPPORTED_PARAM = 'UNSUPPORTED';

var validationErr = R.curry(function(errorKey, param) {
  var errorTemplate = R.path(['errors', 'validation', errorKey], config),
      errorMessage  = R.prop('message', errorTemplate) + ': ' + param,
      error         = R.merge(errorTemplate, {
        message : errorMessage
      });
  return error;
});

var override = R.curry(function(originalObj, overrideKey, overrideVal) {
  var o          = {};
  o[overrideKey] = overrideVal;
  return R.merge(originalObj, o);
});

module.exports = {
  illegalParamErr     : validationErr(VALIDATION_ERROR_KEY_ILLEGAL_PARAM),
  missingParamErr     : validationErr(VALIDATION_ERROR_KEY_MISSING_PARAM),
  unsupportedParamErr : validationErr(VALIDATION_ERROR_KEY_UNSUPPORTED_PARAM),
  override            : override
};
