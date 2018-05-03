'use strict';

var gulp = require('gulp'),
  wrench = require('wrench');

wrench
  .readdirSyncRecursive('./gulp_tasks')
  .filter(function(file) {
    return (/\.(js)$/i).test(file);
  })
  .map(function(file) {
    require('./gulp_tasks/' + file);
  });

gulp.task('default', ['serve']);