'use strict';

var R      = require('ramda'),
    config = require('config');

var getPlayerByFacebookId = require('../../../../server/models/player/methods/getPlayerByFacebookId'),
    commonMocks           = require('../../../_helpers/commonMocks');

var KNOWN_TEST_PLAYER_ID     = 2,
    KNOWN_TEST_FACEBOOK_ID   = '12345',
    FAKE_UNKNOWN_FACEBOOK_ID = '99999',
    FACEBOOK_ID_FIELD        = 'facebookId';

describe('getPlayerByFacebookId', function() {

  it('gets a player when given a known facebook id', function(done) {
    getPlayerByFacebookId(KNOWN_TEST_FACEBOOK_ID).then(function(data) {
      expect(R.is(Object, data)).toBe(true);
      expect(R.prop('id', data)).toBe(KNOWN_TEST_PLAYER_ID);
      done();
    });
  });

  it('throws an error when given an an unknown facebook id', function(done) {
    getPlayerByFacebookId(FAKE_UNKNOWN_FACEBOOK_ID)
      .catch(function(err) {
        expect(err).toEqual(R.path(['errors', 'db', 'NO_RESULTS'], config));
        done();
      })
  });

  it('throws an error when given a facebook id of type Number', function() {
    expect(function() {
      getPlayerByFacebookId(parseInt(KNOWN_TEST_FACEBOOK_ID, 10));
    }).toThrow(commonMocks.illegalParamErr(FACEBOOK_ID_FIELD));
  });

  it('throws an error when given no params', function() {
    expect(function() {
      getPlayerByFacebookId();
    }).toThrow(commonMocks.missingParamErr(FACEBOOK_ID_FIELD));
  });

  it('throws an error when given a null facebook id', function() {
    expect(function() {
      getPlayerByFacebookId(null);
    }).toThrow(commonMocks.illegalParamErr(FACEBOOK_ID_FIELD));
  });

});
