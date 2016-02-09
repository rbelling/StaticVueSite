//images moves images copies images from a source folder, performs optimizations, the outputs them into the build folder
var changed    = require('gulp-changed');
var gulp       = require('gulp');
var tinypng = require('gulp-tinypng');
var config     = require('../config').images;
var browserSync  = require('browser-sync');

//var apiKey = 'n7bmyTU6YEsODvyn6pi9RzBHWzP2Oz8r'; //riccardo.bellingeri@gmail.com
var apiKey = 'VvmMec1xcExMlXTF1MNVb7Ss4S-r5RH4'; //riccardo.bellingeri@firstborn.com

gulp.task('images', function() {
  return gulp.src(config.src)
    .pipe(changed(config.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('minifyImages', function() {
  return gulp.src(config.src)
    .pipe(changed(config.dest)) // Ignore unchanged files
    .pipe(tinypng(apiKey))
    .pipe(gulp.dest(config.dest));
});


//var imagemin   = require('gulp-imagemin');
//var optipng = require('imagemin-optipng');
//var imageminPngquant = require('imagemin-pngquant');
//var imageminPngcrush = require('imagemin-pngcrush');

//gulp.task('minifyImages', function() {
//  return gulp.src(config.src)
//    .pipe(changed(config.dest)) // Ignore unchanged files
//    .pipe(imagemin({
//      progressive: true,
//      svgoPlugins: [{removeViewBox: false}],
//      use: [optipng({optimizationLevel: 3})],
//      // use: [imageminPngcrush({reduce: true})],
//      // use: [imageminPngquant({quality: '65-80', speed: 4})], //lossy
//    })) // Optimize
//    .pipe(gulp.dest(config.dest))
//    .pipe(browserSync.reload({stream:true}));
//});
