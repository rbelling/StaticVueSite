var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);

gulp.task('default', 
	gulpsync.sync(
	    // sync
	    [
	        // async
	        ['sass', 'images', 'watch', 'markup'],
	    ]
	)
);


