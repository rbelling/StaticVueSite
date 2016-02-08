//watch has watchify as a dependency, which will run the browserifyTask with a devMode flag that enables sourcemaps and watchify, a browserify add-on that enables caching for super fast recompiling. The task itself starts watching source files and will re-run the appropriate tasks when those files change.
/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp     = require('gulp');
var config   = require('../config');

gulp.task('watch', ['watchify', 'browserSync'], function() {
  gulp.watch(config.sass.sassFiles,   ['sass']);
  gulp.watch(config.images.src, ['images']);
  gulp.watch(config.templates.baseFolder, ['markup']);
  // Watchify will watch and recompile our JS, so no need to gulp.watch it
});
