/* eslint-disable import/no-extraneous-dependencies */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const env = require('../env/prod.json');

module.exports = require('./webpack.base')({
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new UglifyJsPlugin(),
  ],
});
