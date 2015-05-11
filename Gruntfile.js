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
            },
            libUglify: {
                files: {
                    'js/lib/jquery.min.js': ['lib/jquery/jquery.js'],
                    'js/lib/bootstrap.min.js': ['lib/sass-bootstrap/bootstrap.js']

                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            libUglify: {
                files: {
                    'css/bootstrap.min.css': ['lib/sass-bootstrap/bootstrap.css']
                }
            },
            build: {
                files: {
                    'css/style/style.min.css': ['css/style/style.min.css']
                }
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
            setUp: {
                files: [
                    {expand: true, cwd: 'lib/sass-bootstrap/' ,src: ['**/glyphicons*.*'], dest: 'fonts/', filter: 'isFile'},
                    {expand: true, cwd: 'lib/matchHeight/' ,src: ['**/jquery.matchHeight-min.js'], dest: 'js/lib/', filter: 'isFile'},
                ]
            }
        },
        sprite:{
            all: {
                src: 'src/sprites/*.png',
                dest: 'sprites/spritesheet.png',
                destCss: 'css/style/core/_sprites.scss'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-spritesmith');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);
    //produce
    grunt.registerTask('produce', ['uglify:build', 'cssmin:build']);
    // Set Up task
    grunt.registerTask('setUp', ['bower:install', 'uglify:libUglify', 'cssmin:libUglify', 'copy:setUp']);
};