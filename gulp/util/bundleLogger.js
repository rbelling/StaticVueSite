/* bundleLogger
   ------------
   Provides gulp style logs to the bundle method in browserify.js
*/

var gutil        = require('gulp-util');
var prettyHrtime = require('pretty-hrtime');
var startTime;

module.exports = {
  start: function(filepath) {
    startTime = process.hrtime();
    gutil.log('Bundling', gutil.colors.green(filepath) + '...');
  },
  promise: function(status, msg) {
    time = process.hrtime();
    if (status) {
      gutil.log('Promise succeeded: ', gutil.colors.green(msg) + '...');      
    }
    else {
      gutil.log('Promise failed: ', gutil.colors.red(msg) + '...');      
    }
  },
  watch: function(bundleName) {
    gutil.log('Watching files required by', gutil.colors.yellow(bundleName));
  },

  end: function(filepath) {
    var taskTime = process.hrtime(startTime);
    var prettyTime = prettyHrtime(taskTime);
    gutil.log('Bundled', gutil.colors.green(filepath), 'in', gutil.colors.magenta(prettyTime));
  },
  error: function(msg) {
    var taskTime = process.hrtime(startTime);
    var prettyTime = prettyHrtime(taskTime);
    gutil.log('ERROR:', gutil.colors.red(msg), 'in', gutil.colors.magenta(prettyTime));    
  }
};
