let path = require('path');
let HtmlWebpackPlugin = require("html-webpack-plugin")
let MiniCssExtractPlugin = require("mini-css-extract-plugin")
let CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { loader } = require('mini-css-extract-plugin');
let webpack = require('webpack')


module.exports = {
    optimization: {
        minimizer:[
            new CssMinimizerPlugin()
        ]
    },
    devServer:{
        port: 3000,
        progress: true,
        contentBase: './dist',
        compress: true,
        open: true
    }, 

    mode: "development", // 模式 默认两种 production development
    entry: './src/index.js', // 入口
    output: {
        filename: "bundle.js", // 打包后的名称
        path: path.resolve(__dirname,'dist') // 打包后的路径，路径必须是绝对路径
    },

    plugins: [ // 数组，存放所有的webpack插件
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "main.css",
        }),
        // new webpack.ProvidePlugin({ // 在每个模块中都引入
        //     $: "jquery"
        // })
    ],
    // externals: {
    //     jquery: "jQuery"
    // },

    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: "eslint-loader",
            //         options: {
            //             enforce: "pre"
            //         }
            //     },
            //     exclude:/node_modules/
            // },
            {
                test: require.resolve("jquery"),
                loader: "expose-loader",
                options: {
                    exposes: ["$", "jQuery"],
                },
            },
            {
                test: /\.js$/,
                use: {
                    loader:"babel-loader",
                    options:{
                        presets:[
                            '@babel/preset-env'
                        ],
                        plugins:[
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                },
                include:path.join(__dirname,'src'),
                exclude:/node_modules/
            },
            { 
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"

                ]
            },
            { 
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader", // 解析 @import 
                    "postcss-loader",
                    "less-loader" // 把less 转换成css
                ]
            }
        ]
    }
}