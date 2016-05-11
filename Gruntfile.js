module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    // Dev Tool Configurations
    env: {
      dev: {
        NODE_ENV: 'development'
      },
      test: {
        NODE_ENV: 'test'
      }
    },

    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          ext:'js, html',
          watch: ['server.js', 'config/**/*.js', 'app/**/*.js']
        }
      },
      debug: {
        script: 'server.js',
        options: {
          nodeArgs: ['--debug'],
          ext: 'js, html',
          watch: ['server.js', 'config/**/*.js', 'app/**/*.js']
        }
      }
    },

    watch: {
      js: {
        files: ['server.js', 'src/**/*.js'],
        tasks: ['jshint']
      },
      src: {
        files: ['src/**/*.js'],
        tasks: ['browserify']
      },
      css: {
        files: ['public/css/*.css'],
        tasks: ['csslint']
      }
    },

    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      },
      debug: {
        tasks: ['nodemon:debug', 'watch', 'node-inspector'],
        options: {
          logConcurrentOutput: true
        }
      }
    },


    'node-inspector': {
      debug: {
        options: {
          'web-port': 8989
        }
      }
    },

    // Build Configurations
    browserify: {
      dist: {
        options: {
          transform: ["babelify"]
        },
        files: {
          "./public/js/app.js": ["./src/client/app.js"]
        }
      }
    },

    // Testing Configurations
    mochaTest: {
      src: 'test/**/*.js',
      options: {
        reporter: 'spec'
      }
    },

    // Linting Configurations
    jshint: {
      all: {
        src: ['server.js', 'src/**/*.js']
      }
    },
    csslint: {
      all: {
        src: 'public/css/*.css'
      }
    }

  });

  // Register Tasks
  grunt.registerTask('default', [
    'env:dev',
    'lint',
    'browserify',
    'concurrent:dev'
  ]);

  grunt.registerTask('debug', [
    'env:dev',
    'lint',
    'browserify',
    'concurrent:debug'
  ]);

  grunt.registerTask('test', [
    'env:test',
    'mochaTest'
  ]);

  grunt.registerTask('lint', [
    'jshint',
    'csslint'
  ]);
}
