const { resolve } = require('path')
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { getIfUtils, removeEmpty } = require('webpack-config-utils')

module.exports = env => {
  const {ifProd, ifNotProd} = getIfUtils(env)
  const config = {
    context: resolve(__dirname, 'src'),
    entry: {
      app: './index.js',
      oauth: './oauth.js'
    },
    output: {
      filename: ifProd('bundle.[name].[chunkhash].js', 'bundle.[name].js'),
      path: resolve('dist'),
      pathinfo: ifNotProd(),
      publicPath: '/'
    },
    resolve: {
      extensions: ['.js', '.scss'],
      alias: {
        config: resolve(__dirname, ifProd('.env.production.js', '.env.js')),
        components: resolve(__dirname, 'src/components'),
        services: resolve(__dirname, 'src/services'),
        state: resolve(__dirname, 'src/state'),
        utils: resolve(__dirname, 'src/utils'),
        views: resolve(__dirname, 'src/views')
      }
    },
    stats: {
      colors: true,
      reasons: true,
      chunks: false
    },
    devtool: ifProd('source-map', 'eval'),
    devServer: {
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'eslint-loader',
          include: resolve('src')
        },
        {
          test: /\.js$/,
          loaders: ['babel-loader'],
          include: resolve('src')
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader'
            }]
          })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader',
              options: {
                modules: true
              }
            }, {
              loader: 'postcss-loader'
            }, {
              loader: 'sass-loader'
            }],
            fallback: 'style-loader'
          })
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loaders: [
            {
              loader: 'file-loader',
              options: {
                query: {
                  hash: 'sha512',
                  digest: 'hex',
                  name: '[hash].[ext]'
                }
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                query: {
                  bypassOnDebug: true,
                  optipng: {
                    optimizationLevel: 7
                  },
                  gifsicle: {
                    interlaced: false
                  }
                }
              }
            }
          ]
        },
        {
          test: /\.(eot|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
          use: 'url-loader'
        }
      ]
    },
    plugins: removeEmpty([
      new ProgressBarPlugin(),
      new ExtractTextPlugin(ifProd('styles.[name].[chunkhash].css', 'styles.[name].css')),
      ifProd(new InlineManifestWebpackPlugin()),
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        names: ['manifest']
      })),
      new HtmlWebpackPlugin({
        title: 'TimeTracker',
        chunks: ['app'],
        template: './index.html',
        filename: './index.html'
      }),
      new HtmlWebpackPlugin({
        title: 'TimeTracker',
        chunks: ['oauth'],
        template: './oauth.html',
        filename: './oauth.html'
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: ifProd('"production"', '"development"')
        }
      })
    ])
  }
  if (env.debug) {
    console.log(config)
    debugger // eslint-disable-line
  }
  return config
}
