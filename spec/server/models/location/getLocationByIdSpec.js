'use strict';

var R      = require('ramda'),
    config = require('config');

var getLocationById = require('../../../../server/models/location/methods/getLocationById'),
    commonMocks     = require('../../../_helpers/commonMocks');

var KNOWN_TEST_LOCATION_ID   = 1,
    FAKE_UNKNOWN_LOCATION_ID = 9999;

describe('getLocationById', function() {

  it('gets a location when given a known id', function(done) {
    getLocationById(KNOWN_TEST_LOCATION_ID).then(function(data) {
      expect(R.is(Object, data)).toBe(true);
      expect(R.prop('id', data)).toBe(1);
      done();
    });
  });

  it('throws an error when given an an unknown id', function(done) {
    getLocationById(FAKE_UNKNOWN_LOCATION_ID)
      .catch(function(err) {
        expect(err).toEqual(R.path(['errors', 'db', 'NO_RESULTS'], config));
        done();
      })
  });

  it('throws an error when given an id of type String', function() {
    expect(function() {
      getLocationById('1');
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

  it('throws an error when given no params', function() {
    expect(function() {
      getLocationById();
    }).toThrow(commonMocks.missingParamErr('id'));
  });

  it('throws an error when given negative id', function() {
    expect(function() {
      getLocationById(-22);
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

  it('throws an error when given a non-numeric string', function() {
    expect(function() {
      getLocationById('foo');
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

  it('throws an error when given a null id', function() {
    expect(function() {
      getLocationById(null);
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

});
