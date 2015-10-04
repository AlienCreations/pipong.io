'use strict';

var R      = require('ramda'),
    moment = require('moment'),
    mysql  = require('mysql'),
    config = require('config'),
    dbPool = mysql.createPool(config.mysql);

var DB                 = require('alien-node-mysql-utils')(dbPool),
    passwords          = require('../../../utils/passwords'),
    validatePlayerData = require('../helpers/validatePlayerData').validateForInsert;

var decorateDataForDbInsertion = function(playerData) {
  var dataCopy = R.clone(playerData);

  dataCopy.createdDate     = dataCopy.createdDate || moment().format('YYYY-MM-DD');
  dataCopy.createdUnixTime = playerData.createdUnixTime || parseInt(moment().format('X'));

  return dataCopy;
};

var createAndExecuteQuery = function(playerData) {
  playerData = decorateDataForDbInsertion(playerData);

  var fields = R.keys(playerData);
  var query  = 'INSERT INTO players SET ' +
               DB.prepareProvidedFieldsForSet(fields);
  var queryStatement = [query, DB.prepareValues(playerData)];
  return DB.query(queryStatement);
};

function createPlayer(playerData) {
  validatePlayerData(playerData);
  return createAndExecuteQuery(playerData);
}

module.exports = createPlayer;
