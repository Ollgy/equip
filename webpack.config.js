const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = function(mode) {
  return ({
    mode,
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist/assets/scripts'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react']
          }
        }
      ]
    },
    optimization: {
      minimize: mode === 'production' ? true : false,
      minimizer: [new UglifyJsPlugin({
          test: /\.jsx?$/,
          exclude: /node_modules/,
          sourceMap: true,
          uglifyOptions: {
            compress: {},
            ie8: false,
            mangle: true
          }
        })
      ]
    }
  })
}
