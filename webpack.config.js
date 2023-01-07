const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: path.resolve(__dirname, './src/main.ts'),
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './main page.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin({
            filename: '[name].[contenthash].css'
          })
    ],
    module: {
        rules: [
            {
                test: /.css$/i,
                use: [MiniCSSExtractPlugin.loader, 'css-loader'],
              },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
              },
            
           
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },

}
