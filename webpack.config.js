var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    context: __dirname,
    entry: './assets/js/index.js',
    output: {
        path: path.resolve('./assets/bundles/'),
        publicPath: '/static/bundles/',
        filename: "[name]-[hash].js"
    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'})
    ],

    module: {
        loaders: [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader',
                query:{
                    cacheDirectory: true,
                    presets: ['es2015', 'react']
                }
            },
            { test: /\.css$/,
              loaders: ['style-loader','css-loader']
            },
            {
              test: /\.(gif|svg|jpg|png)$/,
              loader: "file-loader",
            }

        ]
    }
};
