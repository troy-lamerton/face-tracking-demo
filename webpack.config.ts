import { Configuration } from 'webpack';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const config: Configuration = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/js/index.ts',
  devServer: {
    contentBase: path.join(__dirname, './src/public'), // where static files are found
    publicPath: '/', // the path where static files are hosted at
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: '[name]-[chunkhash].js',
  },
  module: {
    rules: [
      {
        include: path.resolve(__dirname, 'src'),
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/public/index.html'),
    }),
    new CopyWebpackPlugin([
      {
        from: './node_modules/clmtrackr/build/clmtrackr.js',
      },
    ]),
  ],
};
module.exports = config;
