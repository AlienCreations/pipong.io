'use strict';

var R      = require('ramda'),
    config = require('config');

var updateTable  = require('../../../../server/models/table/methods/updateTable'),
    getTableById = require('../../../../server/models/table/methods/getTableById'),
    commonMocks  = require('../../../_helpers/commonMocks');

var A_POSITIVE_NUMBER = 1337,
    A_NEGATIVE_NUMBER = -3,
    A_STRING          = 'foo';

var KNOWN_TEST_TABLE_ID                    = 1,
    KNOWN_TABLE_UPDATE_AGENT_ID            = 2,
    FAKE_UNKNOWN_TABLE_ID                  = 9999,
    FAKE_TABLE_UPDATE_LOCATION_ID          = 2,
    FAKE_TABLE_UPDATE_SHORT_CODE           = 'asdasd',
    FAKE_TABLE_UPDATE_MALFORMED_SHORT_CODE = 'asd';

describe('updateTable', function() {

  it('updates a table short when given a 6 character string', function(done) {
    updateTable({
      id        : KNOWN_TEST_TABLE_ID,
      shortCode : FAKE_TABLE_UPDATE_SHORT_CODE
    }).then(function(data) {
      expect(data.affectedRows).toBe(1);
      getTableById(KNOWN_TEST_TABLE_ID)
        .then(function(table) {
          expect(R.prop('shortCode', table)).toBe(FAKE_TABLE_UPDATE_SHORT_CODE);
          done();
        });
    });
  });

  it('updates a table locationId when given a Number', function(done) {
    updateTable({
      id         : KNOWN_TEST_TABLE_ID,
      locationId : FAKE_TABLE_UPDATE_LOCATION_ID
    }).then(function(data) {
      expect(data.affectedRows).toBe(1);
      getTableById(KNOWN_TEST_TABLE_ID)
        .then(function(table) {
          expect(R.prop('locationId', table)).toBe(FAKE_TABLE_UPDATE_LOCATION_ID);
          done();
        });
    });
  });

  it('updates a table agentId when given a Number', function(done) {
    updateTable({
      id      : KNOWN_TEST_TABLE_ID,
      agentId : FAKE_TABLE_UPDATE_LOCATION_ID
    }).then(function(data) {
      expect(data.affectedRows).toBe(1);
      getTableById(KNOWN_TEST_TABLE_ID)
        .then(function(table) {
          expect(R.prop('agentId', table)).toBe(KNOWN_TABLE_UPDATE_AGENT_ID);
          done();
        });
    });
  });

  it('fails gracefully when given an unknown table id to update', function(done) {
    updateTable({
      id        : FAKE_UNKNOWN_TABLE_ID,
      shortCode : FAKE_TABLE_UPDATE_SHORT_CODE
    }).then(function(data) {
      expect(data.affectedRows).toBe(0);
      done();
    });
  });

  it('throws an error when given an id of type other than Number', function() {
    expect(function() {
      updateTable({
        id : A_STRING
      });
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

  it('throws an error when given a location id of type other than Number', function() {
    expect(function() {
      updateTable({
        id         : KNOWN_TEST_TABLE_ID,
        locationId : A_STRING
      });
    }).toThrow(commonMocks.illegalParamErr('locationId'));
  });

  it('throws an error when given an agent id of type other than Number', function() {
    expect(function() {
      updateTable({
        id      : KNOWN_TEST_TABLE_ID,
        agentId : A_STRING
      });
    }).toThrow(commonMocks.illegalParamErr('agentId'));
  });

  it('throws an error when given a shortCode of type other than String', function() {
    expect(function() {
      updateTable({
        id        : KNOWN_TEST_TABLE_ID,
        shortCode : A_POSITIVE_NUMBER
      });
    }).toThrow(commonMocks.illegalParamErr('shortCode'));
  });

  it('throws an error when given a shortCode of type other than String', function() {
    expect(function() {
      updateTable({
        id        : KNOWN_TEST_TABLE_ID,
        shortCode : A_POSITIVE_NUMBER
      });
    }).toThrow(commonMocks.illegalParamErr('shortCode'));
  });

  it('throws an error when given a malformed shortCode', function() {
    expect(function() {
      updateTable({
        id        : KNOWN_TEST_TABLE_ID,
        shortCode : FAKE_TABLE_UPDATE_MALFORMED_SHORT_CODE
      });
    }).toThrow(commonMocks.illegalParamErr('shortCode'));
  });

  it('throws an error when given no params', function() {
    expect(function() {
      updateTable();
    }).toThrow(commonMocks.missingParamErr('id'));
  });

  it('throws an error when given negative id', function() {
    expect(function() {
      updateTable({
        id : A_NEGATIVE_NUMBER
      });
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

  it('throws an error when given a null id', function() {
    expect(function() {
      updateTable({
        id : null
      });
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

});
