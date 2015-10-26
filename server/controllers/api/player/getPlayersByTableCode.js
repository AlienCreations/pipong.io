'use strict';

var R           = require('ramda'),
    redis       = require('redis'),
    redisClient = redis.createClient(),
    cacheUtils  = require('alien-node-redis-utils')(redisClient),
    apiUtils    = require('alien-node-api-utils'),

    // TODO this--
    logUtils    = require('alien-node-winston-utils');

var _getPlayersByTableId = require('../../../models/player/methods/getPlayersByTableId');

/**
 * Get a list of players assigned to a provided table id from MySQL
 * @param {Object} req
 * @param {Object} res
 */
function getPlayersByTableId(req, res) {

  var tableId = R.path(['params', 'id'], req);

  var CACHE_KEY             = 'api.players.getPlayersByTableId:' + tableId,
      CACHE_EXPIRE_ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

  var privateFields = ['email', 'password'];

  return cacheUtils.getItem(CACHE_KEY)
    .then(JSON.parse)
    .then(apiUtils.jsonResponseSuccess(req, res))
    .catch(_getPlayersByTableId.bind(null, parseInt(tableId)))
    .then(R.omit(privateFields))
    .then(cacheUtils.setItem(CACHE_KEY, CACHE_EXPIRE_ONE_WEEK))
    .then(apiUtils.jsonResponseSuccess(req, res))
    .catch(function(err) {
      return apiUtils.jsonResponseError(req, res, R.merge(err, { statusCode : 404 }));
    });
}

module.exports = getPlayersByTableId;
