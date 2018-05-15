const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    styles: "./src/styles/styles.js",
    introduction: "./src/pixi/introduction.tsx",
    selfAwareness: "./src/pixi/selfAwareness.tsx",
    creatingDirection: "./src/pixi/creatingDirection.tsx",
    identifyingDirection: "./src/pixi/identifyingDirection.tsx",
    three: "./src/three/three.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "/static/assets/"),
    publicPath: "/assets/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: [
          /node_modules/
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: [
          /node_modules/
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.jsx' ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
    // splitChunks: {
    //   chunks: "all"
    // },
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    hot: true,
    compress: true,
  }
};