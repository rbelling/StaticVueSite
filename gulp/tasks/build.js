var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);

// Run this to compress all the things!
gulp.task('build', function () {
  runSequence(
    'env',
    ['images', 'minifyCss', 'uglifyJs', 'markup'],
    'criticalPath'
  );
});
