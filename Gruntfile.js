module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: true
            },
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js', 'app.js', 'features/**/*.js']
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
		cucumberjs: {
			src: 'features',
			options: {
				steps: 'features/stepDefinitions',
				format: 'pretty'
			}
		},
        watch: {
            files: ['<%= jshint.files %>', 'features/*.feature'],
            tasks: ['jshint', 'mochaTest', 'cucumberjs']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-cucumber');

    grunt.registerTask('default', ['jshint', 'mochaTest']);

};
