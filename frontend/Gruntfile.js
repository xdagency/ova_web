module.exports = function(grunt) {
    
    // configuration
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'public/css/styles.css': 'src/sass/styles.scss'
                }
            }
        },
        watch: {
            css: {
                files: ['src/sass/*.scss'],
                tasks: ['sass:dist']
            }
        }
    });
      

    // load tasks into task manager
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // default task
    grunt.registerTask('default', ['sass']);

};