'use strict';

var R        = require('ramda'),
    apiUtils = require('alien-node-api-utils'),

    // TODO this--
    logUtils = require('alien-node-winston-utils');

var _createPlayer = require('../../../models/player/methods/createPlayer');

/**
 * Create a player in MySQL
 * @param {Object} req
 * @param {Object} res
 */
function createPlayer(req, res) {

  var playerData = R.path(['user'], req);

  try {
    return _createPlayer(playerData)
      .then(apiUtils.jsonResponseSuccess(req, res))
      .catch(function(err) {
        return apiUtils.jsonResponseError(req, res, R.merge(err, {statusCode : 400}));
      });
  } catch (err) {
    return apiUtils.jsonResponseError(req, res, R.merge(err, {statusCode : 500}));
  }
}

module.exports = createPlayer;
