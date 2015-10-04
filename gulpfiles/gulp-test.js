'use strict';

var gulp    = require('gulp');
var shell   = require('gulp-shell');
var argv    = require('yargs').argv;


gulp.task('jasmine', shell.task(['./node_modules/.bin/jasmine --junitreport --forceexit']));
