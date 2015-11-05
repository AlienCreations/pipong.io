'use strict';

var express  = require('express'),
    passport = require('passport'),
    router   = express.Router();

var allowCors = require('../../middleware/allowCors');

var getPlayersByTableShortCode = require('../../controllers/api/player/getPlayersByTableShortCode');

// http://www.pipong.io/api/v1/table/players/code/17daf4
router.get('/players/code/:code', allowCors, getPlayersByTableShortCode);

module.exports = router;
