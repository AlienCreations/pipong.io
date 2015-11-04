'use strict';

var R      = require('ramda'),
    config = require('config');

var getPlayersByTableShortCode = require('../../../../server/models/player/methods/getPlayersByTableShortCode'),
    commonMocks                = require('../../../_helpers/commonMocks');

var KNOWN_TEST_TABLE_SHORT_CODE   = '17daf4',
    FAKE_UNKNOWN_TABLE_SHORT_CODE = 'asdasd',
    FAKE_INVALID_TABLE_SHORT_CODE = 'asd',
    KNOWN_TEST_PLAYER_1_ID        = 1,
    KNOWN_TEST_PLAYER_2_ID        = 2,
    A_POSITIVE_NUMBER             = 1337;

describe('getPlayersByTableShortCode', function() {

  it('gets an array of players assigned to a table when given a known table shortCode', function(done) {
    getPlayersByTableShortCode(KNOWN_TEST_TABLE_SHORT_CODE).then(function(data) {
      expect(R.is(Array, data)).toBe(true);
      expect(R.prop('id', R.head(data))).toBe(KNOWN_TEST_PLAYER_1_ID);
      expect(R.prop('id', R.last(data))).toBe(KNOWN_TEST_PLAYER_2_ID);
      done();
    });
  });

  it('throws an error when given an an unknown table shortCode', function(done) {
    getPlayersByTableShortCode(FAKE_UNKNOWN_TABLE_SHORT_CODE)
      .catch(function(err) {
        expect(err).toEqual(R.path(['errors', 'db', 'NO_RESULTS'], config));
        done();
      })
  });

  it('throws an error when given an a table shortCode of type other than String', function() {
    expect(function() {
      getPlayersByTableShortCode(A_POSITIVE_NUMBER);
    }).toThrow(commonMocks.illegalParamErr('tableShortCode'));
  });

  it('throws an error when given no params', function() {
    expect(function() {
      getPlayersByTableShortCode();
    }).toThrow(commonMocks.missingParamErr('tableShortCode'));
  });

  it('throws an error when given an invalid table shortCode', function() {
    expect(function() {
      getPlayersByTableShortCode(FAKE_INVALID_TABLE_SHORT_CODE);
    }).toThrow(commonMocks.illegalParamErr('tableShortCode'));
  });

  it('throws an error when given a null table shortCode', function() {
    expect(function() {
      getPlayersByTableShortCode(null);
    }).toThrow(commonMocks.illegalParamErr('tableShortCode'));
  });

});
