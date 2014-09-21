var _ = require('lodash');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var karma = require('karma').server;
var karmaConfig = require('./karma.conf.js');

gulp.task('default', ['jshint', 'test']);

gulp.task('jshint', function () {
  return gulp.src('src/**/*.js').
    pipe(jshint()).
    pipe(jshint.reporter('jshint-stylish')).
    pipe(jshint.reporter('fail'));
});

gulp.task('test', ['jshint'], function (done) {
  var customOpts = { singleRun: true };
  karma.start(_.extend(karmaConfig, customOpts), done);
});

gulp.task('develop', function () {
  karma.start(karmaConfig);
});
