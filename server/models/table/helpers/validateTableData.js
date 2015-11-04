'use strict';

var R        = require('ramda'),
    prr      = require('prettycats'),
    V        = require('o-validator'),
    validate = require('../../../utils/validatePayload')('tableData');

var FORMATTED_DATE_PATTERN = /[0-9]{4}-[0-9]{2}-[0-9]{2}/,
    SHORT_CODE_LENGTH      = 6;

var validateForInsert = validate({
  locationId      : V.required(prr.isPositiveNumber),
  agentId         : V.required(prr.isPositiveNumber),
  shortCode       : prr.isStringOfLength(SHORT_CODE_LENGTH),
  createdDate     : prr.isStringMatching(FORMATTED_DATE_PATTERN),
  createdUnixTime : prr.isPositiveNumber
});

var validateForUpdate = validate({
  id              : V.required(prr.isPositiveNumber),
  locationId      : prr.isPositiveNumber,
  agentId         : prr.isPositiveNumber,
  shortCode       : prr.isStringOfLength(SHORT_CODE_LENGTH),
  createdDate     : prr.isStringMatching(FORMATTED_DATE_PATTERN),
  createdUnixTime : prr.isPositiveNumber
});

var validateForDelete = validate({
  id : V.required(prr.isPositiveNumber)
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

var validateForGetByShortCode = validate({
  shortCode : V.required(prr.isStringOfLength(SHORT_CODE_LENGTH))
});

var validateForGetByLocationId = validate({
  locationId : V.required(prr.isPositiveNumber)
});

module.exports = {
  validateForInsert          : validateForInsert,
  validateForUpdate          : validateForUpdate,
  validateForDelete          : validateForDelete,
  validateForPlayerMapping   : validateForPlayerMapping,
  validateForGetById         : validateForGetById,
  validateForGetByShortCode  : validateForGetByShortCode,
  validateForGetByLocationId : validateForGetByLocationId
};
