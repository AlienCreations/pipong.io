'use strict';

/**
 * Ensure the req.user has a session, and if not, send to login page.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns {*}
 */
var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/auth/login')
  }
};

module.exports = ensureAuthenticated;
