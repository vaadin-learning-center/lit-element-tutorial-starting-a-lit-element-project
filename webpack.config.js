const webpack = require('webpack');
const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const modeConfig = env => require(`./build-utils/webpack.${env.mode}.js`)(env);
const loadPresets = require('./build-utils/loadPresets');

module.exports = ({ mode, presets }) => {
  return webpackMerge(
    {
      mode,
      plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './src/index.html'
        }),
        new CopyWebpackPlugin([{ from: 'src/img', to: 'img/' }], {
          ignore: ['.DS_Store']
        })
      ]
    },
    modeConfig({ mode, presets }),
    loadPresets({ mode, presets })
  );
};
