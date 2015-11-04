'use strict';

var R = require('ramda');

var createLocation = require('../../../../server/models/location/methods/createLocation'),
    commonMocks    = require('../../../_helpers/commonMocks');

var A_POSITIVE_NUMBER = 1337;

var FAKE_NAME               = 'Test Location',
    FAKE_URI                = 'test-location',
    FAKE_CREATED_DATE       = '2015-06-01',
    FAKE_CREATED_UNIX_TIME  = 1434386763;

var makeFakeLocationData = function(includeOptional) {
  var fakeRequiredLocationData = {
    name : FAKE_NAME
  };

  var fakeOptionalLocationData = {
    uri             : FAKE_URI,
    createdDate     : FAKE_CREATED_DATE,
    createdUnixTime : FAKE_CREATED_UNIX_TIME
  };

  return includeOptional ? R.merge(fakeOptionalLocationData, fakeRequiredLocationData) : fakeRequiredLocationData;
};

var fullLocationDataForQuery     = makeFakeLocationData(true),
    requiredLocationDataForQuery = makeFakeLocationData(false);

var fullLocationDataSwapIn = commonMocks.override(fullLocationDataForQuery);

describe('createLocation', function() {
  it('creates a location record when given expected data for all fields', function(done) {
    createLocation(fullLocationDataForQuery).then(function(data) {
      expect(data.affectedRows).toBe(1);
      done();
    });
  });

  it('creates a location record when given expected data for only required fields', function(done) {
    createLocation(requiredLocationDataForQuery).then(function(data) {
      expect(data.affectedRows).toBe(1);
      done();
    });
  });

  it('throws an error when given an unsupported parameter', function() {
    expect(function() {
      createLocation(fullLocationDataSwapIn('foo', 'bar'));
    }).toThrow(commonMocks.unsupportedParamErr('foo'));
  });

  it('throws an error when given a name of type other than String', function() {
    expect(function() {
      createLocation(fullLocationDataSwapIn('name', A_POSITIVE_NUMBER));
    }).toThrow(commonMocks.illegalParamErr('name'));
  });

  it('throws an error when name is missing', function() {
    expect(function() {
      createLocation(fullLocationDataSwapIn('name', undefined));
    }).toThrow(commonMocks.missingParamErr('name'));
  });

  it('throws an error when given a uri of type other than String', function() {
    expect(function() {
      createLocation(fullLocationDataSwapIn('uri', A_POSITIVE_NUMBER));
    }).toThrow(commonMocks.illegalParamErr('uri'));
  });

  it('throws an error when given a createdDate of type other than String', function() {
    expect(function() {
      createLocation(fullLocationDataSwapIn('createdDate', A_POSITIVE_NUMBER));
    }).toThrow(commonMocks.illegalParamErr('createdDate'));
  });

  it('throws an error when given a createdDate as a string in a format other than YYYY-MM-DD', function() {
    expect(function() {
      createLocation(fullLocationDataSwapIn('createdDate', '12-05-1979'));
    }).toThrow(commonMocks.illegalParamErr('createdDate'));
  });

  it('throws an error when given a createdUnixTime of type other than Number', function() {
    expect(function() {
      createLocation(fullLocationDataSwapIn('createdUnixTime', '1234567890'));
    }).toThrow(commonMocks.illegalParamErr('createdUnixTime'));
  });
});
