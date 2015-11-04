'use strict';

var R      = require('ramda'),
    mysql  = require('mysql'),
    config = require('config'),
    dbPool = mysql.createPool(R.prop('mysql', config));

var DB                = require('alien-node-mysql-utils')(dbPool),
    validateAgentData = require('../helpers/validateAgentData').validateForDelete;

var createAndExecuteQuery = function(aud) {
  var query          = 'DELETE FROM agents WHERE aud = ?',
      queryStatement = [query, [aud]];

  return DB.query(queryStatement);
};

/**
 * Delete an agent record
 * @param {String} aud
 * @returns {Promise}
 */
function deleteAgent(aud) {
  validateAgentData({aud : aud});
  return createAndExecuteQuery(aud);
}

module.exports = deleteAgent;
