'use strict';

var R      = require('ramda'),
    mysql  = require('mysql'),
    config = require('config'),
    dbPool = mysql.createPool(config.mysql);

var DB                 = require('alien-node-mysql-utils')(dbPool),
    validatePlayerData = require('../helpers/validatePlayerData').validateForGetByEmail;

var createAndExecuteQuery = function(email) {
  var query = 'SELECT * FROM players WHERE email LIKE ?',
      queryStatement = [query, [email]];

  return DB.lookup(queryStatement);
};

/**
 * Lookup a player by email
 * @param {String} email
 * @returns {Promise}
 */
function getPlayerByEmail(email) {
  validatePlayerData({email : email});
  return createAndExecuteQuery(email);
}

module.exports = getPlayerByEmail;
