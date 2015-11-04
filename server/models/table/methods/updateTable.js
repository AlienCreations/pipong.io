'use strict';

var R         = require('ramda'),
    mysql     = require('mysql'),
    config    = require('config'),
    prr       = require('prettycats'),
    Validator = require('o-validator'),
    dbPool    = mysql.createPool(config.mysql);

var DB                = require('alien-node-mysql-utils')(dbPool),
    validateTableData = require('../helpers/validateTableData').validateForUpdate;

var decorateDataForDbInsertion = function(tableData) {
  var dataCopy = R.clone(tableData);
  return dataCopy;
};

var createAndExecuteQuery = function(tableData) {
  tableData = decorateDataForDbInsertion(tableData);

  var id     = R.prop('id', tableData);

  var fields = R.keys(tableData);
  var query  = 'UPDATE tables SET ' +
               DB.prepareProvidedFieldsForSet(fields) + ' ' +
               'WHERE id = ?';
  var values = R.append(id, DB.prepareValues(tableData));

  var queryStatement = [query, values];
  return DB.query(queryStatement);
};

/**
 * Update a table record.
 * @param {Object} tableData
 *
 * Required properties
 * @param {Number} tableData.id
 *
 * @returns {Promise}
 */
function updateTable(tableData) {
  tableData = R.defaultTo({}, tableData);
  validateTableData(tableData);
  return createAndExecuteQuery(tableData);
}

module.exports = updateTable;
