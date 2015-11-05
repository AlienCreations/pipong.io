'use strict';

var R      = require('ramda'),
    mysql  = require('mysql'),
    config = require('config'),
    dbPool = mysql.createPool(R.path(['mysql', 'pipongDb'], config));

var DB                = require('alien-node-mysql-utils')(dbPool),
    validateTableData = require('../helpers/validateTableData').validateForGetByShortCode;

var createAndExecuteQuery = function(shortCode) {
  var query          = 'SELECT * FROM tables WHERE short_code = ?',
      queryStatement = [query, [shortCode]];

  return DB.lookup(queryStatement);
};

/**
 * Lookup a table by shortCode
 * @param {String} shortCode
 * @returns {Promise}
 */
function getTableByShortCode(shortCode) {
  validateTableData({shortCode : shortCode});
  return createAndExecuteQuery(shortCode);
}

module.exports = getTableByShortCode;
