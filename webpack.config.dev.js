// https://webpack.js.org/configuration/

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

module.exports = {
    entry: () => {
        const entryRelativePath = './entry/';
        const entryFiles = fs.readdirSync(entryRelativePath);
        const entryObj = {};
        entryFiles.forEach((entryPath) => {
            const entryName = entryPath.match(/(.*)\.entry\.js/)[1];
            entryObj[entryName] =  entryRelativePath + entryPath;
        });
        return entryObj;
    },
    output: {
        path: path.resolve('.'),
        filename: '[name].bundle.js'
    },   
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }, 
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            }, 
            {
                test: /\.less$/,
                exclude: /node_modules/,            
                loaders: ['style-loader', 'css-loader', 'less-loader']
            },
            { 
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
                loader: 'url-loader?limit=100000' 
            }            
        ]
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname)
    },
    watch: true
}