module.exports = {
    entry: "./src/js/app.js",
    output: {
        path: __dirname + "/src/js",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.ejs$/, loader: "ejs" }
        ]
    }
};