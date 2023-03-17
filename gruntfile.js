module.exports = function(grunt) {
    grunt.initConfig({
      sass: {
        dist: {
          files: {
            'path/to/output.css': 'path/to/input.scss'
          }
        }
      },
      watch: {
        css: {
          files: 'path/to/input.scss',
          tasks: ['sass']
        }
      }
    });
  
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
  
    grunt.registerTask('default', ['sass', 'watch']);
  };
  