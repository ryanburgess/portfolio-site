module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: [
          {
            expand: true,
            cwd: 'sass/',
            src: ['**/*.scss'],
            dest: 'css/',
            ext: '.css',
          },
        ],
      }
    },
    browserify: {
      dist: {
        options: {
        },
        files: {
          'js/project.js': ['js/example1.js', 'js/example2.js']
        },
      }
    },
    uglify: {
      dist: {
        files:{
          'js/rb.min.js': ['js/rb.js']
        },
      }
    },
    jsonlint: {
      sample: {
        src: [ 'content/**/*.json' ]
      }
    },
    imagemin: {
      static: {
        options: {
          optimizationLevel: 3
        },
        files: {
          'images/logo.png': 'images/logo.png'
        }
      },
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/'
        }]
      }
    },
    'json-pretty': {
      options: {
        files: 'content/',
        indent: 4,
        minify:true,
        append:'.min'
      },
    },
    svgmin: {                       // Task
        options: {                  // Configuration that will be passed directly to SVGO
          plugins: [{
            removeViewBox: false
          },
          {
            removeUselessStrokeAndFill: false
          },
          {
            convertPathData: {
              straightCurves: false // advanced SVGO plugin option
            }
          }]
        },
        dist: {                     // Target
          files: [{               // Dictionary of files
            expand: true,       // Enable dynamic expansion.
            cwd: 'img/',     // Src matches are relative to this path.
            src: ['**/*.svg'],  // Actual pattern(s) to match.
            dest: 'img/',       // Destination path prefix.
            ext: '.min.svg'     // Dest filepaths will have this extension.
            // ie: optimise img/src/branding/logo.svg and store it in img/branding/logo.min.svg
          }]
       }
    },
    watch: {
      css: {
        files: 'sass/**/*.scss',
        tasks: ['sass'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      svg: {
        files: 'img/**/*.svg',
        tasks: ['newer:svgmin'],
        options: {
          spawn: false,
        },
      },
      scripts: {
        files: 'js/**/*.js',
        tasks: ['newer:uglify'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      images: {
        files: ['img/**/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
        }
      },
      json: {
        files: ['content/**/*.json'],
        tasks: ['newer:jsonlint'],
        options: {
          spawn: false
        }
      },
    }
  });
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-json-pretty');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-jsonlint');
  grunt.registerTask('default',['watch']);
};