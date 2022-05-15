const path = require('path');
const {merge} = require('webpack-merge');
const base = require('./webpack.base.cjs');

const nodeModulesDirectory = path.resolve(__dirname, 'node_modules');

module.exports = merge(base, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        enforce: 'pre',
        exclude: nodeModulesDirectory,
        use: ['source-map-loader'],
      },
    ],
  },
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    client: {
      progress: true,
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
});
