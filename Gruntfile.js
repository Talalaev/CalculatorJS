module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	concat: {
	    options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        js: {
            src: [
                'src/javascripts/Calc_template.js',
                'src/javascripts/main.js'
            ],
            dest: 'dest/script.js'
        }
	},
	coffee: {
		options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            bare: true
        },
        test: {
            src: 'src/javascripts/Calculator.coffee',
            dest: 'src/javascripts/Calculator.js'
        },
        d: {
            src: 'src/javascripts/*.coffee',
            dest: 'src/javascripts/main.js'
        }
	},
	sass: {
		options: {
			compass: true,
			style: 'expanded',
			debugInfo: false
        },
		build: {
            src: 'src/styles/style.sass',
            dest: 'dest/style.css'
        }
	},
	compass: {
		options: {
            sassDir: 'src/styles',
			cssDir: 'dest'
        }
	},
	uglify: {
		my_target: {
			src: 'src/javascripts/Calculator.js',
            dest: 'dest/Calculator.min.js'
		}
	},
	jasmine: {
		calculator: {
			src: 'src/javascripts/Calculator.js',
			options: {
				specs: 'spec/Calculator_spec.js'
			}
		}
	},
	watch: {
        test: {
            files: ['src/javascripts/Calculator.coffee'],
            tasks: ['coffee:test', 'jasmine']
        },
        d: {
            files: ['src/javascripts/*.coffee'],
            tasks: ['coffee:d', 'concat']
        }
	}
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['compass', 'coffee', 'sass', 'concat', 'uglify', 'jasmine']);

};