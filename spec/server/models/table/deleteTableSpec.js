'use strict';

var R = require('ramda');

var deleteTable = require('../../../../server/models/table/methods/deleteTable'),
    DB          = require('alien-node-mysql-utils'),
    commonMocks = require('../../../_helpers/commonMocks');

var KNOWN_TEST_TABLE_ID   = 1,
    FAKE_UNKNOWN_TABLE_ID = 9999;

describe('deleteTable', function() {

  it('deletes a table record when given a known table id', function(done) {
    deleteTable(KNOWN_TEST_TABLE_ID).then(function(data) {
      expect(data.affectedRows).toBe(1);
      done();
    });
  });

  it('fails gracefully when given an unknown table id', function(done) {
    deleteTable(FAKE_UNKNOWN_TABLE_ID).then(function(data) {
      expect(data.affectedRows).toBe(0);
      done();
    });
  });

  it('throws an error when given an id of type other than Number', function() {
    expect(function() {
      deleteTable('foo');
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

  it('throws an error when id is missing', function() {
    expect(function() {
      deleteTable();
    }).toThrow(commonMocks.missingParamErr('id'));
  });

});
