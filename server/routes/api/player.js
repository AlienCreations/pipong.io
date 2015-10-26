'use strict';

var express  = require('express'),
    passport = require('passport'),
    router   = express.Router();

var corsAllowedMiddleware         = require('../../middleware/corsAllowed'),
    ensureAuthenticatedMiddleware = require('../../middleware/ensureAuthenticated');

var createPlayerCtrl     = require('../../controllers/api/player/createPlayer'),
    getPlayerByEmailCtrl = require('../../controllers/api/player/getPlayerByEmail'),
    getPlayerByIdCtrl    = require('../../controllers/api/player/getPlayerById'),
    updatePlayerCtrl     = require('../../controllers/api/player/updatePlayer');

// http://www.pipong.io/api/player
router.get('/create', ensureAuthenticatedMiddleware, createPlayerCtrl);

router.post('/', corsAllowedMiddleware, createPlayerCtrl);
router.put('/',  corsAllowedMiddleware, updatePlayerCtrl);

// http://www.pipong.io/api/player/email/test@test.com
router.get('/email/:email', corsAllowedMiddleware, getPlayerByEmailCtrl);

// http://www.pipong.io/api/player/id/23
router.get('/id/:id', corsAllowedMiddleware, getPlayerByIdCtrl);

module.exports = router;
