'use strict';

var R      = require('ramda'),
    moment = require('moment'),
    mysql  = require('mysql'),
    config = require('config'),
    dbPool = mysql.createPool(config.mysql);

var DB                = require('alien-node-mysql-utils')(dbPool),
    validateTableData = require('../helpers/validateTableData').validateForInsert;

var decorateDataForDbInsertion = function(tableData) {
  var dataCopy    = R.clone(tableData),
      getProvided = R.prop(R.__, dataCopy),
      dateString  = moment().format('YYYY-MM-DD'),
      timeStamp   = parseInt(moment().format('X'));

  dataCopy.createdDate     = R.defaultTo(dateString, getProvided('createdDate'));
  dataCopy.createdUnixTime = R.defaultTo(timeStamp,  getProvided('createdUnixTime'));


  return dataCopy;
};

var createAndExecuteQuery = function(tableData) {
  tableData = decorateDataForDbInsertion(tableData);

  var fields = R.keys(tableData);
  var query  = 'INSERT INTO tables SET ' +
               DB.prepareProvidedFieldsForSet(fields);
  var queryStatement = [query, DB.prepareValues(tableData)];
  return DB.query(queryStatement);
};

function createTable(tableData) {
  validateTableData(tableData);
  return createAndExecuteQuery(tableData);
}

module.exports = createTable;
