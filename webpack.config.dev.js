// https://webpack.js.org/configuration/

var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        app: './entery.js',
    },
    output: {
        path: path.resolve('.'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader']
        }, {
            test: /\.js|jsx$/,
            exclude: '/node_modules/',
            loaders: ['babel-loader']
        }]
    },
    devServer: {
        contentBase: path.join(__dirname)
    },
    watch: true
}