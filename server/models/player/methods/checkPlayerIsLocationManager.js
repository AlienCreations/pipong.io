'use strict';

var R      = require('ramda'),
    mysql  = require('mysql'),
    config = require('config'),
    dbPool = mysql.createPool(config.mysql);

var DB                 = require('alien-node-mysql-utils')(dbPool),
    validatePlayerData = require('../helpers/validatePlayerData').validateForCheckIsLocationManager;

var createAndExecuteQuery = function(data) {
  var query = 'SELECT COUNT(p.id) AS count FROM players p ' +
              'LEFT JOIN location_managers lm ON lm.player_id = p.id ' +
              'LEFT JOIN locations l ON lm.location_id = l.id ' +
              'WHERE lm.location_id = ? AND lm.player_id = ? ';

  var queryStatement = [query, [R.prop('locationId', data), R.prop('playerId', data)]];

  return DB.lookup(queryStatement);
};

/**
 * Check if a provided playerId is the manager of provided locationId.
 * @param {Object} data
 * @returns {Promise}
 */
function checkPlayerIsLocationManager(data) {
  validatePlayerData(data);
  return createAndExecuteQuery(data);
}

module.exports = checkPlayerIsLocationManager;
