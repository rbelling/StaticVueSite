// For instructions about this file refer to
// webpack and webpack-hot-middleware documentation
import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
const stylesheetPath = './src/sass/';

export default {
  debug: true,
  noInfo: true, // set to false to see a list of every file being bundled.
  devtool: 'eval-source-map',
  entry: [
    './src/javascript/page'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: path.join('/'),
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
      hash: true
    })
  ],
  module: {
    loaders: [
      {test: /\.js?$/, exclude: /node_modules/, loader: 'babel'},
      {test: /\.json?$/, exclude: /node_modules/, loader: 'json'},
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file'},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(jpe?g|png|gif)$/i, loader: 'file?name=[name].[ext]'},
      {test: /\.ico$/, loader: 'file?name=[name].[ext]'},
      {test: /(\.css|\.scss|\.sass)$/, loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap', 'sass-resources']},
      {test: /\.pug$/, loader: "pug-loader"}
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, './node_modules')]
  },
  sassResources: [
    //make sure no actual css code is included in the following files, otherwise it's going to be duplicated. Only mixins/vars and alike.
    `${stylesheetPath}base/_variables.scss`, `${stylesheetPath}base/_breakpoints.scss`, `${stylesheetPath}base/_mediaqueries.scss`, `${stylesheetPath}base/_mixins.scss`
  ],
  postcss: () => [autoprefixer]
};
