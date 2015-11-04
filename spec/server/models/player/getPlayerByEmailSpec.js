'use strict';

var R      = require('ramda'),
    config = require('config');

var getPlayerByEmail = require('../../../../server/models/player/methods/getPlayerByEmail'),
    commonMocks      = require('../../../_helpers/commonMocks');

var KNOWN_TEST_EMAIL     = 'test@test.com',
    FAKE_UNKNOWN_EMAIL   = 'foo@bar.com',
    FAKE_MALFORMED_EMAIL = 'test@',
    A_POSITIVE_NUMBER    = 1337;

describe('getPlayerByEmail', function() {

  it('gets a player when given a known email', function(done) {
    getPlayerByEmail(KNOWN_TEST_EMAIL).then(function(data) {
      expect(R.is(Object, data)).toBe(true);
      expect(R.prop('id', data)).toBe(1);
      done();
    });
  });

  it('throws an error when given an an unknown email', function(done) {
    getPlayerByEmail(FAKE_UNKNOWN_EMAIL)
      .catch(function(err) {
        expect(err).toEqual(R.path(['errors', 'db', 'NO_RESULTS'], config));
        done();
      })
  });

  it('throws an error when given an email of type other than String', function() {
    expect(function() {
      getPlayerByEmail(A_POSITIVE_NUMBER);
    }).toThrow(commonMocks.illegalParamErr('email'));
  });

  it('throws an error when given no params', function() {
    expect(function() {
      getPlayerByEmail();
    }).toThrow(commonMocks.missingParamErr('email'));
  });

  it('throws an error when given a malformed email', function() {
    expect(function() {
      getPlayerByEmail(FAKE_MALFORMED_EMAIL);
    }).toThrow(commonMocks.illegalParamErr('email'));
  });

  it('throws an error when given a null email', function() {
    expect(function() {
      getPlayerByEmail(null);
    }).toThrow(commonMocks.illegalParamErr('email'));
  });

});
