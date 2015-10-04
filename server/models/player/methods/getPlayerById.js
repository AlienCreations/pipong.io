'use strict';

var R      = require('ramda'),
    mysql  = require('mysql'),
    config = require('config'),
    dbPool = mysql.createPool(config.mysql);

var DB                 = require('alien-node-mysql-utils')(dbPool),
    validatePlayerData = require('../helpers/validatePlayerData').validateForGetById;

var createAndExecuteQuery = function(id) {
  var query = 'SELECT * FROM players WHERE id = ?',
      queryStatement = [query, [id]];

  return DB.lookup(queryStatement);
};

/**
 * Lookup a player by id
 * @param {Number} id
 * @returns {Promise}
 */
function getPlayerById(id) {
  validatePlayerData({id : id});
  return createAndExecuteQuery(id);
}

module.exports = getPlayerById;
