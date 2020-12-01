'use strict';

var R      = require('ramda'),
    config = require('config');

var VALIDATION_ERROR_KEY_ILLEGAL_PARAM                   = 'VALUE',
    VALIDATION_ERROR_KEY_MISSING_PARAM                   = 'REQUIRED',
    VALIDATION_ERROR_KEY_UNSUPPORTED_PARAM               = 'UNSUPPORTED',
    MAX_CONTROLLERS_TO_WHICH_EVENT_EMITTER_SHOULD_LISTEN = 100;

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

var makeJsonResponse = function(statusCode, data) {
  return R.merge({
    statusCode : statusCode,
    flash      : {notice : 'notice', error : 'error'}
  }, {data : data});
};

var COMMON_REQUEST_BODY = {
  flash   : R.identity,
  session : {
    flash : {}
  }
};

var COMMON_RESPONSE_BODY = {
  locals : {}
};

var COMMON_DB_DELETE_RESPONSE = {
  affectedRows : 1,
  warningCount : 0,
  message      : '',
  changedRows  : 0
};

// Fix for redis-mock that is misusing EventEmitter
require('events').EventEmitter.prototype._maxListeners = MAX_CONTROLLERS_TO_WHICH_EVENT_EMITTER_SHOULD_LISTEN;

module.exports = {
  illegalParamErr           : validationErr(VALIDATION_ERROR_KEY_ILLEGAL_PARAM),
  missingParamErr           : validationErr(VALIDATION_ERROR_KEY_MISSING_PARAM),
  unsupportedParamErr       : validationErr(VALIDATION_ERROR_KEY_UNSUPPORTED_PARAM),
  override                  : override,
  makeJsonResponse          : makeJsonResponse,
  COMMON_REQUEST_BODY       : COMMON_REQUEST_BODY,
  COMMON_RESPONSE_BODY      : COMMON_RESPONSE_BODY,
  COMMON_DB_DELETE_RESPONSE : COMMON_DB_DELETE_RESPONSE
};
