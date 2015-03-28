module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt); // npm install --save-dev load-grunt-tasks


    grunt.initConfig({
        "watch": {
            scripts: {
                files: ["app/js/*.js"],
                tasks: ["default"]
            }
        },
        concat: {
            dist: {
                src: ['src/css/bootstrap.min.css'],
                dest: 'dist/css/styles.min.css'
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/js/app.min.js': [
                        "node_modules/jquery/dist/jquery.min.js",
                        "node_modules/backbone.marionette/node_modules/underscore/underscore-min.js",
                        "node_modules/backbone.marionette/node_modules/backbone/backbone.js",
                        "node_modules/backbone.marionette/node_modules/backbone.babysitter/lib/backbone.babysitter.min.js",
                        "node_modules/backbone.marionette/node_modules/backbone.wreqr/lib/backbone.wreqr.min.js",
                        "node_modules/backbone.marionette/lib/backbone.marionette.min.js",
                        "src/js/bootstrap.min.js",
                        "src/js/app.js"
                    ]
                }
            }
        },
        processhtml: {
            dist: {
                files: {
                    'dist/index.html':  ['src/index.html']
                }
            }
        }
    });

    grunt.registerTask("default", ["processhtml", "uglify", "concat"]);
}