'use strict';

var R       = require('ramda'),
    Q       = require('q'),
    config  = require('config'),
    execsql = require('execsql');

var resetAndSeedDb = function(db) {
  var deferred = Q.defer(),
      con      = execsql.config(R.path(['mysql', db], config));

  con.execFile(__dirname + '/../../../sql/test/' + db + '.createDatabase.sql', function() {
    con.execFile(__dirname + '/../../../sql/test/' + db + '.resetTables.sql', function() {
      con.execFile(__dirname + '/../../../sql/test/' + db + '.seedTables.sql', function() {
        con.end();
        deferred.resolve();
      });
    });
  });

  return deferred.promise;
};

module.exports = resetAndSeedDb;
