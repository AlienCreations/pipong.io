'use strict';

var R           = require('ramda'),
    redis       = require('redis'),
    redisClient = redis.createClient(),
    cacheUtils  = require('alien-node-redis-utils')(redisClient),
    apiUtils    = require('alien-node-api-utils'),

    // TODO this--
    logUtils    = require('alien-node-winston-utils');

var _updateLocation = require('../../../models/location/methods/updateLocation');

/**
 * Update a location in MySQL
 * @param {Object} req
 * @param {Object} res
 */
function updateLocation(req, res) {

  var locationData = R.path(['body'], req);

  var CACHE_KEY_ID          = 'api.locations.getLocationById:'  + R.prop('id',  locationData),
      CACHE_KEY_URI         = 'api.locations.getLocationByUri:' + R.prop('uri', locationData),
      CACHE_EXPIRE_ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

  try {
    return _updateLocation(locationData)
      .then(cacheUtils.setItem(CACHE_KEY_ID, CACHE_EXPIRE_ONE_WEEK))
      .then(cacheUtils.setItem(CACHE_KEY_URI, CACHE_EXPIRE_ONE_WEEK))
      .then(JSON.parse)
      .then(apiUtils.jsonResponseSuccess(req, res))
      .catch(function(err) {
        return apiUtils.jsonResponseError(req, res, R.merge(err, {statusCode : 400}));
      });
  } catch (err) {
    return apiUtils.jsonResponseError(req, res, R.merge(err, {statusCode : 500}));
  }
}

module.exports = updateLocation;
