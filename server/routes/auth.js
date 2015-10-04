'use strict';

var express  = require('express'),
    passport = require('passport'),
    router   = express.Router();

var loginCtrl  = require('../../controllers/auth/login'),
    logoutCtrl = require('../../controllers/auth/logout');

router.get('/login', loginCtrl);
router.get('/logout', logoutCtrl);

// GET /auth/facebook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Facebook authentication will involve
//   redirecting the user to facebook.com.  After authorization, Facebook will
//   redirect the user back to this application at /auth/facebook/callback
router.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res) {
    // The request will be redirected to Facebook for authentication, so this
    // function will not be called.
  });

// GET /auth/facebook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {failureRedirect : '/login'}),
  function(req, res) {
    console.log('user = ', req.user);
    res.redirect('/');
  });
