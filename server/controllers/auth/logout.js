'use strict';

var logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

module.exports = logout;
