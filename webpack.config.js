const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const config = {
  context: path.resolve(__dirname, './src'),
  entry: {
    options: './options/index.js',
    popup: './popup/index.js',
    background: './background/index.js',
    'contentScripts/index': './contentScripts/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '.',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.sass$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax'],
      },
      {
        test: /\.styl$/,
        use: ['vue-style-loader', 'css-loader', 'stylus-loader'],
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js',
      bulma$: 'bulma/css/bulma.css',
    },
    // extensions: ['.js'],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(['./dist/', './dist-zip/']),
    new CopyWebpackPlugin([
      { from: 'assets', to: 'assets' },
      { from: 'manifest.json', to: 'manifest.json', flatten: true },
    ]),
    new HtmlWebpackPlugin({
      title: 'Options',
      template: './index.html',
      inject: true,
      chunks: ['manifest', 'vendor', 'options'],
      filename: 'options.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Popup',
      template: './index.html',
      inject: true,
      chunks: ['manifest', 'vendor', 'popup'],
      filename: 'popup.html',
    }),
  ],
}

if (process.env.NODE_ENV !== 'production') {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new ChromeExtensionReloader({
      entries: {
        background: 'background',
        options: 'options',
        popup: 'popup',
        contentScripts: 'contentScripts/index',
      },
    })
  )
}

module.exports = config
