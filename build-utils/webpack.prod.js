/* eslint-disable import/no-extraneous-dependencies */
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    occurrenceOrder: true,
    removeEmptyChunks: true,
    mangleWasmImports: true,
    removeAvailableModules: true,
    usedExports: true,
    mergeDuplicateChunks: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true,
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new Dotenv({
      path: './.env.production',
    }),
  ],
  devServer: {
    contentBase: './build',
  },
};
