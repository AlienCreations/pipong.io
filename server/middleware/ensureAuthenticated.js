'use strict';

var R           = require('ramda'),
    redis       = require('redis'),
    redisClient = redis.createClient(),
    cacheUtils  = require('alien-node-redis-utils')(redisClient);

/**
 * Ensure the req.user has a session, and if not, send to login page.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {*}
 */
var ensureAuthenticated = function(req, res, next) {

  var CACHE_KEY               = 'auth.redirect:' + R.prop('sessionID', req),
      CACHE_EXPIRE_ONE_MINUTE = 1000 * 60,
      cacheVal                = R.createMapEntry('url', R.prop('originalUrl', req));

  if (req.isAuthenticated()) {
    return next();
  } else {
    cacheUtils.setItem(CACHE_KEY, CACHE_EXPIRE_ONE_MINUTE, cacheVal)
      .then(function() {
        res.redirect('/auth/facebook');
      });
  }
};

module.exports = ensureAuthenticated;
