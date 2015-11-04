'use strict';

var R            = require('ramda'),
    jsonwebtoken = require('jsonwebtoken');

var authUtils     = require('../utils/auth'),
    getAgentByAud = require('../models/agent/methods/getAgentByAud');

var AGENT_ID_PROPERTY              = 'aud',
    AGENT_SECRET_PROPERTY          = 'secret',
    RESPONSE_MESSAGE_INVALID_TOKEN = 'JWT could not be validated',
    RESPONSE_MESSAGE_UNKNOWN_AGENT = 'Unknown agent';

/**
 * This middleware will check if the request object has an `authorization`
 * header with the value "Bearer {token}". The middleware will decode the token
 * and attempt to extract the client ID from the token using the "aud"
 * property on the JWT.
 *
 * Once the secret validates the JWT we jump out of middleware and
 * continue with the route flow. If the verification fails, we 401.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
function ensureJwt(req, res, next) {
  var token   = authUtils.getTokenFromHeaderOrQueryString(req),
      decoded = jsonwebtoken.decode(token);

  getAgentByAud(R.prop(AGENT_ID_PROPERTY, decoded))
    .then(function(agent) {

      // TODO Might need to urlBase64Encode the agent secret here
      jsonwebtoken.verify(token, R.prop(AGENT_SECRET_PROPERTY, agent), function(err, signed) {
        if (err) {
          res.send(401, R.defaultTo(RESPONSE_MESSAGE_INVALID_TOKEN, R.prop('message', err)));
        } else {
          next();
        }
      });
    })
    .catch(function() {
      res.send(401, RESPONSE_MESSAGE_UNKNOWN_AGENT);
    });
}

module.exports = ensureJwt;
