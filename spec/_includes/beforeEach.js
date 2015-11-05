'use strict';

var resetAndSeedTables = require(__dirname + '/../_helpers/db/resetAndSeedTables');

beforeEach(function(done) {

  jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

  resetAndSeedTables('pipongDb')
    //.then(resetAndSeedTables.bind(null, 'anotherDb'))
    .then(done);
});
