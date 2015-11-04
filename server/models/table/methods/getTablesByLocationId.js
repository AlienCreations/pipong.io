'use strict';

var R      = require('ramda'),
    mysql  = require('mysql'),
    config = require('config'),
    dbPool = mysql.createPool(config.mysql);

var DB                = require('alien-node-mysql-utils')(dbPool),
    validateTableData = require('../helpers/validateTableData').validateForGetByLocationId;

var createAndExecuteQuery = function(locationId) {
  var query = 'SELECT * FROM tables WHERE location_id = ?',
      queryStatement = [query, [locationId]];

  return DB.query(queryStatement);
};

/**
 * Fetch tables by location_id
 * @param {Number} locationId
 * @returns {Promise}
 */
function getTablesByLocationId(locationId) {
  validateTableData({locationId : locationId});
  return createAndExecuteQuery(locationId);
}

module.exports = getTablesByLocationId;
