'use strict';

var login = function(req, res) {
  res.render('pages/login', {
    user : req.user
  });
};

module.exports = login;
