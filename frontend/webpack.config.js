const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js', // Use contenthash to cache bust
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
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|ttf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    allowedHosts: ['localhost'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production',
      template: path.join(__dirname, 'src', 'index.html'),
    }),
  ],
};
