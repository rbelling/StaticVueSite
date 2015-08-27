var gulp      = require('gulp');
var config    = require('../config').sass;
var cssComb = require('gulp-csscomb');
var plumber = require('gulp-plumber');

gulp.task('csscomb', function() {
	console.log('Running cssComb..');
  return gulp.src(config.sassFiles)
    .pipe(plumber())
  	.pipe(cssComb())
    .pipe(gulp.dest(config.src));
});