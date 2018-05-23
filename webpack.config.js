// const path = require('path');
// const extractTextPlugin = require('extract-text-webpack-plugin');


// var obj  = {
//     entry:'./src/main.js',
//     output:{
//         path:path.resolve(__dirname,'dist'),
//         filename:'bundle.js'
//     },
//     devtool:'source-map',
//     module:{
//         rules: [
//                   {
//                     test: /\.scss$/,
//                     use: extractTextPlugin.extract({
//                         fallback: 'style-loader',
//                          use: ['css-loader?sourceMap', 'postcss-loader?sourceMap','sass-loader?sourceMap']
//                         })
//                   },
//                   {
//                       test:/\.css$/,
//                       loader:'css-loader',
//                       options:{
//                           sourceMap:true,
//                           minimize:{
//                               safe:true
//                           }
//                       }
//                   }
//                 ]
//          },
//     plugins:[
//             new extractTextPlugin('main.css')
//         ]
// }

// console.log(obj);

// module.exports = obj;

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: { main: './src/main.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
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
  ],
  devtool:'source-map'
};;