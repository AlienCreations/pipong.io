'use strict';

var R      = require('ramda'),
    config = require('config');

var updateAgent   = require('../../../../server/models/agent/methods/updateAgent'),
    getAgentByAud = require('../../../../server/models/agent/methods/getAgentByAud'),
    commonMocks   = require('../../../_helpers/commonMocks');

var KNOWN_TEST_AUD     = 'd41d8cd98f00b204e9800998ecf8427e',
    FAKE_UNKNOWN_AUD   = 'x41d8cd98f00b204e9800998ecf8427x',
    FAKE_UPDATE_NAME   = 'Updated agent name',
    FAKE_UPDATE_SECRET = 'x8f5f167f44f4964e6c998dee827110x',
    FAKE_NAME_TOO_SHORT      = 'a',
    FAKE_NAME_TOO_LONG       = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    FAKE_MALFORMED_SECRET    = 'asdf',
    A_POSITIVE_NUMBER        = 1337;

describe('updateAgent', function() {

  it('updates an agent name when given a string of expected length', function(done) {
    updateAgent({
      aud  : KNOWN_TEST_AUD,
      name : FAKE_UPDATE_NAME
    }).then(function(data) {
      expect(data.affectedRows).toBe(1);
      getAgentByAud(KNOWN_TEST_AUD)
        .then(function(agent) {
          expect(R.prop('name', agent)).toBe(FAKE_UPDATE_NAME);
          done();
        });
    });
  });

  it('throws an error when given a name that is too short', function() {
    expect(function() {
      updateAgent({
        aud  : KNOWN_TEST_AUD,
        name : FAKE_NAME_TOO_SHORT
      });
    }).toThrow(commonMocks.illegalParamErr('name'));
  });

  it('throws an error when given a name that is too long', function() {
    expect(function() {
      updateAgent({
        aud  : KNOWN_TEST_AUD,
        name : FAKE_NAME_TOO_LONG
      });
    }).toThrow(commonMocks.illegalParamErr('name'));
  });

  it('updates an agent secret when given a string of expected length', function(done) {
    updateAgent({
      aud    : KNOWN_TEST_AUD,
      secret : FAKE_UPDATE_SECRET
    }).then(function(data) {
      expect(data.affectedRows).toBe(1);
      getAgentByAud(KNOWN_TEST_AUD)
        .then(function(agent) {
          expect(R.prop('secret', agent)).toBe(FAKE_UPDATE_SECRET);
          done();
        });
    });
  });

  it('throws an error when given a malformed secret string', function() {
    expect(function() {
      updateAgent({
        aud    : KNOWN_TEST_AUD,
        secret : FAKE_MALFORMED_SECRET
      });
    }).toThrow(commonMocks.illegalParamErr('secret'));
  });

  it('fails gracefully when given an unknown agent aud to update', function(done) {
    updateAgent({
      aud  : FAKE_UNKNOWN_AUD,
      name : FAKE_UPDATE_NAME
    }).then(function(data) {
      expect(data.affectedRows).toBe(0);
      done();
    });
  });

  it('throws an error when given an aud of type other than String', function() {
    expect(function() {
      updateAgent({
        aud : A_POSITIVE_NUMBER
      });
    }).toThrow(commonMocks.illegalParamErr('aud'));
  });

  it('throws an error when given a name of type other than String', function() {
    expect(function() {
      updateAgent({
        aud  : KNOWN_TEST_AUD,
        name : A_POSITIVE_NUMBER
      });
    }).toThrow(commonMocks.illegalParamErr('name'));
  });

  it('throws an error when given a secret of type other than String', function() {
    expect(function() {
      updateAgent({
        aud    : KNOWN_TEST_AUD,
        secret : A_POSITIVE_NUMBER
      });
    }).toThrow(commonMocks.illegalParamErr('secret'));
  });

  it('throws an error when given no params', function() {
    expect(function() {
      updateAgent();
    }).toThrow(commonMocks.missingParamErr('aud'));
  });

  it('throws an error when given a null aud', function() {
    expect(function() {
      updateAgent({
        aud : null
      });
    }).toThrow(commonMocks.illegalParamErr('aud'));
  });

});
