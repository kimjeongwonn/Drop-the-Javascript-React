const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config.common');
const path = require('path');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  devServer: {
    port: 5500,
    hot: true,
    liveReload: true,
    static: {
      directory: path.resolve(__dirname, 'public')
    }
  }
});
