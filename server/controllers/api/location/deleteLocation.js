'use strict';

var R           = require('ramda'),
    redis       = require('redis'),
    redisClient = redis.createClient(),
    cacheUtils  = require('alien-node-redis-utils')(redisClient),
    apiUtils    = require('alien-node-api-utils'),

    // TODO this--
    logUtils    = require('alien-node-winston-utils');

var _deleteLocation = require('../../../models/location/methods/deleteLocation'),
    getLocationById = require('../../../models/location/methods/getLocationById');

/**
 * Delete a location in MySQL
 * @param {Object} req
 * @param {Object} res
 */
function deleteLocation(req, res) {

  var locationId = parseInt(R.path(['params', 'id'], req), 10);

  var CACHE_KEY_ID = 'api.locations.getLocationById:' + locationId;

  try {
    return getLocationById(locationId)
      .then(cacheUtils.deleteItem(R.concat('api.locations.getLocationByUri:', R.prop('uri'))))
      .then(cacheUtils.deleteItem(CACHE_KEY_ID))
      .then(_deleteLocation.bind(null, locationId))
      .then(apiUtils.jsonResponseSuccess(req, res))
      .catch(function(err) {
        return apiUtils.jsonResponseError(req, res, R.merge(err, {statusCode : 400}));
      });
  } catch (err) {
    return apiUtils.jsonResponseError(req, res, R.merge(err, {statusCode : 500}));
  }
}

module.exports = deleteLocation;
