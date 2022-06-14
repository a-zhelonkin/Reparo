const {merge} = require('webpack-merge');
const base = require('./webpack.base.cjs');

const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(base, {
    mode: 'production',
    plugins: [
        new TerserPlugin({extractComments: false}),
        // new CompressionPlugin({
        //     test: /\.(js|css)$/,
        //     deleteOriginalAssets: true,
        //     exclude: ['sw.js'],
        // }),
    ],
});
