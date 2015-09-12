/* jshint -W097 */
'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    del = require('del'),
    concat = require('gulp-concat'),
    RevAll = require('gulp-rev-all');

var paths = {
  js: [   'app/js/app.js',
          'app/js/characters/*.js',
          'app/js/map.js',
          'app/js/game.js' ],
  html:   'app/**/*.html',
  assets: 'app/assets/**',
  libs: [ 'bower_components/phaser/build/phaser.min.js',
          'bower_components/phaser/build/phaser.map' ]
};

gulp.task('clean', function (cb) {
  del([ 'build/**', 'dist/**' ], cb);
});

gulp.task('js', ['clean'], function() {

  return gulp.src(paths.js)
             .pipe(jshint())
             .pipe(jshint.reporter('jshint-stylish'))
             .pipe(jshint.reporter('fail'))
             .pipe(concat('zorp-hungry.js'))
             .pipe(gulp.dest('build/js'));
});

gulp.task('html', ['clean'], function() {

  return gulp.src(paths.html)
             .pipe(gulp.dest('build'));
});

gulp.task('assets', ['clean'], function () {
  return gulp.src(paths.assets)
             .pipe(gulp.dest('build/assets'));
});

gulp.task('vendor', ['clean'], function () {

  return gulp.src(paths.libs)
    .pipe(gulp.dest('build/js/lib'));
});

gulp.task('version', ['js','html','assets','vendor'], function () {

  var revAll = new RevAll({
    dontRenameFile: [ /^\/favicon.ico$/g,
                      /^\/index.html/g,
                      /.map$/g ],
    dontSearchFile: [ 'phaser.min.js',
                      'phaser.map']
  });

  return gulp.src('build/**')
             .pipe(revAll.revision())
             .pipe(gulp.dest('dist'))
             .pipe(connect.reload());
});

gulp.task('watch', function () {

  watch('app/**', function () {
    gulp.start('build');
  });
});

gulp.task('connect', function () {
  connect.server({
    root: 'dist',
    livereload: true
  })
});

gulp.task('build', ['clean','js','html','vendor','version']);

gulp.task('code', ['connect','watch'])

gulp.task('default', ['build']);
