// For instructions about this file refer to
// webpack and webpack-hot-middleware documentation
import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';
import {merge} from 'lodash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StyleExtHtmlWebpackPlugin from 'style-ext-html-webpack-plugin';

const stylesheetPath = './src/sass/';
const assetsFolder = path.join('assets');
const PATHS = {
  dist: path.join(__dirname, 'dist'),
  output: path.join(assetsFolder, 'page.js')
};

const devConfig = {
  debug: true,
  noInfo: true, // set to false to see a list of every file being bundled.
  chunks: false, //add chunk information (setting this to false allows for a less verbose output)
  devtool: 'cheap-source-map',
  entry: [
    path.join(__dirname, 'src', 'javascript', 'page.js')
  ],
  output: {
    path: PATHS.dist,
    filename: PATHS.output
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      // https://www.npmjs.com/package/html-webpack-plugin
      template: 'src/templates/index.pug',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: 'body',
      hash: true,
      cache: false //we need to turn cache off if we want to use hmr on StyleExtHtmlWebpackPlugin
    }),
    new StyleExtHtmlWebpackPlugin({
      minify: true
    })
  ],
  module: {
    loaders: [
      {test: /\.js?$/, exclude: /node_modules/, loader: 'babel'},
      {test: /\.json?$/, exclude: /node_modules/, loader: 'json'},
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file'},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: `url?limit=10000&mimetype=application/octet-stream&name=${assetsFolder}/[name].[ext]`},
      {test: /\.ico$/, loader: 'file?name=[name].[ext]'},
      {test: /\.(jpe?g|png|gif|svg)$/i, loaders: [`url?limit=30000&name=${assetsFolder}/[name].[ext]`, 'img?progressive=true']},
      {test: /(\.css|\.scss|\.sass)$/, loaders: ['style', 'css', 'postcss', 'resolve-url', 'sass?sourceMap', 'sass-resources'],
        exclude: /critical.scss/
      },
      {test: /critical.scss$/, loaders: [StyleExtHtmlWebpackPlugin.inline(), 'postcss', 'resolve-url', 'sass?sourceMap', 'sass-resources']},
      {test: /\.pug$/, loader: "pug-loader"}
    ],
    noParse: ['./src/javascript/vendor'] // matches project folder name
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, 'node_modules')]
  },
  sassResources: [
    // make sure no actual css code is included in the following files, otherwise it's going to be duplicated. Only mixins/vars and alike.
    `${stylesheetPath}resources/*.scss`
  ],
  postcss: () => [autoprefixer]
};

// Detect how npm is run and branch based on that
let config;
switch (process.env.npm_lifecycle_event) {
  case 'build':
    config = merge({}, devConfig, {
      output: {
        publicPath: '/', //The publicPath specifies the public URL address of the output files when referenced in a browser
      }
    });
    break;
  case 'prod':
    config = merge({}, devConfig, {
      output: {
        publicPath: 'https://mycdnurl.com', //The publicPath specifies the public URL address of the output files when referenced in a browser
      }
    });
    break;
  default:
    config = devConfig;
}

export default config;
