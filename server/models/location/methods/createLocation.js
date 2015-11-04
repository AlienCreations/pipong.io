'use strict';

var R      = require('ramda'),
    moment = require('moment'),
    mysql  = require('mysql'),
    config = require('config'),
    dbPool = mysql.createPool(config.mysql);

var DB                   = require('alien-node-mysql-utils')(dbPool),
    validateLocationData = require('../helpers/validateLocationData').validateForInsert;

var decorateDataForDbInsertion = function(locationData) {
  var dataCopy    = R.clone(locationData),
      getProvided = R.prop(R.__, dataCopy),
      dateString  = moment().format('YYYY-MM-DD'),
      timeStamp   = parseInt(moment().format('X'));

  dataCopy.createdDate     = R.defaultTo(dateString, getProvided('createdDate'));
  dataCopy.createdUnixTime = R.defaultTo(timeStamp,  getProvided('createdUnixTime'));

  return dataCopy;
};

var createAndExecuteQuery = function(locationData) {
  locationData = decorateDataForDbInsertion(locationData);

  var fields         = R.keys(locationData);
  var query          = 'INSERT INTO locations SET ' +
                       DB.prepareProvidedFieldsForSet(fields);
  var queryStatement = [query, DB.prepareValues(locationData)];
  return DB.query(queryStatement);
};

function createLocation(locationData) {
  validateLocationData(locationData);
  return createAndExecuteQuery(locationData);
}

module.exports = createLocation;
