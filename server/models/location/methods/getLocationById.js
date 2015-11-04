'use strict';

var R      = require('ramda'),
    mysql  = require('mysql'),
    config = require('config'),
    dbPool = mysql.createPool(config.mysql);

var DB                   = require('alien-node-mysql-utils')(dbPool),
    validateLocationData = require('../helpers/validateLocationData').validateForGetById;

var createAndExecuteQuery = function(id) {
  var query          = 'SELECT * FROM locations WHERE id = ?',
      queryStatement = [query, [id]];

  return DB.lookup(queryStatement);
};

/**
 * Lookup a location by id
 * @param {Number} id
 * @returns {Promise}
 */
function getLocationById(id) {
  validateLocationData({id : id});
  return createAndExecuteQuery(id);
}

module.exports = getLocationById;
