/*jslint node: true */
'use strict';

var express = require('express'),
    router  = express.Router();

var indexCtrl = require('../controllers/index');

//
//router.get('/pages/:name', function(req, res) {
//  console.log('here with ', req.params.name);
//  res.render('pages/' + req.params.name, req.params);
//});
//
//router.get('/partials/:dir/:name', function(req, res) {
//  console.log('here with ', req.params.name);
//
//  res.render('partials/' + req.params.dir + '/' + req.params.name, req.params);
//});
//
//router.get('/partials/:name', function(req, res) {
//  res.render('partials/' + req.params.name, req.params);
//});

router.get('/', indexCtrl);

module.exports = router;
