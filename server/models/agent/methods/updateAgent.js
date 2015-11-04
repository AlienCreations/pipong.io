'use strict';

var R         = require('ramda'),
    mysql     = require('mysql'),
    config    = require('config'),
    moment    = require('moment'),
    prr       = require('prettycats'),
    Validator = require('o-validator'),
    dbPool    = mysql.createPool(R.prop('mysql', config));

var DB                = require('alien-node-mysql-utils')(dbPool),
    validateAgentData = require('../helpers/validateAgentData').validateForUpdate;

var decorateDataForDbInsertion = function(agentData) {
  var dataCopy   = R.clone(agentData),
      dateString = moment().format('YYYY-MM-DD'),
      timeStamp  = parseInt(moment().format('X'));

  dataCopy.updatedDate     = dateString;
  dataCopy.updatedUnixTime = timeStamp;

  return dataCopy;
};

var createAndExecuteQuery = function(agentData) {
  agentData = decorateDataForDbInsertion(agentData);

  var aud = R.prop('aud', agentData);

  var fields = R.keys(agentData);
  var query  = 'UPDATE agents SET ' +
    DB.prepareProvidedFieldsForSet(fields) + ' ' +
    'WHERE aud = ?';
  var values = R.append(aud, DB.prepareValues(agentData));

  var queryStatement = [query, values];
  return DB.query(queryStatement);
};

/**
 * Update a agent record.
 * @param {Object} agentData
 *
 * Required properties
 * @param {String} agentData.aud
 * @param {String} agentData.secret
 * @param {String} agentData.name
 *
 * @returns {Promise}
 */
function updateAgent(agentData) {
  agentData = R.defaultTo({}, agentData);
  validateAgentData(agentData);
  return createAndExecuteQuery(agentData);
}

module.exports = updateAgent;
