'use strict';
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const version = 'v1.1.1';
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack=require('webpack');
//压缩混淆
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {

    //入口
    entry: {
        main: './src/main.js',
        vendors:['vue','vue-router','axios','moment','vue-preview']
    },
    output: {
        //所有产出资源路径
        path: path.join(__dirname, 'dist'),
        publicPath:'/',
        filename: 'js/[name].[chunkhash:6].js'
    },
    module: {
       loaders: [{
                test: /\.css$/,
                // loader: 'style-loader!css-loader!autoprefixer-loader'
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!autoprefixer-loader"
                  })
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
            },
            {
                test: /\.(jpg|png|svg|ttf|woff|woff2|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 4096, //4096字节以上生成文件，否则base6
                    name: 'assets/[name].[ext]'
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            //解析vue-preview的es6代码
            {
              test:/vue-preview.src.*?js$/,
              loader:'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        //压缩混淆代码
        new UglifyJSPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            //manifest 清单，用来记录使用者和第三方包的依赖关系
            names:['vendors','manifest']
        }),
        new ExtractTextPlugin("css/[name].[contenthash:6].css"),
        new htmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.DefinePlugin({
         'process.env': {
           NODE_ENV: '"production"'
         }
        })
    ]
}