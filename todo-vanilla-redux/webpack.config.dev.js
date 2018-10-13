const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'cheap-eval-source-map',
  target: 'web',
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  devServer: {
    host: '127.0.0.1',
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
    compress: true,
    port: 8000,
    inline: true,
    hot: true,
    historyApiFallback: true,
    overlay: true,
    watchOptions: {
      poll: true,
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: require.resolve('eslint-loader'),
        options: {
          formatter: require.resolve('eslint-friendly-formatter'),
          emitWarning: true,
          quiet: true,
        },
      },
      {
        test: /\.js$/,
        loader: require.resolve('babel-loader'),
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          { loader: require.resolve('style-loader') },
          { loader: require.resolve('css-loader') },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require.resolve('postcss-flexbugs-fixes'),
                require.resolve('postcss-preset-env')({
                  autoprefixer: {
                    flexbox: 'no-2009',
                  },
                  stage: 3,
                }),
              ],
            },
          },
          { loader: require.resolve('sass-loader') },
        ],
      },
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: '/assets/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/assets/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new CleanWebpackPlugin(['dist'], {
      verbose: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
