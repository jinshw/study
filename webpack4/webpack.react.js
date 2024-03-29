let path = require('path')
let webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry:{
        react:['react','react-dom']
    },
    output:{
        filename:'_dll_[name].js',
        path:path.join(__dirname,'dist'),
        library:'_dll_[name]',
        // libraryTarget:'var' // commonjs var this ...
    },
    plugins:[
        new webpack.DllPlugin({
            name:"_dll_[name]",
            path:path.join(__dirname,'dist','manifest.json'),
        })
    ]
}