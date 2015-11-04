'use strict';

var R           = require('ramda'),
    apiUtils    = require('alien-node-api-utils'),

    // TODO this--
    logUtils = require('alien-node-winston-utils');

var _createTable = require('../../../models/table/methods/createTable');

/**
 * Create a "pipong table" record in MySQL
 * @param {Object} req
 * @param {Object} res
 */
function createTable(req, res) {

  var tableData = R.path(['body'], req);

  try {
    return _createTable(tableData)
      .then(apiUtils.jsonResponseSuccess(req, res))
      .catch(function(err) {
        return apiUtils.jsonResponseError(req, res, R.merge(err, {statusCode : 400}));
      });
  } catch (err) {
    return apiUtils.jsonResponseError(req, res, R.merge(err, {statusCode : 500}));
  }
}

module.exports = createTable;
