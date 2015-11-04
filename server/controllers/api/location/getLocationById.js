'use strict';

var R           = require('ramda'),
    redis       = require('redis'),
    redisClient = redis.createClient(),
    cacheUtils  = require('alien-node-redis-utils')(redisClient),
    apiUtils    = require('alien-node-api-utils'),

    // TODO this--
    logUtils    = require('alien-node-winston-utils');

var _getLocationById = require('../../../models/location/methods/getLocationById');

/**
 * Get a location by its id from MySQL
 * @param {Object} req
 * @param {Object} res
 */
function getLocationById(req, res) {

  var locationId = R.path(['params', 'id'], req);

  var CACHE_KEY             = 'api.locations.getLocationById:' + locationId,
      CACHE_EXPIRE_ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

  try {
    return cacheUtils.getItem(CACHE_KEY)
      .then(JSON.parse)
      .then(apiUtils.jsonResponseSuccess(req, res))
      .catch(_getLocationById.bind(null, parseInt(locationId, 10)))
      .then(cacheUtils.setItem(CACHE_KEY, CACHE_EXPIRE_ONE_WEEK))
      .then(apiUtils.jsonResponseSuccess(req, res))
      .catch(function(err) {
        return apiUtils.jsonResponseError(req, res, R.merge(err, {statusCode : 404}));
      });
  } catch (err) {
    return apiUtils.jsonResponseError(req, res, R.merge(err, {statusCode : 500}));
  }
}

module.exports = getLocationById;
