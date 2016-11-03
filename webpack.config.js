// For instructions about this file refer to
// webpack and webpack-hot-middleware documentation
import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';

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
    publicPath: '/',
    filename: './page.js'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file'},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
      {test: /\.(jpe?g|png|gif)$/i, loader: 'file?name=[name].[ext]'},
      {test: /\.ico$/, loader: 'file?name=[name].[ext]'},
      // {test: /(\.css|\.scss)$/, loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap', 'sass-resources']},
      {test: /\.hbs$/, loader: "handlebars-loader"}
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, './node_modules')]
  },
  sassResources: [
    //make sure no actual css code is included in the following files, otherwise it's going to be duplicated. Only mixins/vars and alike.
    `${stylesheetPath}base/resources/_variables.scss`, `${stylesheetPath}base/resources/_breakpoints.scss`, `${stylesheetPath}base/resources/_mediaqueries.scss`, `${stylesheetPath}base/resources/_mixins.scss`
  ],
  postcss: () => [autoprefixer]
};
