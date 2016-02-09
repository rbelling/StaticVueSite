//markup is including and precompiling templates, and then minifying html.

var gulp = require('gulp');
var config = require('../config').markup;
var browserSync  = require('browser-sync');
var htmlmin = require('gulp-htmlmin');

var minifyOptions = {
      removeComments: true,     // REMOVE comments
      removeRedundantAttributes: true,        // REMOVE redundant attributes
      removeAttributeQuotes: true,
      collapseWhitespace: true
};

gulp.task('markup', ['templates'], function() {
  return gulp.src(config.src)
    .pipe(htmlmin(minifyOptions))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
