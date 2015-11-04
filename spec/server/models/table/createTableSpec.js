'use strict';

var R = require('ramda');

var createTable = require('../../../../server/models/table/methods/createTable'),
    commonMocks = require('../../../_helpers/commonMocks');

var A_POSITIVE_NUMBER = 1337;

var FAKE_AGENT_ID          = 2,
    FAKE_SHORT_CODE        = '39daf4',
    FAKE_LOCATION_ID       = 2,
    FAKE_CREATED_DATE      = '2015-06-01',
    FAKE_CREATED_UNIX_TIME = 1434386763;

var makeFakeTableData = function(includeOptional) {
  var fakeRequiredTableData = {
    locationId : FAKE_LOCATION_ID,
    agentId    : FAKE_AGENT_ID
  };

  var fakeOptionalTableData = {
    shortCode       : FAKE_SHORT_CODE,
    createdDate     : FAKE_CREATED_DATE,
    createdUnixTime : FAKE_CREATED_UNIX_TIME
  };

  return includeOptional ? R.merge(fakeOptionalTableData, fakeRequiredTableData) : fakeRequiredTableData;
};

var fullTableDataForQuery     = makeFakeTableData(true),
    requiredTableDataForQuery = makeFakeTableData(false);

var fullTableDataSwapIn = commonMocks.override(fullTableDataForQuery);

describe('createTable', function() {
  it('creates a table record when given expected data for all fields', function(done) {
    createTable(fullTableDataForQuery).then(function(data) {
      expect(data.affectedRows).toBe(1);
      done();
    });
  });

  it('creates a table record when given expected data for only required fields', function(done) {
    createTable(requiredTableDataForQuery).then(function(data) {
      expect(data.affectedRows).toBe(1);
      done();
    });
  });

  it('throws an error when given an unsupported parameter', function() {
    expect(function() {
      createTable(fullTableDataSwapIn('foo', 'bar'));
    }).toThrow(commonMocks.unsupportedParamErr('foo'));
  });

  it('throws an error when given a locationId of type other than Number', function() {
    expect(function() {
      createTable(fullTableDataSwapIn('locationId', 'foo'));
    }).toThrow(commonMocks.illegalParamErr('locationId'));
  });

  it('throws an error when locationId is missing', function() {
    expect(function() {
      createTable(fullTableDataSwapIn('locationId', undefined));
    }).toThrow(commonMocks.missingParamErr('locationId'));
  });

  it('throws an error when given an agentId of type other than Number', function() {
    expect(function() {
      createTable(fullTableDataSwapIn('agentId', 'foo'));
    }).toThrow(commonMocks.illegalParamErr('agentId'));
  });

  it('throws an error when given a shortCode of type other than String', function() {
    expect(function() {
      createTable(fullTableDataSwapIn('shortCode', A_POSITIVE_NUMBER));
    }).toThrow(commonMocks.illegalParamErr('shortCode'));
  });

  it('throws an error when given a createdDate of type other than String', function() {
    expect(function() {
      createTable(fullTableDataSwapIn('createdDate', A_POSITIVE_NUMBER));
    }).toThrow(commonMocks.illegalParamErr('createdDate'));
  });

  it('throws an error when given a createdDate as a string in a format other than YYYY-MM-DD', function() {
    expect(function() {
      createTable(fullTableDataSwapIn('createdDate', '12-05-1979'));
    }).toThrow(commonMocks.illegalParamErr('createdDate'));
  });

  it('throws an error when given a createdUnixTime of type other than Number', function() {
    expect(function() {
      createTable(fullTableDataSwapIn('createdUnixTime', '1234567890'));
    }).toThrow(commonMocks.illegalParamErr('createdUnixTime'));
  });
});
