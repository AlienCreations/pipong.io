'use strict';

var R        = require('ramda'),
    prr      = require('prettycats'),
    V        = require('o-validator'),
    validate = require('../../../utils/validatePayload')('authData');

var validateForInsert = validate({
  aud             : V.required(prr.isStringOfLength(32)),
  secret          : V.required(prr.isStringOfLength(32)),
  name            : V.required(R.both(prr.isStringOfLengthAtLeast(3), prr.isStringOfLengthAtMost(30))),
  status          : prr.isNumberBetweenInclusive(0, 9)
});

var validateForGetByAud = validate({
  aud : V.required(prr.isStringOfLength(32))
});

var validateForUpdate = validate({
  aud             : V.required(prr.isStringOfLength(32)),
  secret          : prr.isStringOfLength(32),
  name            : R.both(prr.isStringOfLengthAtLeast(3), prr.isStringOfLengthAtMost(30)),
  status          : prr.isNumberBetweenInclusive(0, 9)
});

var validateForDelete = validate({
  aud : V.required(prr.isStringOfLength(32))
});

module.exports = {
  validateForGetByAud : validateForGetByAud,
  validateForInsert   : validateForInsert,
  validateForUpdate   : validateForUpdate,
  validateForDelete   : validateForDelete
};
