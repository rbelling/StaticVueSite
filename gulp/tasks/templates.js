//templates is compiling .handlebars partials and creating the main html
//The main html is copied into the src/htdocs folder, to be further processed by other gulp tasks.
//https://www.npmjs.com/package/gulp-compile-handlebars

var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var config = require('../config').templates;
var browserSync  = require('browser-sync');

gulp.task('templates', function () {
    var templateData = config.templateData;
    var templateOptions = config.templateOptions;
    
    return gulp.src(config.src + config.myPage + config.templateExtension)
        .pipe(handlebars(templateData, templateOptions))
        .pipe(rename(config.myPage+'.html'))
        .pipe(gulp.dest(config.dest));
});