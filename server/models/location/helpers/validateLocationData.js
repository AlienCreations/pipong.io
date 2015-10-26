'use strict';

var R        = require('ramda'),
    prr      = require('prettycats'),
    V        = require('o-validator'),
    validate = require('../../../utils/validatePayload')('tableData');

var FORMATTED_DATE_PATTERN = /[0-9]{4}-[0-9]{2}-[0-9]{2}/,
    MD5_LENGTH             = 32,
    SHORT_CODE_LENGTH      = 6;

var validateForInsert = validate({
  locationId      : V.required(prr.isPositiveNumber),
  code            : prr.isStringOfLength(MD5_LENGTH),
  shortCode       : prr.isStringOfLength(SHORT_CODE_LENGTH),
  createdDate     : prr.isStringMatching(FORMATTED_DATE_PATTERN),
  createdUnixTime : prr.isPositiveNumber
});

var validateForUpdate = validate({
  id              : V.required(prr.isPositiveNumber),
  locationId      : prr.isPositiveNumber,
  code            : prr.isStringOfLength(MD5_LENGTH),
  shortCode       : prr.isStringOfLength(SHORT_CODE_LENGTH),
  createdDate     : prr.isStringMatching(FORMATTED_DATE_PATTERN),
  createdUnixTime : prr.isPositiveNumber
});

var validateForPlayerMapping = validate({
  playerId        : V.required(prr.isPositiveNumber),
  tableId         : V.required(prr.isPositiveNumber),
  status          : V.required(prr.isNumber),
  createdDate     : prr.isStringMatching(FORMATTED_DATE_PATTERN),
  createdUnixTime : prr.isPositiveNumber
});

var validateForGetById = validate({
  id : V.required(prr.isPositiveNumber)
});

var validateForGetByLocationId = validate({
  locationId : V.required(prr.isPositiveNumber)
});

module.exports = {
  validateForInsert          : validateForInsert,
  validateForUpdate          : validateForUpdate,
  validateForPlayerMapping   : validateForPlayerMapping,
  validateForGetById         : validateForGetById,
  validateForGetByLocationId : validateForGetByLocationId
};
