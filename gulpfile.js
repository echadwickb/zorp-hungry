/* jshint -W097 */
'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jsLibs = [ './bower_components/phaser/build/phaser.min.js' ];

gulp.task('lint', function() {

  return gulp.src('./app/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('copyBowerDeps', function () {

  return gulp.src(jsLibs)
    .pipe(gulp.dest('./app/js/lib'));
})

gulp.task('default', ['lint', 'copyBowerDeps' ]);
