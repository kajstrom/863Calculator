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
                    'dist/js/app.min.js': ['src/js/bundle.js']
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