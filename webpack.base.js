/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractCSS = new ExtractTextPlugin({ filename: 'bundle.css' });

module.exports = options => ({
  devtool: options.devtool,
  entry: ['babel-polyfill', './app/index.js'],
  output: {
    filename: './bundle.js',
    path: path.join(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../app'),
        use: ['babel-loader'],
      },
      {
        test: /\.s?css$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
          }, {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, '../app/theme')],
            },
          },
          ],
        }),
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
            },
          },
        ],
      },
    ],
  },
  plugins: options.plugins.concat([
    extractCSS,
    new HtmlWebpackPlugin({
      template: './app/index.html',
      inject: true,
    }),
  ]),
  devServer: {
    port: 9000,
    historyApiFallback: true,
  },
});
