'use strict';

var R      = require('ramda'),
    config = require('config');

var getLocationByUri = require('../../../../server/models/location/methods/getLocationByUri'),
    commonMocks      = require('../../../_helpers/commonMocks');

var KNOWN_TEST_URI   = 'test-location',
    FAKE_UNKNOWN_URI = 'foo-bar';

describe('getLocationByUri', function() {

  it('gets a location when given a known uri', function(done) {
    getLocationByUri(KNOWN_TEST_URI).then(function(data) {
      expect(R.is(Object, data)).toBe(true);
      expect(R.prop('id', data)).toBe(1);
      done();
    });
  });

  it('throws an error when given an an unknown uri', function(done) {
    getLocationByUri(FAKE_UNKNOWN_URI)
      .catch(function(err) {
        expect(err).toEqual(R.path(['errors', 'db', 'NO_RESULTS'], config));
        done();
      })
  });

  it('throws an error when given an uri of type other than String', function() {
    expect(function() {
      getLocationByUri(1337);
    }).toThrow(commonMocks.illegalParamErr('uri'));
  });

  it('throws an error when given no params', function() {
    expect(function() {
      getLocationByUri();
    }).toThrow(commonMocks.missingParamErr('uri'));
  });

  it('throws an error when given a null uri', function() {
    expect(function() {
      getLocationByUri(null);
    }).toThrow(commonMocks.illegalParamErr('uri'));
  });

});
