'use strict';

var R = require('ramda');

var getPlayerById = require('../../../../server/models/player/methods/getPlayerById'),
    commonMocks   = require('../../../_helpers/commonMocks');

var FAKE_PLAYER_ID = 1;

describe('getPlayerById', function() {

  it('gets a player when given an id of type Number', function(done) {
    getPlayerById(FAKE_PLAYER_ID).then(function(data) {
      expect(R.is(Object, data)).toBe(true);
      expect(R.prop('id', data)).toBe(1);
      done();
    });
  });

  it('throws an error when given an id of type String', function() {
    expect(function() {
      getPlayerById('1');
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

  it('throws an error when given no params', function() {
    expect(function() {
      getPlayerById();
    }).toThrow(commonMocks.missingParamErr('id'));
  });

  it('throws an error when given negative id', function() {
    expect(function() {
      getPlayerById(-22);
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

  it('throws an error when given a non-numeric string', function() {
    expect(function() {
      getPlayerById('foo');
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

  it('throws an error when given a null id', function() {
    expect(function() {
      getPlayerById(null);
    }).toThrow(commonMocks.illegalParamErr('id'));
  });

});
