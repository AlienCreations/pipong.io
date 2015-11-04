'use strict';

var R           = require('ramda'),
    redis       = require('redis'),
    redisClient = redis.createClient(),
    cacheUtils  = require('alien-node-redis-utils')(redisClient),
    apiUtils    = require('alien-node-api-utils'),

    // TODO this--
    logUtils    = require('alien-node-winston-utils');

var _getPlayersByTableShortCode = require('../../../models/player/methods/getPlayersByTableShortCode');

/**
 * Get a list of players assigned to a provided table id from MySQL
 * @param {Object} req
 * @param {Object} res
 */
function getPlayersByTableShortCode(req, res) {

  var tableShortCode = R.path(['params', 'code'], req);

  var CACHE_KEY             = 'api.players.getPlayersByTableShortCode:' + tableShortCode,
      CACHE_EXPIRE_ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

  var privateFields = ['email', 'password'];

  try {
    return cacheUtils.getItem(CACHE_KEY)
      .then(JSON.parse)
      .then(apiUtils.jsonResponseSuccess(req, res))
      .catch(_getPlayersByTableShortCode.bind(null, tableShortCode))
      .then(R.omit(privateFields))
      .then(cacheUtils.setItem(CACHE_KEY, CACHE_EXPIRE_ONE_WEEK))
      .then(apiUtils.jsonResponseSuccess(req, res))
      .catch(function(err) {
        return apiUtils.jsonResponseError(req, res, R.merge(err, {statusCode : 404}));
      });
  } catch (err) {
    return apiUtils.jsonResponseError(req, res, R.merge(err, {statusCode : 500}));
  }
}

module.exports = getPlayersByTableShortCode;
