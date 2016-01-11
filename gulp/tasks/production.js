var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);

// Run this to compress all the things!
gulp.task('production', gulpsync.sync(
    // sync
    [
        // async
        ['images', 'minifyCss', 'uglifyJs'],
        'markup',
	    'criticalPath',
    ]
));

