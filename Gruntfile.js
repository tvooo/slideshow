/*global module:false*/

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    sass: {
      dev: {
        files: {
          'main.css': 'sass/main.scss'
        }
      }
    },
    watch: {
      html: {
        files: 'index.html',
        tasks: []
      },
      sass: {
        files: 'sass/**/*.scss',
        tasks: ['sass']
      },
      options: {
        livereload: true
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: '.',
          keepalive: false,
          open: true
        }
      }
    },
    cssmin: {
      minify: {
        files: {
          'css/style.min.css': [
            'css/bootstrap.css',
            'css/font-awesome.min.css',
            'css/animate.css',
            'css/flexslider.css',
            'css/style.css',
            'css/responsive.css',
            'css/custom.css'
          ]
        },
        options: {
          report: 'gzip'
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'js/script.min.js': [
            'js/jquery-2.1.0.min.js',
            'js/bootstrap.min.js',
            'js/retina.js',
            'js/modernizr.custom.js',
            'js/jquery.validate.min.js',
            'js/jquery.form.min.js',
            'js/jquery.flexslider.js',
            'js/waypoints.min.js',
            'js/animations.js',
            'js/custom.js'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task.
  grunt.registerTask('default', ['connect', 'watch']);

};
