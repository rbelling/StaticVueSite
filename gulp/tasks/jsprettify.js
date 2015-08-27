var config__jsprettify = require('../config').jsprettify;
var jsprettify = require('gulp-js-prettify');


//run jsprettify
var prettifyMyScripts = function() {
return gulp.src(config__jsprettify.jsFiles)
  .pipe(jsprettify())
  .pipe(gulp.dest(config__jsprettify.src));
};