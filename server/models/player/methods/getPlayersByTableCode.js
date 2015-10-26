'use strict';

var R      = require('ramda'),
    mysql  = require('mysql'),
    config = require('config'),
    dbPool = mysql.createPool(config.mysql);

var DB                 = require('alien-node-mysql-utils')(dbPool),
    validatePlayerData = require('../helpers/validatePlayerData').validateForGetByTableCode;

var createAndExecuteQuery = function(id) {
  var query = 'SELECT * FROM players WHERE id = ?',
      queryStatement = [query, [id]];

  return DB.query(queryStatement);
};

/**
 * Fetch a list of players assigned to a provided table id
 * @param {String} code
 * @returns {Promise}
 */
function getPlayersByTableId(code) {
  validatePlayerData({tableCode : code});
  return createAndExecuteQuery(code);
}

module.exports = getPlayersByTableId;
