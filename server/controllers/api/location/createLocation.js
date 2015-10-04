'use strict';

var R        = require('ramda'),
    apiUtils = require('alien-node-api-utils'),

    // TODO this--
    logUtils = require('alien-node-winston-utils');

var _createLocation = require('../../../models/location/methods/createLocation');

/**
 * Create a location in MySQL
 * @param {Object} req
 * @param {Object} res
 */
function createLocation(req, res) {

  var locationData = R.path(['body'], req);

  return _createLocation.bind(null, locationData)
    .then(apiUtils.jsonResponseSuccess(req, res))
    .catch(function(err) {
      return apiUtils.jsonResponseError(req, res, R.merge(err, {statusCode : 400}))
    });
}

module.exports = createLocation;
