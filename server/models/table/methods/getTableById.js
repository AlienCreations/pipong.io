'use strict';

var R      = require('ramda'),
    mysql  = require('mysql'),
    config = require('config'),
    dbPool = mysql.createPool(R.path(['mysql', 'pipongDb'], config));

var DB                = require('alien-node-mysql-utils')(dbPool),
    validateTableData = require('../helpers/validateTableData').validateForGetById;

var createAndExecuteQuery = function(id) {
  var query          = 'SELECT * FROM tables WHERE id = ?',
      queryStatement = [query, [id]];

  return DB.lookup(queryStatement);
};

/**
 * Lookup a table by id
 * @param {Number} id
 * @returns {Promise}
 */
function getTableById(id) {
  validateTableData({id : id});
  return createAndExecuteQuery(id);
}

module.exports = getTableById;
