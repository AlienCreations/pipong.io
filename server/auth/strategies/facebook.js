var R                = require('ramda'),
    config           = require('config'),
    FacebookStrategy = require('passport-facebook').Strategy;

var Player = require('../../models/player/Player');

module.exports = new FacebookStrategy({
    clientID      : R.path(['auth', 'strategies', 'facebook', 'clientId'],     config),
    clientSecret  : R.path(['auth', 'strategies', 'facebook', 'clientSecret'], config),
    callbackURL   : R.path(['auth', 'strategies', 'facebook', 'callbackUrl'],  config),
    profileFields : ['id', 'emails', 'gender', 'link', 'locale', 'name', 'displayName', 'picture'],
    enableProof   : true
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function() {
      var _done         = R.partial(done, [null]),
          privateFields = ['email', 'password'];

      var CACHE_KEY             = 'api.players.getPlayerByEmail:' + R.prop('email', profile),
          CACHE_EXPIRE_ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

      return Player.getPlayerByFacebookId(R.prop('id', profile))
        .then(_done)
        .catch(function(err) {
          console.log('getPlayerByFacebookId Error: ', err);
          console.log('creating new player...');
          return Player.createPlayer(Player.transformFacebookProfile(profile))
            .then(R.prop('insertId'))
            .then(Player.mapFacebookId(R.prop('id', profile)))
            .then(Player.getPlayerByFacebookId.bind(Player, R.prop('id', profile)))
            .then(R.omit(privateFields))
            .then(_done)
            .catch(function(err) {
              console.log('fbmap err = ', err);
            });
        });

      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      //return done(null, profile);
    });
  }
);
