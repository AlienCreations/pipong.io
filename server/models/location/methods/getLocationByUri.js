'use strict';

var R      = require('ramda'),
    mysql  = require('mysql'),
    config = require('config'),
    dbPool = mysql.createPool(R.path(['mysql', 'pipongDb'], config));

var DB                   = require('alien-node-mysql-utils')(dbPool),
    validateLocationData = require('../helpers/validateLocationData').validateForGetByUri;

var createAndExecuteQuery = function(uri) {
  var query          = 'SELECT * FROM locations WHERE uri = ?',
      queryStatement = [query, [uri]];

  return DB.lookup(queryStatement);
};

/**
 * Lookup a location by uri
 * @param {Number} uri
 * @returns {Promise}
 */
function getLocationByUri(uri) {
  validateLocationData({uri : uri});
  return createAndExecuteQuery(uri);
}

module.exports = getLocationByUri;
