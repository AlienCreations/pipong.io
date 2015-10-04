'use strict';

var R         = require('ramda'),
    prr       = require('prettycats'),
    V         = require('o-validator'),
    validate  = require('../../../utils/validatePayload')('playerData');

var FORMATTED_DATE_PATTERN = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;

var validateForInsert = validate({
  email           : V.required(prr.isEmail),
  name            : V.required(prr.isStringOfLengthAtMost(30)),
  username        : V.required(prr.isStringOfLengthAtMost(12)),
  password        : V.required(prr.isStringOfLength(60)),
  avatar1         : prr.isStringOfLengthAtMost(15),
  avatar2         : prr.isStringOfLengthAtMost(15),
  wins            : prr.isAtLeastZero,
  losses          : prr.isAtLeastZero,
  createdDate     : prr.isStringMatching(FORMATTED_DATE_PATTERN),
  createdUnixTime : prr.isPositiveNumber
});

var validateForUpdate = validate({
  id       : V.required(prr.isPositiveNumber),
  email    : V.required(prr.isEmail),
  name     : prr.isStringOfLengthAtMost(30),
  username : prr.isStringOfLengthAtMost(12),
  password : prr.isStringOfLengthAtMost(60),
  avatar1  : prr.isStringOfLengthAtMost(15),
  avatar2  : prr.isStringOfLengthAtMost(15),
  wins     : prr.isAtLeastZero,
  losses   : prr.isAtLeastZero
});

var validateForGetById = validate({
  id : V.required(prr.isPositiveNumber)
});

var validateForGetByEmail = validate({
  email : V.required(prr.isEmail)
});

module.exports = {
  validateForInsert     : validateForInsert,
  validateForUpdate     : validateForUpdate,
  validateForGetById    : validateForGetById,
  validateForGetByEmail : validateForGetByEmail
};
