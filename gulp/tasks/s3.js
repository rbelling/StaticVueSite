var gulp = require('gulp');
var config = require('../config').aws;
// var s3 = require("gulp-s3");
var awspublish = require('gulp-awspublish'); 
var fs = require('fs');
var argv = require('yargs').argv;

var options = { headers: {'Cache-Control': 'max-age=0, no-transform, public'}};
var credentials = JSON.parse(fs.readFileSync('./gulp/data/aws_stage.json'));
var publisher = awspublish.create(credentials);
var _toDeploy = [
	config.dest+'/**/*',
];

gulp.task('s3', function () {
	return gulp.src(_toDeploy)	  
	  .pipe(publisher.publish(options.headers))
	  .pipe(publisher.sync())
	  .pipe(awspublish.reporter());
});
