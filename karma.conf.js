var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};

module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        files: [
            { pattern: 'tests.webpack.js', watched: false },
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            'tests.webpack.js': ['webpack'],
        },
        reporters: ['dots'],
        //singleRun: true,
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true,
        },
    });
};