'use strict';

var R           = require('ramda'),
    express     = require('express'),
    passport    = require('passport'),
    router      = express.Router(),
    redis       = require('redis'),
    redisClient = redis.createClient(),
    cacheUtils  = require('alien-node-redis-utils')(redisClient);

var loginCtrl  = require('../controllers/auth/login'),
    logoutCtrl = require('../controllers/auth/logout');

router.get('/login', loginCtrl);
router.get('/logout', logoutCtrl);

// GET /auth/facebook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Facebook authentication will involve
//   redirecting the user to facebook.com.  After authorization, Facebook will
//   redirect the user back to this application at /auth/facebook/callback
router.get('/facebook',
  passport.authenticate('facebook', {
    display : 'touch',
    scope   : ['email']
  }), R.T);

// GET /auth/facebook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect : '/login',
    scope           : ['email']
  }),
  function(req, res) {

    var CACHE_KEY = 'auth.redirect:' + R.prop('sessionID', req);

    cacheUtils.getItem(CACHE_KEY)
      .then(JSON.parse)
      .then(R.prop('url'))
      .then(R.defaultTo('/'))
      .then(function(url) {
        cacheUtils.deleteItem(CACHE_KEY);
        res.redirect(url);
      })
      .catch(res.redirect.bind(res, '/'));
  });

module.exports = router;
