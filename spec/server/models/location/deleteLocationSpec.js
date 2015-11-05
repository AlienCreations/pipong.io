'use strict';

var R = require('ramda');

var deleteLocation = require('../../../../server/models/location/methods/deleteLocation'),
    DB             = require('alien-node-mysql-utils'),
    commonMocks    = require('../../../_helpers/commonMocks');

var KNOWN_TEST_LOCATION_ID   = 2,
    FAKE_UNKNOWN_LOCATION_ID = 9999;

describe('deleteLocation', function() {

  it('deletes a location record when given a known location id', function(done) {
    deleteLocation(KNOWN_TEST_LOCATION_ID).then(function(data) {
      expect(data.affectedRows).toBe(1);
      done();
    });
  });

  it('fails gracefully when given an unknown location id', function(done) {
    deleteLocation(FAKE_UNKNOWN_LOCATION_ID).then(function(data) {
      expect(data.affectedRows).toBe(0);
      done();
    });
  });

  it('throws an error when given an id of type other than Number', function() {
    expect(function() {
      deleteLocation('foo');
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

  it('throws an error when id is missing', function() {
    expect(function() {
      deleteLocation();
    }).toThrow(commonMocks.missingParamErr('id'));
  });

});
