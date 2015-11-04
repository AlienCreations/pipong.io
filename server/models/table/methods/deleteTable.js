'use strict';

var R         = require('ramda'),
    mysql     = require('mysql'),
    config    = require('config'),
    dbPool    = mysql.createPool(config.mysql);

var DB                = require('alien-node-mysql-utils')(dbPool),
    validateTableData = require('../helpers/validateTableData').validateForDelete;

var createAndExecuteQuery = function(id) {
  var query          = 'DELETE FROM tables WHERE id = ?';
  var queryStatement = [query, [id]];
  return DB.query(queryStatement);
};

/**
 * Delete a table record and associated table.
 * @param {Object} id
 * @returns {Promise}
 */
function deleteTable(id) {
  validateTableData({id : id});
  return createAndExecuteQuery(id);
}

module.exports = deleteTable;
