const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'cheap-eval-source-map',
  target: 'web',
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[name].chunk.js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: require.resolve('eslint-loader'),
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
          { loader: require.resolve('postcss-loader') },
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
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      verbose: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
