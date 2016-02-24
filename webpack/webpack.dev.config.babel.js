import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

export default {
  context: path.resolve(__dirname, '..'),
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    './src/main.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    root: path.resolve( __dirname, '..', 'src' ),
    alias: {
      'Container': 'utils/Container'
    },
    extensions: [
      '',
      '.js',
      '.jsx',
      '.json'
    ]
  },
  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.html?$/,
        exclude: /node_modules/,
        loader: 'html'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /node_modules/,
        loader: 'ify'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(ttf|otf|eot|woff|woff2|svg)$/,
        loader: 'url?limit=100000'
      },
      { test: /\.(glsl|frag|vert)$/,
        loader: 'raw!glslify',
        exclude: /node_modules/
      },
      {
        test: /splitText\.js$/,
        loader: 'imports?define=>false!exports?SplitText'
      }
    ],
    postLoaders: [
      {
        test: /\.js$/,
        loader: 'ify'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/template/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__DEV__': JSON.stringify(true),
      '__PROD__': JSON.stringify(false)
    }),
    new webpack.ProvidePlugin({
      'TweenMax': 'gsap',
      'THREE': 'three',
      'Vue': 'vue'
    }),
    new CopyWebpackPlugin([
      { from: 'static' }
    ],
    { ignore: ['.DS_Store', '.keep'] })
  ]
};