let path = require('path');
let HtmlWebpackPlugin = require("html-webpack-plugin")
let MiniCssExtractPlugin = require("mini-css-extract-plugin")
let CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { loader } = require('mini-css-extract-plugin');
let webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const Happypack = require('happypack')

const TerserPlugin = require('terser-webpack-plugin')


module.exports = {
    optimization: {
        minimizer:[
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    },
    resolve:{// 解析 第三方包 common
        modules: [path.resolve('node_modules')],
        extensions: ['.js','.css','.vue'] // 文件扩展名称
        // mainFields: ['style','main'] // 查找入口字段
        // alias: { // 别名
        //     bootstrap: "bootstrap/dist/css/bootstrap.css",
        // }

    },
    devServer:{
        port: 8080,
        progress: true,
        contentBase: './dist',
        compress: true,
        open: true,

        // 2.第二种情况
        // before(app){
        //     app.get("/user",(req,res) => {
        //         res.json({name:"测试-before"})
        //     })
        // }  

        // 1.第一种情况
        // proxy:{ // 重写的方式，把请求代理到服务器上
        //     "/api":{
        //         target: "http://localhost:3000",
        //         pathRewrite: { "/api":"" }
        //     }
        // }
    }, 

    mode: "production", // 模式 默认两种 production development
    entry: './src/index.js', // 入口
    // 1. 源码映射，会单独生成一个sourceMap文件 出错了 会标识当前报错地方的列和行。（大而全）
    // devtool:'source-map',
    // 2. 不会产生单独的文件，但是可以显示行和列
    // devtool:'eval-source-map',
    // 3. 不会产生列，但是会产生单独的映射文件,产生后的文件可以保留起来
    // devtool:'cheap-module-source-map',
    // 4. 不会产生文件，集成在打包后的文件中，不会产生列
    // devtool:"cheap-module-eval-source-map",

    watch:true,
    watchOptions:{
        poll: 1000, //指定毫秒为单位进行轮询
        aggregateTimeout:500, //防抖，当第一个文件更改，会在重新构建前增加延迟
        ignored:/node_modules/
    },
    output: {
        filename: "bundle.js", // 打包后的名称
        path: path.resolve(__dirname,'dist'), // 打包后的路径，路径必须是绝对路径
        // publicPath: 'http://www.chtgeo.com'
    },

    plugins: [ // 数组，存放所有的webpack插件
        // new Happypack({
        //     id:"js",
        //     use: [ 
        //         {
        //             loader:"babel-loader",
        //             options:{
        //                 presets:[
        //                     '@babel/preset-env',
        //                     '@babel/preset-react'
        //                 ],
        //                 plugins:[
        //                     ["@babel/plugin-proposal-decorators", { "legacy": true }],
        //                     ["@babel/plugin-proposal-class-properties", { "loose" : true }],
        //                     "@babel/plugin-transform-runtime"
        //                 ]
        //             }
        //         }
        //     ]
        // }),
        // new webpack.DllReferencePlugin({
        //     manifest:path.join(__dirname, 'dist','manifest.json'),
        // }),
        new webpack.IgnorePlugin(/\.\/locale/,/moment/),
        new webpack.DefinePlugin({
            DEV: JSON.stringify('dev'), // console.log('dev')
            FLAG: "true", // console.log(true)
            EXPRESSION: '1+1' // console.log(1+1)
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/main.css",
        }),
        // new webpack.ProvidePlugin({ // 在每个模块中都引入
        //     $: "jquery"
        // })
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, "doc"),to: "./doc"}
        ]),
        new webpack.BannerPlugin("make 2021 by jinshw")
    ],
    // externals: {
    //     jquery: "jQuery"
    // },

    module: {
        noParse: /jquery/,
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
                test: /\.html$/,
                use: "html-withimg-loader"
            },
            {
                test: /\.(png|jpg|gif)$/,
                use:[{
                    loader:'url-loader', // url-loader中集成了file-loader
                    options:{
                        limit: 1,  // 设置阀值，在这个限制下图片转化为base64，否则使用file-loader
                        esModule:false, //解决html-webpack-plugin 发生了冲突
                        outputPath: "/img/",
                        // publicPath: 'http://www.chtgeo.com'
                    }
                }] 
            },
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     use:[{
            //         loader:'file-loader',
            //         options:{
            //             esModule:false //解决html-webpack-plugin 发生了冲突
            //         }
            //     }] 
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
                // use: 'Happypack/loader?id=js',
                use: {
                    loader:"babel-loader",
                    options:{
                        presets:[
                            '@babel/preset-env',
                            '@babel/preset-react'
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