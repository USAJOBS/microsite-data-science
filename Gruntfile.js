/*jshint node:true*/

'use strict';

module.exports = function(grunt) {
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks listed in package.json automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // shell commands for use in Grunt tasks
    shell: {
      jekyllBuild: {
        command: 'bundle exec jekyll build'
      },
      jekyllServe: {
        command: "bundle exec jekyll serve --baseurl ''"
      }
    },
    notify_hooks: {
      options: {
        enabled: true,
        success: false // whether successful grunt executions should be notified automatically
      }
    },
    linkChecker: {
      // Use a large amount of concurrency to speed up check
      options: {
        maxConcurrency: 20,
        noFragment: true
      },
      dev: {
        site: 'localhost',
        options: {
          initialPort: 4000
        }
      },
      staging: {
        site: 'usajobs.github.io/microsite-data-science'
      }
    },
    mdspell: {
      options: {
        ignoreAcronyms: true,
        ignoreNumbers: true
      },
      files: {
        src: [
        'index.html',
        'search.html'
        ]
      }
    },
    scsslint: {
      options: {
        bundleExec: true
      },
      dist: {
        src: [
          '_sass/*.scss'
        ]
      }
    },
    htmllint: {
      all: {
        options: {
          errorlevels: ['error'],
          ignore: 'Element “img” is missing required attribute “src”.'
        },
        src: [ '_dist/**/*.html' ]
      }
    }
  });

  grunt.registerTask('serve', ['shell:jekyllServe']);
  grunt.registerTask('build', ['shell:jekyllBuild']);
  grunt.registerTask('lint', ['scsslint']);
};
