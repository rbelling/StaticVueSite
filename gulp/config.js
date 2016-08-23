var dest = './build';
var src = './src';
var templateData = require('./data/template');
module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dest
    },
    ghostMode: false,
    browser: ["chrome"]
  },
  sass: {
    src: src + '/sass/',
    sassFiles: src + '/sass/**/*.{sass,scss}',
    dest: dest,
    settings: {
      indentedSyntax: true, // Enable .sass syntax!
      imagePath: 'images', // Used by the image-url helper
    },
  },
  images: {
    src: src + '/images/**/*.{gif,jpg,png,svg,jpeg}',
    dest: dest + '/images',
  },
  markup: {
    src: src + '/htdocs/**',
    dest: dest,
  },
  app: {
    breakpoints: {
      small: 414,
      medium: 1024,
      large: 1600,
    }
  },
  criticalPath: {
      // Inline the generated critical-path CSS
      // - true generates HTML
      // - false generates CSS
    inline: true,

      // Your base directory
    base: dest,

      // HTML source
    html: '<html>...</html>',

      // HTML source file
    src: 'index.html',

      // Your CSS Files (optional)
    css: [dest + '/app.css'],

      // Viewport width
    width: 1600,

      // Viewport height
    height: 1024,

      // Target for final HTML output.
      // use some css file when the inline option is not set
    //dest: dest+'/index-critical.html',

      // Minify critical-path CSS when inlining
    minify: true,

      // Extract inlined styles from referenced stylesheets
      // extract: true,

       //Prefix for asset directory
       pathPrefix: '.',

      // ignore css rules
      // ignore: ['font-face',/some-regexp/],

      // overwrite default options
    ignoreOptions: {},
  },
  templates: {
    baseFolder: src + '/templates/**/*',
    src: src + '/templates/base/',
    dest: src + '/htdocs/',
    templateExtension: '.handlebars',
    myPage: 'index', //'styleguide' //the entry point page: this file includes other templates
    templateData: templateData,
    templateOptions: {
      //https://www.npmjs.com/package/gulp-compile-handlebars
      ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
      partials: {
        footer: '<footer>the end</footer>'
      },
      batch: [src + '/templates/partials/'],
      helpers: {
        capitals: function (str) {
          return str.toUpperCase();
        },
      },
    },
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      delay: 0,
      entries: src + '/javascript/page.js',
      dest: dest,
      outputName: 'page.js',
      // list of modules to make require-able externally
      // require: ['npm-zepto', 'lodash'],
      // list of externally available modules to exclude from the bundle
      // external: ['underscore']
    }, {
      delay: 0,
      entries: src + '/javascript/critical.js',
      dest: dest,
      outputName: 'critical.js',
      // list of modules to make require-able externally
      // require: ['jquery'],
    }],
  },
  production: {
    cssSrc: dest + '/*.css',
    jsSrc: dest + '/*.js',
    dest: dest,
  },
  tests: {
    src: src + '/tests',
  },
  //sprite: {
  //  src: src,
  //  dest: dest,
  //  path: '/sprite/dew_green_can',
  //  cssPath: src + '/sass/modules/sprite/',
  //  cssName: './_green.scss',
  //  destPath: src + '/images/modules/sprite-green',
  //},

};
