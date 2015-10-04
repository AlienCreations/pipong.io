'use strict';

var R       = require('ramda'),
    config  = require('config'),
    execsql = require('execsql');

var dbConfig = R.prop('mysql', config),
    useSpecDbSql = 'USE `pipong-test`;',
    sqlFiles = {
      resetTables  : __dirname + '/../../sql/resetTables.sql',
      seedSpecDb   : __dirname + '/../../sql/seedSpecDb.sql'
    };

var mysql;

beforeAll(function() {
  mysql = execsql.config(dbConfig)
});

beforeEach(function(done) {

    mysql.exec(useSpecDbSql, function(err, results) {
      mysql.execFile(sqlFiles.resetTables, function(err, results) {
        mysql.execFile(sqlFiles.seedSpecDb, function(err, results) {
          done();
        });
      });
    });

});

afterAll(function() {
  mysql.end();
});
