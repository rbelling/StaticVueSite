var gulp         = require('gulp');
var config__jsprettify = require('../config').jsprettify;
var jsprettify = require('gulp-js-prettify');


//run jsprettify
gulp.task('jsprettify', function () {
return gulp.src(config__jsprettify.jsFiles)
  .pipe(jsprettify())
  .pipe(gulp.dest(config__jsprettify.src));
});