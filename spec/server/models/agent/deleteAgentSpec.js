'use strict';

var R = require('ramda');

var deleteAgent = require('../../../../server/models/agent/methods/deleteAgent'),
    DB             = require('alien-node-mysql-utils'),
    commonMocks    = require('../../../_helpers/commonMocks');

var KNOWN_TEST_AUD        = 'd41d8cd98f00b204e9800998ecf8427e',
    FAKE_UNKNOWN_AUD      = 'x41d8cd98f00b204e9800998ecf8427x',
    FAKE_MALFORMED_AUD    = 'aaaaaa',

    A_POSITIVE_NUMBER     = 1000;

describe('deleteAgent', function() {

  it('deletes an agent record when given a known agent aud', function(done) {
    deleteAgent(KNOWN_TEST_AUD).then(function(data) {
      expect(data.affectedRows).toBe(1);
      done();
    });
  });

  it('fails gracefully when given an unknown agent aud', function(done) {
    deleteAgent(FAKE_UNKNOWN_AUD).then(function(data) {
      expect(data.affectedRows).toBe(0);
      done();
    });
  });

  it('throws an error when given an aud of type other than String', function() {
    expect(function() {
      deleteAgent(A_POSITIVE_NUMBER);
    }).toThrow(commonMocks.illegalParamErr('aud'));
  });

  it('throws an error when given a malformed aud', function() {
    expect(function() {
      deleteAgent(FAKE_MALFORMED_AUD);
    }).toThrow(commonMocks.illegalParamErr('aud'));
  });

  it('throws an error when aud is missing', function() {
    expect(function() {
      deleteAgent();
    }).toThrow(commonMocks.missingParamErr('aud'));
  });

});
