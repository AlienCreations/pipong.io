'use strict';

var R      = require('ramda'),
    config = require('config');

var getTableById = require('../../../../server/models/table/methods/getTableById'),
    commonMocks  = require('../../../_helpers/commonMocks');

var KNOWN_TEST_TABLE_ID   = 1,
    FAKE_UNKNOWN_TABLE_ID = 9999;

describe('getTableById', function() {

  it('gets a table when given a known id', function(done) {
    getTableById(KNOWN_TEST_TABLE_ID).then(function(data) {
      expect(R.is(Object, data)).toBe(true);
      expect(R.prop('id', data)).toBe(1);
      done();
    });
  });

  it('throws an error when given an an unknown id', function(done) {
    getTableById(FAKE_UNKNOWN_TABLE_ID)
      .catch(function(err) {
        expect(err).toEqual(R.path(['errors', 'db', 'NO_RESULTS'], config));
        done();
      })
  });

  it('throws an error when given an id of type String', function() {
    expect(function() {
      getTableById('1');
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

  it('throws an error when given no params', function() {
    expect(function() {
      getTableById();
    }).toThrow(commonMocks.missingParamErr('id'));
  });

  it('throws an error when given negative id', function() {
    expect(function() {
      getTableById(-22);
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

  it('throws an error when given a non-numeric string', function() {
    expect(function() {
      getTableById('foo');
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

  it('throws an error when given a null id', function() {
    expect(function() {
      getTableById(null);
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

});
