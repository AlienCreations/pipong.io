var R                = require('ramda'),
    config           = require('config'),
    FacebookStrategy = require('passport-facebook').Strategy;

module.exports = new FacebookStrategy({
    clientID     : R.path(['env', 'FACEBOOK_APP_ID'], process),
    clientSecret : R.path(['env', 'FACEBOOK_APP_SECRET'], process),
    callbackURL  : R.path(['auth', 'strategies', 'facebook', 'callbackUrl'], config)
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function() {

      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
);
