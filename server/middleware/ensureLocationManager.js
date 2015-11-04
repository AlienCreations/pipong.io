'use strict';

var R        = require('ramda'),
    apiUtils = require('alien-node-api-utils');

var checkPlayerIsLocationManager = require('../models/player/methods/checkPlayerIsLocationManager');

var ensureLocationManager = function(req, res, next) {
  var locationId = R.path(['params', 'id'], req),
      playerId   = R.path(['user',   'id'], req);

  checkPlayerIsLocationManager({
    playerId   : parseInt(playerId, 10),
    locationId : parseInt(locationId, 10)
  }).then(function() {
    next();
  }).catch(function(err) {
    apiUtils.jsonResponseError(req, res, R.merge(err, {statusCode : 401}));
  });

};

module.exports = ensureLocationManager;
