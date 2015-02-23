module.exports =function(grunt){
     //Configure your tasks
     //matchdep reduces repetitive code by utilizing the package.json file to loadNpmTasks
     require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
     grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),//load properties from the package as a JSON object
      watch: {
        options:{
          livereload: true
        },
        js: {
          files:   ['src/scripts/*.js'],
          tasks:   ['copy']
        },
        css:{
          files:   ['src/styles/*.styl'],
          tasks:   ['stylus']
        },
        html:{
          files:   ['src/*.jade','src/inc/*'],
          tasks:   ['jade']
        }
      },
      copy: {
        main: {
          files: [
            {expand: true, cwd: 'src/images', src: '*', dest: 'build/img'},
            {expand: true, cwd: 'bower_components/font-awesome-stylus/fonts/', src: '*', dest: 'build/fonts'},
            {expand: true, cwd: 'bower_components/', src: '**/*', dest: 'build/lib'},
            {expand: true, cwd: 'src/scripts', src: '**/*', dest: 'build/js'}
          ]
        },
      },
      stylus:{
        compile: {
          options:{
            import:['nib']
          },
          files: {
            'build/css/styles.css': ['src/styles/index.styl'] // compile and concat into single file
          }
        }

      },
      jade:{
        compile:{
          options: {pretty:true},
          files:[{
            expand: true,
            cwd:    'src/',
            src:    "*.jade",
            ext:    ".html",
            dest:   "build/"
          }]
        }
      },
      connect: {
        server: {
          options: {
            port: 9001,
            base: 'build',
            keepalive:true
          }
        }
      }      
     });

     //Wondering where registering the tasks went? Matchdep makes does it automatically.

     //Run the task
     //Edit as needed (compass instead of stylus, kill uglify or coffee, etc.)
     grunt.registerTask('default', ['watch', 'copy',  'stylus', 'jade']);
     grunt.registerTask('build', [ 'copy',  'stylus','jade']);
};
