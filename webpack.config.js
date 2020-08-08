const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

module.exports = {
  entry: {
    overview: './public/js/home/overview.js',
    login: './public/js/login/login.js',
    addIssue: './public/js/addIssue/addIssue.js',
    issues: './public/js/issues/issues.js',
    issueById: './public/js/issueById/issueById.js',
    account: './public/js/account/account.js',
    recover: './public/js/recover/recover.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  devServer: {
    contentBase: './dist/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'overview.pug',
      template: './views/overview.pug',
      chunks: ['overview'],
    }),
    new HtmlWebpackPlugin({
      filename: 'login.pug',
      template: './views/login.pug',
      chunks: ['login'],
    }),
    new HtmlWebpackPlugin({
      filename: 'addIssue.pug',
      template: './views/addIssue.pug',
      chunks: ['addIssue'],
    }),
    new HtmlWebpackPlugin({
      filename: 'issues.pug',
      template: './views/issues.pug',
      chunks: ['issues'],
    }),
    new HtmlWebpackPlugin({
      filename: 'issueById.pug',
      template: './views/issueById.pug',
      chunks: ['issueById'],
    }),
    new HtmlWebpackPlugin({
      filename: 'account.pug',
      template: './views/account.pug',
      chunks: ['account'],
    }),
    new HtmlWebpackPlugin({
      filename: 'recover.pug',
      template: './views/recover.pug',
      chunks: ['recover'],
    }),
    new HtmlWebpackPugPlugin({}),  
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
  },
};
