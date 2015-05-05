module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/script.js',
                dest: 'js/script.min.js'
            }
        },
        bower: {
            install: {
                options: {
                    cleanBowerDir: true,
                    layout: "byType"
                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'lib/jquery/' ,src: ['**/jquery.js'], dest: 'js/lib', filter: 'isFile'},
                    {expand: true, cwd: 'lib/sass-bootstrap/' ,src: ['**/*.js'], dest: 'js/lib', filter: 'isFile'},
                    {expand: true, cwd: 'lib/sass-bootstrap/' ,src: ['**/*.css'], dest: 'css/', filter: 'isFile'},
                    {expand: true, cwd: 'lib/sass-bootstrap/' ,src: ['**/glyphicons*.*'], dest: 'fonts/', filter: 'isFile'},
                ]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);
};