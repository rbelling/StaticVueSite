//https://www.npmjs.com/package/sprity
var fs  = require('fs');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var sprity = require('sprity');
var config = require('../config').sprite;
var fileExtension = '{png,jpg,jpeg}';
var _ = require('lodash');

// generate sprite.png and _sprite.scss


gulp.task('sprite', function () {
  var _imgs = fs.readdirSync(config.src+config.path);
  var _imgs = _.difference(_imgs, ['.DS_Store']);
  var _imgs = _.map(_imgs, function(n){
    return config.src+config.path+'/'+n;
  });
  return sprity.src({
    // src: config.src+config.path+'/*.'+fileExtension,
    src: _imgs,
    style: config.cssName,
    // ... other optional options
    // for example if you want to generate scss instead of css
    processor: 'sass', // make sure you have installed sprity-sass,
    orientation: 'horizontal',
    sort: false,
    margin: 0
  })
  .pipe(gulpif('*.'+fileExtension, gulp.dest(config.destPath), gulp.dest(config.cssPath)));
  // .pipe(gulpif('*.png', gulp.dest('./dist/img/'), gulp.dest('./dist/css/')))
});
