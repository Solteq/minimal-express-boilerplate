module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: true
            },
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js', 'app.js']
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: 'results.txt',
                    quiet: false,
                    clearRequireCache: false
                },
                src: ['test/**/*.js']
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'mochaTest']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('default', ['jshint', 'mochaTest']);

};
