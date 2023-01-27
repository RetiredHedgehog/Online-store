const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const EslingPlugin = require('eslint-webpack-plugin');

module.exports = (env, argv) => {
  return {
    context: path.resolve(__dirname, 'src'),

    mode: argv.mode,

    entry: path.resolve(__dirname, './src/main.ts'),

    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
    },

    plugins: [
      new HTMLWebpackPlugin({
        template: './main page.html',
      }),
      new CleanWebpackPlugin(),
      new EslingPlugin({ extensions: 'ts' }),
      new MiniCSSExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCSSExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },

    resolve: {
      alias: {
        intefaces: path.resolve(__dirname, 'src/interfaces'),
        classes: path.resolve(__dirname, 'src/classes'),
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.tsx', '.ts', '.js'],
    },
  };
};
