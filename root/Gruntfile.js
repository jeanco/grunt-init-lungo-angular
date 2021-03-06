module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    "phonegap-build": {
      debug: {
        options: {
          archive: "app.zip",
          "appId": "{%= phonegap_app_id %}",
          "user": {
            "email": "{%= phonegap_user_email %}",
            "password": "{%= phonegap_user_password %}"
          }
        }
      }
    },
    compress: {
      main: {
        options: {
          archive: 'app.zip',
          mode: 'zip'
        },
        files: [
          {
            src: ["index.html", "config.xml", "bower_components/**/*.*", "partials/*.html", "js/**/*.js"],
            filter: 'isFile'
          }
        ]
      }     
    },
    copy: {
      options: {
        force: true
      },
      mobile: {
        files: [
          {src:'index.html',               dest: 'mobile/www', expand: true},
          {src: 'config.xml',              dest: 'mobile/www', expand: true},
          {src: 'bower_components/**/*.*', dest: 'mobile/www', expand: true},
          {src: 'partials/**/*.html',      dest: 'mobile/www', expand: true},
          {src: 'js/**/*.js',              dest: 'mobile/www', expand: true}
        ]
      }
    },

    cordovacli: {
      options: {
        path: 'mobile'
      },
      create: {
        options: {
          command: 'create',
          id: '{%= phonegap_package_name %}',
          name: '{%= name %}'
        }
      },
      add_platform: {
        options: {
          command: 'platform',
          action: 'add',
          platforms: ['android']
        }
      },
      build_android: {
        options: {
          command: 'build',
          platforms: ['android']
        }
      },
    },      
    express: {
        server: {
            options: {
                bases: ["./"]
            }
        }
    } 
  });

  // Load local tasks.
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-phonegap-build');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-cordovacli');

  // Default task.
  grunt.registerTask('default', ['compress', 'phonegap-build']);
  grunt.registerTask('prepare-local-build', ['cordovacli:create', 'cordovacli:add_platform' ]);
  grunt.registerTask('local-build', ['copy:mobile', 'cordovacli:build_android']);
  grunt.registerTask('serve', ['express', 'express-keepalive']);
};

