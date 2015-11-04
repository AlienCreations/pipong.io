/*jslint node: true */
'use strict';

var express = require('express'),
    router  = express.Router();

var indexCtrl           = require('../controllers/index'),
    ensureAuthenticated = require('../middleware/ensureAuthenticated');

router.get('/',                  indexCtrl);
router.get('/me',                ensureAuthenticated, indexCtrl);
router.get('/profile',           ensureAuthenticated, indexCtrl);
router.get('/profile/:playerId', indexCtrl);

module.exports = router;
