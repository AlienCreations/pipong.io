'use strict';

var R      = require('ramda'),
    moment = require('moment'),
    mysql  = require('mysql'),
    config = require('config'),
    dbPool = mysql.createPool(R.prop('mysql', config));

var DB                = require('alien-node-mysql-utils')(dbPool),
    validateAgentData = require('../helpers/validateAgentData').validateForInsert;

var decorateDataForDbInsertion = function(agentData) {
  var dataCopy   = R.clone(agentData),
      dateString = moment().format('YYYY-MM-DD'),
      timeStamp  = parseInt(moment().format('X'));

  dataCopy.createdDate     = dateString;
  dataCopy.createdUnixTime = timeStamp;

  return dataCopy;
};

var createAndExecuteQuery = function(agentData) {
  agentData = decorateDataForDbInsertion(agentData);

  var fields         = R.keys(agentData);
  var query          = 'INSERT INTO agents SET ' +
    DB.prepareProvidedFieldsForSet(fields);
  var queryStatement = [query, DB.prepareValues(agentData)];
  return DB.query(queryStatement);
};

function createAgent(agentData) {
  validateAgentData(agentData);
  return createAndExecuteQuery(agentData);
}

module.exports = createAgent;
