module.exports = function(grunt) {
  'use strict';
  // Project configuration
  grunt.initConfig({
    // Metadata
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration
    concat: {
      generated: {
        files: [
          {
            dest: '.tmp/concat/js/flowtime.concat.js',
            src: [
              'js/brav1toolbox.js',
              'js/flowtime.js'
            ]
          }
        ]
      }
    },
    uglify: {
      options: {
        preserveComments: 'some'
      },
      generated: {
        
        files: [
          {
            dest: 'js/flowtime.min.js',
            src: ['.tmp/concat/js/flowtime.concat.js']
          }
        ]
      }
    },
    watch: {
      css: {
        files: 'css/**/*.css',
        tasks: ['autoprefixer']
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 4 version', 'ie 8', 'ie 9']
      },
      multiple_files: {
        expand: true,
        flatten: false,
        src: 'css/**/*  .css',
        dest: 'css/'
      }
    }
  });

  // These plugins provide necessary tasks
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');

  // Default task
  grunt.registerTask('default', ['concat', 'autoprefixer', 'uglify']);
};
