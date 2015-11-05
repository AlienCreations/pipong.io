'use strict';

var R      = require('ramda'),
    mysql  = require('mysql'),
    config = require('config'),
    dbPool = mysql.createPool(R.path(['mysql', 'pipongDb'], config));

var DB                 = require('alien-node-mysql-utils')(dbPool),
    validatePlayerData = require('../helpers/validatePlayerData').validateForGetByTableShortCode;

var createAndExecuteQuery = function(tableShortCode) {
  var query = 'SELECT players.* FROM players ' +
              'JOIN player_tables ON player_tables.player_id = players.id ' +
              'JOIN tables ON tables.id = player_tables.table_id '          +
              'WHERE tables.short_code = ?',
      queryStatement = [query, [tableShortCode]];

  return DB.query(queryStatement);
};

/**
 * Fetch a list of players assigned to a table via a provided table shortCode
 * @param {String} shortCode
 * @returns {Promise}
 */
function getPlayersByTableShortCode(shortCode) {
  validatePlayerData({tableShortCode : shortCode});
  return createAndExecuteQuery(shortCode);
}

module.exports = getPlayersByTableShortCode;
