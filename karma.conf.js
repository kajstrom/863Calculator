var path = require("path");
var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};
webpackConfig.module.loaders = [{ test: /\.ejs$/, loader: "ejs" }];
webpackConfig.module.preLoaders = [
    // transpile all files except testing sources with babel as usual
    {
        test: /\.js$/,
        exclude: [
            path.resolve('src/js/'),
            path.resolve('node_modules/')
        ],
        loader: 'babel'
    },
    // transpile and instrument only testing sources with isparta
    {
        test: /\.js$/,
        include: path.resolve('src/js/'),
        loader: 'isparta'
    }
];

module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        files: [
            { pattern: 'tests.webpack.js', watched: false }
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            'tests.webpack.js': ['webpack']
        },
        reporters: ['progress', 'junit', 'coverage'],
        //singleRun: true,
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
        },
        // optionally, configure the reporter
        coverageReporter: {
            type : 'html',
            dir : 'tests/coverage/'
        }
    });
};