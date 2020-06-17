/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const env = require('../env/local.json');

module.exports = require('./webpack.base')({
  devtool: 'eval',
  plugins: [
    // normally I'd use dotenv, but for some reason it doesn't work with webpack-dev-server
    new webpack.DefinePlugin({
      'process.env': env,
    }),
  ],
});
