let express = require('express')
let app = express()
let webpack = require('webpack')

// 中间件
let middleware = require('webpack-dev-middleware')

let config = require('./webpack.config.js')

let compiler = webpack(config);

app.use(middleware(compiler))


app.get("/user",(req,res) => {
    res.json({name:"测试-3333"})
})

app.listen(3000)
