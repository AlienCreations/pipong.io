'use strict';

var R = require('ramda');

var getPlayerByFacebookId = require('../../../../server/models/player/methods/getPlayerByFacebookId'),
    commonMocks   = require('../../../_helpers/commonMocks');

var FAKE_PLAYER_ID    = 2,
    FAKE_FACEBOOK_ID  = '12345',
    FACEBOOK_ID_FIELD = 'facebookId';

describe('getPlayerByFacebookId', function() {

  it('gets a player when given a known id of type String', function(done) {
    getPlayerByFacebookId(FAKE_FACEBOOK_ID).then(function(data) {
      expect(R.is(Object, data)).toBe(true);
      expect(R.prop('id', data)).toBe(FAKE_PLAYER_ID);
      done();
    });
  });

  it('throws an error when given an id of type Number', function() {
    expect(function() {
      getPlayerByFacebookId(parseInt(FAKE_FACEBOOK_ID, 10));
    }).toThrow(commonMocks.illegalParamErr(FACEBOOK_ID_FIELD));
  });

  it('throws an error when given no params', function() {
    expect(function() {
      getPlayerByFacebookId();
    }).toThrow(commonMocks.missingParamErr(FACEBOOK_ID_FIELD));
  });

  it('throws an error when given a null id', function() {
    expect(function() {
      getPlayerByFacebookId(null);
    }).toThrow(commonMocks.illegalParamErr(FACEBOOK_ID_FIELD));
  });

});
