'use strict';

var R      = require('ramda'),
    config = require('config');

var getAgentByAud = require('../../../../server/models/agent/methods/getAgentByAud'),
    commonMocks   = require('../../../_helpers/commonMocks');

var KNOWN_TEST_AUD    = 'a9e1f2941aa53ca4563833d9dc68f6b2',
    FAKE_UNKNOWN_AUD  = 'a9e1f2941aa53ca4563833d9dc6xxxb2',
    FAKE_MALFORMED_AUD  = 'xxx',
    A_POSITIVE_NUMBER = 1338;

describe('getAgentByAud', function() {

  it('gets an agent when given a known aud', function(done) {
    getAgentByAud(KNOWN_TEST_AUD).then(function(data) {
      expect(R.is(Object, data)).toBe(true);
      done();
    });
  });

  it('throws an error when given an unknown aud', function(done) {
    getAgentByAud(FAKE_UNKNOWN_AUD)
      .catch(function(err) {
        expect(err).toEqual(R.path(['errors', 'db', 'NO_RESULTS'], config));
        done();
      })
  });

  it('throws an error when given a malformed aud', function() {
    expect(function() {
      getAgentByAud(FAKE_MALFORMED_AUD);
    }).toThrow(commonMocks.illegalParamErr('aud'));
  });

  it('throws an error when given an aud of type other than String', function() {
    expect(function() {
      getAgentByAud(A_POSITIVE_NUMBER);
    }).toThrow(commonMocks.illegalParamErr('aud'));
  });

  it('throws an error when given no params', function() {
    expect(function() {
      getAgentByAud();
    }).toThrow(commonMocks.missingParamErr('aud'));
  });

  it('throws an error when given a null aud', function() {
    expect(function() {
      getAgentByAud(null);
    }).toThrow(commonMocks.illegalParamErr('aud'));
  });

});
