'use strict';

var R      = require('ramda'),
    config = require('config');

var updateLocation  = require('../../../../server/models/location/methods/updateLocation'),
    getLocationById = require('../../../../server/models/location/methods/getLocationById'),
    commonMocks     = require('../../../_helpers/commonMocks');

var A_POSITIVE_NUMBER = 1337,
    A_NEGATIVE_NUMBER = -3,
    A_STRING          = 'foo';

var KNOWN_TEST_LOCATION_ID    = 1,
    FAKE_UNKNOWN_LOCATION_ID  = 9999,
    FAKE_LOCATION_UPDATE_NAME = 'Update name',
    FAKE_LOCATION_UPDATE_URI  = 'update-uri';

describe('updateLocation', function() {

  it('updates a location name when given a string', function(done) {
    updateLocation({
      id   : KNOWN_TEST_LOCATION_ID,
      name : FAKE_LOCATION_UPDATE_NAME
    }).then(function(data) {
      expect(data.affectedRows).toBe(1);
      getLocationById(KNOWN_TEST_LOCATION_ID)
        .then(function(location) {
          expect(R.prop('name', location)).toBe(FAKE_LOCATION_UPDATE_NAME);
          done();
        });
    });
  });

  it('updates a location uri when given a string', function(done) {
    updateLocation({
      id  : KNOWN_TEST_LOCATION_ID,
      uri : FAKE_LOCATION_UPDATE_URI
    }).then(function(data) {
      expect(data.affectedRows).toBe(1);
      getLocationById(KNOWN_TEST_LOCATION_ID)
        .then(function(location) {
          expect(R.prop('uri', location)).toBe(FAKE_LOCATION_UPDATE_URI);
          done();
        });
    });
  });

  it('fails gracefully when given an unknown location id to update', function(done) {
    updateLocation({
      id   : FAKE_UNKNOWN_LOCATION_ID,
      name : FAKE_LOCATION_UPDATE_NAME
    }).then(function(data) {
      expect(data.affectedRows).toBe(0);
      done();
    });
  });

  it('throws an error when given an id of type other than Number', function() {
    expect(function() {
      updateLocation({
        id : A_STRING
      });
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

  it('throws an error when given a name of type other than String', function() {
    expect(function() {
      updateLocation({
        id   : KNOWN_TEST_LOCATION_ID,
        name : A_POSITIVE_NUMBER
      });
    }).toThrow(commonMocks.illegalParamErr('name'));
  });

  it('throws an error when given a uri of type other than String', function() {
    expect(function() {
      updateLocation({
        id  : KNOWN_TEST_LOCATION_ID,
        uri : A_POSITIVE_NUMBER
      });
    }).toThrow(commonMocks.illegalParamErr('uri'));
  });

  it('throws an error when given no params', function() {
    expect(function() {
      updateLocation();
    }).toThrow(commonMocks.missingParamErr('id'));
  });

  it('throws an error when given negative id', function() {
    expect(function() {
      updateLocation({
        id : A_NEGATIVE_NUMBER
      });
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

  it('throws an error when given a null id', function() {
    expect(function() {
      updateLocation({
        id : null
      });
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

});
