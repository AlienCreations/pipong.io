'use strict';

var R      = require('ramda'),
    mysql  = require('mysql'),
    config = require('config'),
    dbPool = mysql.createPool(config.mysql);

var DB                 = require('alien-node-mysql-utils')(dbPool),
    validatePlayerData = require('../helpers/validatePlayerData').validateForGetByFacebookId;

var createAndExecuteQuery = function(facebookId) {
  var query = 'SELECT * FROM players ' +
              'LEFT JOIN facebook_mapping ON players.id = facebook_mapping.player_id ' +
              'WHERE facebook_mapping.facebook_id = ?',
      queryStatement = [query, [facebookId]];

  return DB.lookup(queryStatement);
};

/**
 * Lookup a player by Facebook id
 * @param {String} facebookId
 * @returns {Promise}
 */
function getPlayerById(facebookId) {
  validatePlayerData({facebookId : facebookId});
  return createAndExecuteQuery(facebookId);
}

module.exports = getPlayerById;
