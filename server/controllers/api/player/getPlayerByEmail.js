'use strict';

var R           = require('ramda'),
    redis       = require('redis'),
    redisClient = redis.createClient(),
    cacheUtils  = require('alien-node-redis-utils')(redisClient),
    apiUtils    = require('alien-node-api-utils'),

    // TODO this--
    logUtils    = require('alien-node-winston-utils');

var _getPlayerByEmail = require('../../../models/player/methods/getPlayerByEmail');

/**
 * Get a player by his/her email from MySQL
 * @param {Object} req
 * @param {Object} res
 */
function getPlayerByEmail(req, res) {

  var playerEmail = R.path(['params', 'email'], req);

  var CACHE_KEY             = 'api.players.getPlayerByEmail:' + playerEmail,
      CACHE_EXPIRE_ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

  var privateFields = ['email', 'password'];

  try {
    return cacheUtils.getItem(CACHE_KEY)
      .then(JSON.parse)
      .then(apiUtils.jsonResponseSuccess(req, res))
      .catch(_getPlayerByEmail.bind(null, playerEmail))
      .then(R.omit(privateFields))
      .then(cacheUtils.setItem(CACHE_KEY, CACHE_EXPIRE_ONE_WEEK))
      .then(apiUtils.jsonResponseSuccess(req, res))
      .catch(function(err) {
        return apiUtils.jsonResponseError(req, res, R.merge({err : err}, {statusCode : 404}));
      });
  } catch (err) {
    return apiUtils.jsonResponseError(req, res, R.merge({err : err}, {statusCode : 500}));
  }
}

module.exports = getPlayerByEmail;
