'use strict';

var browserSync = require('browser-sync').create(),
  gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  reload = browserSync.reload;

gulp.task('serve',
  [
    'browser-sync'
  ],
  function () {
    gulp.watch('public/**/*.js').on('change', reload);
    gulp.watch('public/style.css').on('change', reload);
    gulp.watch('**/*.html', ['ngtemplate']);
  }
);

gulp.task('browser-sync',
  [
    'nodemon'
  ],
  function() {
    browserSync.init(null, {
      port:8081,
      proxy: {
        target:'http://localhost:8080',
        ws:true
      },
      browser: 'firefox'
    });
  }
);

gulp.task('nodemon',
  [],
  function (done) {
    var called = false;
    console.log(called)
    return nodemon({
      script: 'server.js',
      watch: ['**/*.*']
    })
    .on('start', function () {
      if (!called) {
        done();
        called = true;
      }
    })
    .on('restart', function () {
      setTimeout(function () {
        reload();
      }, 1000);
    });
  }
);