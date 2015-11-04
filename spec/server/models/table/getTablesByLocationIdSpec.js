'use strict';

var R      = require('ramda'),
    config = require('config');

var getTablesByLocationId = require('../../../../server/models/table/methods/getTablesByLocationId'),
    commonMocks          = require('../../../_helpers/commonMocks');

var KNOWN_TEST_LOCATION_ID   = 1,
    FAKE_UNKNOWN_LOCATION_ID = 9999;

describe('getTablesByLocationId', function() {

  it('gets a table when given a known id', function(done) {
    getTablesByLocationId(KNOWN_TEST_LOCATION_ID).then(function(data) {
      expect(R.is(Array, data)).toBe(true);
      expect(R.prop('locationId', R.head(data))).toBe(1);
      done();
    });
  });

  it('throws an error when given an an unknown location id', function(done) {
    getTablesByLocationId(FAKE_UNKNOWN_LOCATION_ID)
      .catch(function(err) {
        expect(err).toEqual(R.path(['errors', 'db', 'NO_RESULTS'], config));
        done();
      })
  });

  it('throws an error when given a location id of type String', function() {
    expect(function() {
      getTablesByLocationId('1');
    }).toThrow(commonMocks.illegalParamErr('locationId'));
  });

  it('throws an error when given no params', function() {
    expect(function() {
      getTablesByLocationId();
    }).toThrow(commonMocks.missingParamErr('locationId'));
  });

  it('throws an error when given negative id', function() {
    expect(function() {
      getTablesByLocationId(-22);
    }).toThrow(commonMocks.illegalParamErr('locationId'));
  });

  it('throws an error when given a non-numeric string', function() {
    expect(function() {
      getTablesByLocationId('foo');
    }).toThrow(commonMocks.illegalParamErr('locationId'));
  });

  it('throws an error when given a null location id', function() {
    expect(function() {
      getTablesByLocationId(null);
    }).toThrow(commonMocks.illegalParamErr('locationId'));
  });

});
