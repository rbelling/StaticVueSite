var gulp = require('gulp');
var config = require('../config').sass;
var cssComb = require('gulp-csscomb');

gulp.task('csscomb', function() {
  return gulp.src(config.sassFiles)
    .pipe(cssComb())
    .pipe(gulp.dest(config.src));
});
