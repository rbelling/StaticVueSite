//templates is compiling .handlebars partials and creating the main html
//The main html is copied into the src/htdocs folder, to be further processed by other gulp tasks.
//https://www.npmjs.com/package/gulp-compile-handlebars
var _ = require('lodash');
var gulp = require('gulp');
var compileHandlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var config = require('../config').templates;
var browserSync  = require('browser-sync');
var argv = require('yargs').argv;
var envVars = require('../data/envVars.js');
var templateData = _.merge({}, config.templateData,
  {
    assetFolder: envVars.assetFolder
  }
);

var templateOptions = config.templateOptions;
gulp.task('templates', function () {
  return gulp.src(config.src + config.myPage + config.templateExtension)
    .pipe(compileHandlebars(templateData, templateOptions))
    .pipe(rename(config.myPage+'.html'))
    .pipe(gulp.dest(config.dest));
});

//DEFINE YOUR HELPERS HERE
compileHandlebars.Handlebars.registerHelper("foreach",function(arr,options) {
  // http://stackoverflow.com/questions/11479094/conditional-on-last-item-in-array-using-handlebars-js-template
  if(options.inverse && !arr.length)
    return options.inverse(this);

  return arr.map(function(item,index) {
    item.$index = index;
    item.$first = index === 0;
    item.$last  = index === arr.length-1;
    return options.fn(item);
  }).join('');
});
