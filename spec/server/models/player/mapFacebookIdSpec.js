'use strict';

var R      = require('ramda'),
    config = require('config');

var mapFacebookId  = require('../../../../server/models/player/methods/mapFacebookId'),
    DB             = require('alien-node-mysql-utils'),
    commonMocks    = require('../../../_helpers/commonMocks');

var FAKE_PLAYER_ID_NEW    = 1,
    FAKE_FACEBOOK_ID_NEW  = '1234567890',
    FAKE_PLAYER_ID_EXISTS    = 2,
    FAKE_FACEBOOK_ID_EXISTS  = '12345';

describe('mapFacebookId', function() {

  it('maps a player\'s facebook account id to his/her pipong id when given expected data for all fields', function(done) {
    mapFacebookId(FAKE_FACEBOOK_ID_NEW, FAKE_PLAYER_ID_NEW).then(function(data) {
      expect(data.affectedRows).toBe(1);
      done();
    });
  });

  it('throws an error when mapping record exists, checked with player_id', function(done) {
    mapFacebookId(FAKE_FACEBOOK_ID_EXISTS, FAKE_PLAYER_ID_EXISTS).catch(function(err) {
      expect(err).toEqual(R.path(['errors', 'db', 'NO_RESULTS'], config));
      done();
    });
  });

});
