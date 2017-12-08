const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: './app/index.js', //entry: 'filename'
  output: {//object
    path: path.resolve(__dirname, 'dist'),//'path(library)
    filename: 'index_bundle.js',//filename: 'string'
    publicPath: '/'//public path is 'dist'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [new HtmlWebpackPlugin({
    template: './app/index.html'
  })]
}

if(process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
    }),
    new webpack.optimize.UglifyJsPlugin()
  )
    
}


module.exports =  config;