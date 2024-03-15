const webpack = require('webpack');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = { 
  entry: ['./src/index.js'],
  output: {
      path: path.resolve(__dirname,'dist'),
      filename: '[name].bundle.js',
      publicPath: '/',
      clean: true,
  },
  resolve: {
      extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, 
        use: ['babel-loader'],
        exclude: [/node_modules/, /__tests__/],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        use: ["file-loader"],
      },
      {
        test: /\.(woff|ttf)$/i,
        type: 'asset/resource'
      }
    ]
  },
  devServer: {
    allowedHosts:['localhost'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production',
      template: path.join(__dirname, 'src', 'index.html'),
    }),
  ],
};
