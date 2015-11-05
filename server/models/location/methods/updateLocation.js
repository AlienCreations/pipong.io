'use strict';

var R         = require('ramda'),
    mysql     = require('mysql'),
    config    = require('config'),
    prr       = require('prettycats'),
    Validator = require('o-validator'),
    dbPool    = mysql.createPool(R.path(['mysql', 'pipongDb'], config));

var DB                   = require('alien-node-mysql-utils')(dbPool),
    passwords            = require('../../../utils/passwords'),
    validateLocationData = require('../helpers/validateLocationData').validateForUpdate;

var decorateDataForDbInsertion = function(locationData) {
  var dataCopy = R.clone(locationData);

  return dataCopy;
};

var createAndExecuteQuery = function(locationData) {
  locationData = decorateDataForDbInsertion(locationData);

  var id     = R.prop('id', locationData);

  var fields = R.keys(locationData);
  var query  = 'UPDATE locations SET ' +
               DB.prepareProvidedFieldsForSet(fields) + ' ' +
               'WHERE id = ?';
  var values = R.append(id, DB.prepareValues(locationData));

  var queryStatement = [query, values];
  return DB.query(queryStatement);
};

/**
 * Update a location record.
 * @param {Object} locationData
 *
 * Required properties
 * @param {Number} locationData.id
 * @param {String} locationData.email
 *
 * @returns {Promise}
 */
function updateLocation(locationData) {
  locationData = R.defaultTo({}, locationData);
  validateLocationData(locationData);
  return createAndExecuteQuery(locationData);
}

module.exports = updateLocation;
