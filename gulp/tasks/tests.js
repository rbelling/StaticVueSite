require("babel-core/register");

var config = require('../config').tests;
var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('tests', function() {
    return gulp.src(config.src + '/**/*.js', {
        read: false
    })
    .pipe(mocha({
        reporter: 'nyan',
    }));
});
