'use strict';

var V      = require('o-validator'),
    R      = require('ramda'),
    config = require('config');

var _customErrorHandler = R.curry(function(identifier, errors) {
  var firstError    = R.head(errors),
      errorTemplate = R.path(['errors', 'validation', R.prop('errorCode', firstError)], config),
      errorMessage  = R.prop('message', errorTemplate) + ': ' + R.prop('property', firstError),
      error         = R.merge(errorTemplate, {
                        message : errorMessage
                      });

  throw error;
});

var validateWithIdentifier = R.curry(function(identifier, schema, props) {
  return V.validateWithErrorHandler(_customErrorHandler(identifier), schema, props);
});

module.exports = validateWithIdentifier;
