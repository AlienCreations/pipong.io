'use strict';

var R           = require('ramda'),
    redis       = require('redis'),
    redisClient = redis.createClient(),
    cacheUtils  = require('alien-node-redis-utils')(redisClient),
    apiUtils    = require('alien-node-api-utils'),

    // TODO this--
    logUtils    = require('alien-node-winston-utils');

var _updatePlayer = require('../../../models/player/methods/updatePlayer');

/**
 * Create a player in MySQL
 * @param {Object} req
 * @param {Object} res
 */
function updatePlayer(req, res) {

  var playerData = R.path(['body'], req);

  var CACHE_KEY_ID          = 'api.players.getPlayerById:'    + R.prop('id', playerData),
      CACHE_KEY_EMAIL       = 'api.players.getPlayerByEmail:' + R.prop('email', playerData),
      CACHE_EXPIRE_ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

  return _updatePlayer.bind(null, playerData)
    .then(cacheUtils.setItem(CACHE_KEY_ID, CACHE_EXPIRE_ONE_WEEK))
    .then(cacheUtils.setItem(CACHE_KEY_EMAIL, CACHE_EXPIRE_ONE_WEEK))
    .then(JSON.parse)
    .then(apiUtils.jsonResponseSuccess(req, res))
    .catch(function(err) {
      return apiUtils.jsonResponseError(req, res, R.merge(err, {statusCode : 400}));
    });
}

module.exports = updatePlayer;
