// For instructions about this file refer to
// webpack and webpack-hot-middleware documentation
import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StyleExtHtmlWebpackPlugin from 'style-ext-html-webpack-plugin';

const stylesheetPath = './src/sass/';
const PATHS = {
  dist: path.join(__dirname, 'dist'),
  images: path.join(__dirname, 'src', 'images')
};

export default {
  debug: true,
  noInfo: true, // set to false to see a list of every file being bundled.
  chunks: false, //add chunk information (setting this to false allows for a less verbose output)
  devtool: 'cheap-source-map',
  entry: [
    path.join(__dirname, 'src', 'javascript', 'page.js')
  ],
  output: {
    path: PATHS.dist,
    filename: path.join('javascript', 'page.js')
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
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.(jpe?g|png|gif|svg)$/i, loaders: [ 'file?name=[name].[ext]', ], include: PATHS.images},
      {test: /\.ico$/, loader: 'file?name=[name].[ext]'},
      {test: /(\.css|\.scss|\.sass)$/, loaders: [StyleExtHtmlWebpackPlugin.inline(), 'postcss', 'sass?sourceMap', 'sass-resources']},
      // {test: /\.critical(\.css|\.scss|\.sass)$/, loaders: [StyleExtHtmlWebpackPlugin.inline(), 'css?sourceMap', 'postcss', 'sass?sourceMap', 'sass-resources']},
      {test: /\.pug$/, loader: "pug-loader"}
    ],
    noParse: ['./src/javascript/vendor'] // matches project folder name
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, './node_modules')]
  },
  sassResources: [
    // make sure no actual css code is included in the following files, otherwise it's going to be duplicated. Only mixins/vars and alike.
    `${stylesheetPath}resources/*.scss`
  ],
  postcss: () => [autoprefixer]
};
