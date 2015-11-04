'use strict';

var express  = require('express'),
    passport = require('passport'),
    router   = express.Router();

var allowCors           = require('../../middleware/allowCors'),
    ensureAuthenticated = require('../../middleware/ensureAuthenticated');

var createPlayerCtrl     = require('../../controllers/api/player/createPlayer'),
    getPlayerByEmailCtrl = require('../../controllers/api/player/getPlayerByEmail'),
    getPlayerByIdCtrl    = require('../../controllers/api/player/getPlayerById'),
    updatePlayerCtrl     = require('../../controllers/api/player/updatePlayer');

// http://www.pipong.io/api/v1/player
router.get('/create', ensureAuthenticated, createPlayerCtrl);

router.post('/', allowCors, createPlayerCtrl);
router.put('/',  allowCors, updatePlayerCtrl);

// http://www.pipong.io/api/v1/player/email/test@test.com
router.get('/email/:email', allowCors, getPlayerByEmailCtrl);

// http://www.pipong.io/api/v1/player/id/23
router.get('/id/:id', allowCors, getPlayerByIdCtrl);

module.exports = router;
