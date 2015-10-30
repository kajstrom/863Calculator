var webpack = require("webpack");

module.exports = {
    entry: "./src/js/app.js",
    output: {
        path: __dirname + "/src/js",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.ejs$/, loader: "ejs" },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    },
    resolve: {
        modulesDirectories: ["node_modules"],
        alias: {
            backbone: __dirname + "/node_modules/backbone/backbone.js",
            underscore: __dirname + "/node_modules/backbone.marionette/node_modules/underscore/underscore.js"
        }
    }
};