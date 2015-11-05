'use strict';

var R      = require('ramda'),
    mysql  = require('mysql'),
    config = require('config'),
    dbPool = mysql.createPool(R.path(['mysql', 'pipongDb'], config));

var DB                = require('alien-node-mysql-utils')(dbPool),
    validateAgentData = require('../helpers/validateAgentData').validateForGetByAud;

var createAndExecuteQuery = function(aud) {
  var query          = 'SELECT * FROM agents WHERE aud = ?',
      queryStatement = [query, [aud]];

  return DB.lookup(queryStatement);
};

/**
 * Look up an agent by aud
 * @param {String} aud
 * @returns {Promise}
 */
function getAuthByAud(aud) {
  validateAgentData({aud : aud});
  return createAndExecuteQuery(aud);
}

module.exports = getAuthByAud;
