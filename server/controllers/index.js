'use strict';

var R = require('ramda');

var index = function(req, res) {

  var dataForJade = {};

  console.log('user = ', req.user);

  if (req.user) {
    dataForJade.sessionUser = R.defaultTo('', JSON.stringify(req.user));
  }

  res.render('layout', dataForJade);
};

module.exports = index;
