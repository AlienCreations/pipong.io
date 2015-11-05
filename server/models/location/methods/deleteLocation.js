'use strict';

var R         = require('ramda'),
    mysql     = require('mysql'),
    config    = require('config'),
    dbPool    = mysql.createPool(R.path(['mysql', 'pipongDb'], config));

var DB                   = require('alien-node-mysql-utils')(dbPool),
    passwords            = require('../../../utils/passwords'),
    validateLocationData = require('../helpers/validateLocationData').validateForDelete;

var createAndExecuteQuery = function(id) {
  var query          = 'DELETE FROM locations WHERE id = ?';
  var queryStatement = [query, [id]];
  return DB.query(queryStatement);
};

/**
 * Delete a location record and associated manager mappings.
 * @param {Object} id
 * @returns {Promise}
 */
function deleteLocation(id) {
  validateLocationData({id : id});
  return createAndExecuteQuery(id);
}

module.exports = deleteLocation;
