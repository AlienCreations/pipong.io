'use strict';

var R      = require('ramda'),
    config = require('config');

var getTableByShortCode = require('../../../../server/models/table/methods/getTableByShortCode'),
    commonMocks         = require('../../../_helpers/commonMocks');

var KNOWN_TEST_SHORT_CODE     = '17daf4',
    FAKE_UNKNOWN_SHORT_CODE   = 'xdaf4x',
    FAKE_MALFORMED_SHORT_CODE = 'asdf';

describe('getTableByShortCode', function() {

  it('gets a table when given a known shortCode', function(done) {
    getTableByShortCode(KNOWN_TEST_SHORT_CODE).then(function(data) {
      expect(R.is(Object, data)).toBe(true);
      expect(R.prop('id', data)).toBe(1);
      done();
    });
  });

  it('throws an error when given an unknown shortCode', function(done) {
    getTableByShortCode(FAKE_UNKNOWN_SHORT_CODE)
      .catch(function(err) {
        expect(err).toEqual(R.path(['errors', 'db', 'NO_RESULTS'], config));
        done();
      })
  });

  it('throws an error when given a shortCode of type other than String', function() {
    expect(function() {
      getTableByShortCode(1337);
    }).toThrow(commonMocks.illegalParamErr('shortCode'));
  });

  it('throws an error when given no params', function() {
    expect(function() {
      getTableByShortCode();
    }).toThrow(commonMocks.missingParamErr('shortCode'));
  });

  it('throws an error when given a malformed shortCode', function() {
    expect(function() {
      getTableByShortCode(FAKE_MALFORMED_SHORT_CODE);
    }).toThrow(commonMocks.illegalParamErr('shortCode'));
  });

  it('throws an error when given a null shortCode', function() {
    expect(function() {
      getTableByShortCode(null);
    }).toThrow(commonMocks.illegalParamErr('shortCode'));
  });

});
