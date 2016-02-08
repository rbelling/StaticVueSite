var config = require('../config').tests;
var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('mocha', function () {
    return gulp.src(config.src+'/mocha.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'nyan'}));
});