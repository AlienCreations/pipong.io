'use strict';

var R         = require('ramda'),
    mysql     = require('mysql'),
    config    = require('config'),
    prr       = require('prettycats'),
    Validator = require('o-validator'),
    dbPool    = mysql.createPool(R.path(['mysql', 'pipongDb'], config));

var DB                 = require('alien-node-mysql-utils')(dbPool),
    passwords          = require('../../../utils/passwords'),
    validatePlayerData = require('../helpers/validatePlayerData').validateForUpdate;

var decorateDataForDbInsertion = function(playerData) {
  var dataCopy   = R.clone(playerData),
      playerProp = R.prop(R.__, dataCopy);

  if (playerProp('password')) {
    dataCopy.password = passwords.makePasswordHash(playerProp('password'));
  }

  return dataCopy;
};

var createAndExecuteQuery = function(playerData) {
  playerData = decorateDataForDbInsertion(playerData);

  var id     = R.prop('id', playerData);

  var fields = R.keys(playerData);
  var query  = 'UPDATE players SET ' +
               DB.prepareProvidedFieldsForSet(fields) + ' ' +
               'WHERE id = ?';
  var values = R.append(id, DB.prepareValues(playerData));

  var queryStatement = [query, values];
  return DB.query(queryStatement);
};

/**
 * Update a player record.
 * @param {Object} playerData
 *
 * Required properties
 * @param {Number} playerData.id
 * @param {String} playerData.email
 *
 * @returns {Promise}
 */
function updatePlayer(playerData) {
  playerData = R.defaultTo({}, playerData);
  validatePlayerData(playerData);
  return createAndExecuteQuery(playerData);
}

module.exports = updatePlayer;
