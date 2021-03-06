
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowerSyncPlugin = require('browser-sync-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: { main: './src/main.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath:'/',
    filename: './js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader']
          })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader','sass-loader']
          })
      }
    ]
  },
  plugins: [ 
    new ExtractTextPlugin({filename: './css/main.css'}),
     new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new BrowerSyncPlugin({
      host:'localhost',
      port:9000,
      server:{baseDir:['dist']},
    })
  ],
  devServer:{
    contentBase:path.resolve(__dirname,"src"),
    compress:true,
    port:9000
  },
  devtool:'source-map'
};;