'use strict';

var R = require('ramda');

var getPlayerByEmail = require('../../../../server/models/player/methods/getPlayerByEmail'),
    commonMocks      = require('../../../_helpers/commonMocks');

var KNOWN_TEST_EMAIL = 'test@test.com';

describe('getPlayerByEmail', function() {

  it('gets a player when given a known email', function(done) {
    getPlayerByEmail(KNOWN_TEST_EMAIL).then(function(data) {
      expect(R.is(Object, data)).toBe(true);
      expect(R.prop('id', data)).toBe(1);
      done();
    });
  });

  it('throws an error when given an email of type other than String', function() {
    expect(function() {
      getPlayerByEmail(1337);
    }).toThrow(commonMocks.illegalParamErr('email'));
  });

  it('throws an error when given no params', function() {
    expect(function() {
      getPlayerByEmail();
    }).toThrow(commonMocks.missingParamErr('email'));
  });

  it('throws an error when given a malformed email', function() {
    expect(function() {
      getPlayerByEmail('test@');
    }).toThrow(commonMocks.illegalParamErr('email'));
  });

  it('throws an error when given a null email', function() {
    expect(function() {
      getPlayerByEmail(null);
    }).toThrow(commonMocks.illegalParamErr('email'));
  });

});
