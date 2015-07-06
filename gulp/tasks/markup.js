//markup is including and precompiling templates, and then minifying html.

var gulp = require('gulp');
var config = require('../config').markup;
var browserSync  = require('browser-sync');
var minifyHTML = require('gulp-minify-html');

var minifyOptions = {
      empty: true,        // KEEP empty attributes
      cdata: false,        // KEEP CDATA from scripts
      comments: false,     // KEEP comments
      ssi: false,          // KEEP Server Side Includes
      conditionals: true, // KEEP conditional internet explorer comments
      spare: false,        // KEEP redundant attributes
      quotes: true,       // KEEP arbitrary quotes
      loose: false         // KEEP one whitespace
}

console.log(browserSync.reload({stream:true}));

gulp.task('markup', ['templates'], function() {
  return gulp.src(config.src)
    .pipe(minifyHTML(minifyOptions))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});