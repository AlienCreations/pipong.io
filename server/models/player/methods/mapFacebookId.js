'use strict';

var R      = require('ramda'),
    moment = require('moment'),
    mysql  = require('mysql'),
    config = require('config'),
    dbPool = mysql.createPool(R.path(['mysql', 'pipongDb'], config));

var DB                 = require('alien-node-mysql-utils')(dbPool),
    validatePlayerData = require('../helpers/validatePlayerData').validateForFacebookMapping;

var createAndExecuteQuery = function(ids) {
  var fields = R.keys(ids);
  var query  = 'INSERT INTO facebook_mapping SET ' +
               DB.prepareProvidedFieldsForSet(fields);
  var queryStatement = [query, DB.prepareValues(ids)];
  return DB.query(queryStatement);
};

/**
 * Add a user id to the facebook mapping table.
 * @param {String} facebookId
 * @param {Number} playerId
 */
function mapFacebookId(facebookId, playerId) {
  var ids = {
    facebookId : facebookId,
    playerId   : playerId
  };

  validatePlayerData(ids);
  return createAndExecuteQuery(ids);
}

module.exports = R.curry(mapFacebookId);
