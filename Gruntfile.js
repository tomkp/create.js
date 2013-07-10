module.exports = function(grunt) {


    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),


        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    'dist/create.min.js': 'src/create.js'
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
                    output: 'dist/docs/'
                }
            }
        },


        jasmine: {
            pivotal: {
                src: 'src/**/*.js',
                options: {
                    specs: 'test/specs/*spec.js'
                }
            },

            coverage: {
                src: 'src/**/*.js',
                options: {
                    specs: 'test/specs/*spec.js',
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'dist/docs/coverage/coverage.json',
                        report: 'dist/docs/coverage',
                        thresholds: {
                            lines: 75,
                            statements: 75,
                            branches: 75,
                            functions: 90
                        }
                    }
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-docco');
    grunt.loadNpmTasks('grunt-contrib-jasmine');


    grunt.registerTask('default', ['jshint', 'jasmine', 'uglify', 'docco']);
    grunt.registerTask('test', ['jshint', 'jasmine']);

};