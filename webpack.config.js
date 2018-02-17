const webpack = require('webpack')
const WebpackShellPlugin = require('webpack-shell-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = {
  context: `${__dirname}/src`,
  entry: {
    background: './background',
    options: './options',
    popup: './popup',
    contentScripts: './contentScripts'
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name]/index.js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loaders: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?emitFile=false'
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'assets', to: 'assets' },
      { from: 'options/index.html', to: 'options/index.html' },
      { from: 'popup/index.html', to: 'popup/index.html' },
      { from: 'manifest.json', to: 'manifest.json' }
    ]),
    new WebpackShellPlugin({
      onBuildEnd: ['node scripts/remove-evals.js']
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.devtool = false

  config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJsPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
} else {
  config.plugins = (config.plugins || []).concat([
    new ChromeExtensionReloader({
      entries: {
        background: 'background',
        options: 'options',
        popup: 'popup',
        contentScripts: 'contentScripts'
      }
    })
  ])
}

module.exports = config
