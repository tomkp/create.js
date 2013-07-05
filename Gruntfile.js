module.exports = function(grunt) {


    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),


        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': 'src/create.js'
                }
            }
        },


        jshint: {
            files: 'src/create.js'
        },


        docco: {
            debug: {
                src: 'src/create.js',
                options: {
                    output: 'docs/'
                }
            }
        },


        jasmine: {
            pivotal: {
                src: 'src/**/*.js',
                options: {
                    specs: 'test/specs/*spec.js'
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-docco');
    grunt.loadNpmTasks('grunt-contrib-jasmine');


    grunt.registerTask('default', ['jshint', 'jasmine', 'uglify', 'docco']);
};