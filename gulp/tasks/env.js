//this task sets the right env variables depending on the target environment

var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);
var argv = require('yargs').argv;
var preprocess = require('gulp-preprocess');
var rename = require('gulp-rename');

/*----------  File location  ----------*/
var _root = './gulp/data/';
var envCss = _root+'env/CSSVARIABLES.scss';
var envJs = _root+'env/JSVARIABLES.js';



var envVars = {};
var setVariables = function() {
  envVars = {
    NODE_ENV: 'local'
  };
  if (argv.stage) {
    envVars = {
      NODE_ENV: 'stage'
    };
  } else if (argv.prod) {
    envVars = {
      NODE_ENV: 'prod'
    }
  };
};

gulp.task('env', function() {
  runSequence(
    'env_css',
    'env_javascript'
  );
});

gulp.task('env_css', function() {
  setVariables();
  return gulp.src(envCss)
    .pipe(preprocess({
      context: envVars
    }))
    .pipe(rename('_env.scss'))
    .pipe(gulp.dest('./src/sass/base'));
});

gulp.task('env_javascript', function() {
  setVariables();
  return gulp.src(envJs)
    .pipe(preprocess({
      context: envVars
    }))
    .pipe(rename('envVars.js'))
    .pipe(gulp.dest(_root));
});
