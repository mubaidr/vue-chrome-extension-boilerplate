const path = require('path')
const webpack = require('webpack')
const WebpackShellPlugin = require('webpack-shell-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader')

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    background: './background/index.js',
    options: './options/index.js',
    popup: './popup/index.js',
    contentScripts: './contentScripts/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name]/index.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js'
    },
    extensions: ['.js']
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
  module.exports.devtool = '#source-map'

  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
} else {
  module.exports.plugins = (module.exports.plugins || []).concat([
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
