'use strict';

var express  = require('express'),
    passport = require('passport'),
    router   = express.Router();

var ensureLocationManager = require('../../middleware/ensureLocationManager'),
    allowCors             = require('../../middleware/allowCors'),
    ensureAuthenticated   = require('../../middleware/ensureAuthenticated');

var getLocationById  = require('../../controllers/api/location/getLocationById'),
    getLocationByUri = require('../../controllers/api/location/getLocationByUri'),
    createLocation   = require('../../controllers/api/location/createLocation'),
    updateLocation   = require('../../controllers/api/location/updateLocation'),
    deleteLocation   = require('../../controllers/api/location/deleteLocation');

// http://www.pipong.io/api/v1/location/id/1
router.get('/id/:id',
  allowCors,
  ensureAuthenticated,
  ensureLocationManager,
  getLocationById
);

//router.delete('/id/:id',
router.get('/delete/id/:id',
  allowCors,
  ensureAuthenticated,
  ensureLocationManager,
  deleteLocation
);

// http://www.pipong.io/api/v1/location/uri/presence
router.get('/uri/:uri',
  allowCors,
  ensureAuthenticated,
  ensureLocationManager,
  getLocationByUri
);

// http://www.pipong.io/api/v1/location
router.post('/',
  allowCors,
  ensureAuthenticated,
  createLocation
);
router.put('/',
  allowCors,
  ensureAuthenticated,
  ensureLocationManager,
  updateLocation
);

module.exports = router;
