'use strict';

var R           = require('ramda'),
    redis       = require('redis'),
    redisClient = redis.createClient(),
    cacheUtils  = require('alien-node-redis-utils')(redisClient),
    apiUtils    = require('alien-node-api-utils'),

    // TODO this--
    logUtils    = require('alien-node-winston-utils');

var _getLocationByUri = require('../../../models/location/methods/getLocationByUri');

/**
 * Get a location by its uri from MySQL
 * @param {Object} req
 * @param {Object} res
 */
function getLocationByUri(req, res) {

  var locationUri = R.path(['params', 'uri'], req);

  var CACHE_KEY             = 'api.locations.getLocationByUri:' + locationUri,
      CACHE_EXPIRE_ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

  try {
    return cacheUtils.getItem(CACHE_KEY)
      .then(JSON.parse)
      .then(apiUtils.jsonResponseSuccess(req, res))
      .catch(_getLocationByUri.bind(null, parseInt(locationUri)))
      .then(cacheUtils.setItem(CACHE_KEY, CACHE_EXPIRE_ONE_WEEK))
      .then(apiUtils.jsonResponseSuccess(req, res))
      .catch(function(err) {
        return apiUtils.jsonResponseError(req, res, R.merge(err, {statusCode : 404}));
      });
  } catch (err) {
    return apiUtils.jsonResponseError(req, res, R.merge(err, {statusCode : 500}));
  }
}

module.exports = getLocationByUri;
