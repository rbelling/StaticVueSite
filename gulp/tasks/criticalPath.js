// https://github.com/addyosmani/critical
var critical = require('critical').stream;
var gulp = require('gulp');
var config = require('../config').criticalPath;


gulp.task('criticalPath', function () {
	gulp.src(config.base+'/*.html')
		.pipe(critical(config))
        .pipe(gulp.dest(config.base));
});