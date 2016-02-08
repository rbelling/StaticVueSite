var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);

gulp.task('default', function () {
  runSequence(
    'env',
    // async
    ['sass', 'images', 'watch', 'markup'],
    'criticalPath'
  );
});


