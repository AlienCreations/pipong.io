'use strict';

var express  = require('express'),
    passport = require('passport'),
    router   = express.Router();

var allowCors = require('../../middleware/allowCors');

var getPlayersByTableCode = require('../../controllers/api/player/getPlayersByTableCode');

// http://www.pipong.io/api/v1/table/players/code/7daf44e9238cbd7bad15b672f559d5d6
router.get('/players/code/:code', allowCors, getPlayersByTableCode);

module.exports = router;
