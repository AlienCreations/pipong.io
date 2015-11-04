'use strict';

var R        = require('ramda'),
    prr      = require('prettycats'),
    V        = require('o-validator'),
    validate = require('../../../utils/validatePayload')('locationData');

var FORMATTED_DATE_PATTERN = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;

var validateForInsert = validate({
  name            : V.required(prr.isStringOfLengthAtMost(100)),
  uri             : prr.isStringOfLengthAtMost(255),
  createdDate     : prr.isStringMatching(FORMATTED_DATE_PATTERN),
  createdUnixTime : prr.isPositiveNumber
});

var validateForInsertManager = validate({
  playerId        : V.required(prr.isPositiveNumber),
  locationId      : V.required(prr.isPositiveNumber),
  createdDate     : prr.isStringMatching(FORMATTED_DATE_PATTERN),
  createdUnixTime : prr.isPositiveNumber
});

var validateForUpdate = validate({
  id              : V.required(prr.isPositiveNumber),
  name            : prr.isStringOfLengthAtMost(100),
  uri             : prr.isStringOfLengthAtMost(255),
  createdDate     : prr.isStringMatching(FORMATTED_DATE_PATTERN),
  createdUnixTime : prr.isPositiveNumber
});

var validateForDelete = validate({
  id : V.required(prr.isPositiveNumber)
});

var validateForGetById = validate({
  id : V.required(prr.isPositiveNumber)
});

var validateForGetByUri = validate({
  uri : V.required(prr.isStringOfLengthAtMost(255))
});

module.exports = {
  validateForInsert        : validateForInsert,
  validateForInsertManager : validateForInsertManager,
  validateForUpdate        : validateForUpdate,
  validateForDelete        : validateForDelete,
  validateForGetById       : validateForGetById,
  validateForGetByUri      : validateForGetByUri
};
