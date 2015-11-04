'use strict';

var R      = require('ramda'),
    goby   = require('goby').init(),
    moment = require('moment'),
    mysql  = require('mysql'),
    config = require('config'),
    dbPool = mysql.createPool(config.mysql);

var DB                 = require('alien-node-mysql-utils')(dbPool),
    passwords          = require('../../../utils/passwords'),
    validatePlayerData = require('../helpers/validatePlayerData').validateForInsert;

var decorateDataForDbInsertion = function(playerData) {
  var dataCopy    = R.clone(playerData),
      getProvided = R.prop(R.__, dataCopy),
      randomName  = goby.generate(['adj', 'pre', 'suf']),
      dateString  = moment().format('YYYY-MM-DD'),
      timeStamp   = parseInt(moment().format('X'));

  if (getProvided('password')) {
    dataCopy.password = passwords.makePasswordHash(getProvided('password'));
  }

  dataCopy.username        = R.defaultTo(randomName, getProvided('username'));
  dataCopy.createdDate     = R.defaultTo(dateString, getProvided('createdDate'));
  dataCopy.createdUnixTime = R.defaultTo(timeStamp,  getProvided('createdUnixTime'));

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
