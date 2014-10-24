module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            development: {
                src: [ 'public/app', 'public/css' , 'public/js' ]
            }
        },

        bower: {
            development: {
                dest: 'public/vendor/',
                js_dest: 'public/vendor/js/',
                css_dest: 'public/vendor/css/',
                map_dest: 'public/vendor/css/',
                img_dest: 'public/vendor/img/',
                fonts_dest: 'public/vendor/fonts/',
                options: {
                    keepExpandedHierarchy: false,
                    stripGlobBase: false,
                    packageSpecific: {
                        bootstrap: {
                            files: [
                                'dist/css/*.*',
                                'dist/js/**',
                                'dist/fonts/**'
                            ]
                        }
                    }
                }
            }
        },

        copy: {
            development: {
                options: {
                    debug: true
                },
                files: [
                    {expand: true, cwd: 'client/app', src: '**/*.js', dest: 'public/app/'}
                ]
            }
        },

        jade: {
            development: {
                options: {
                    pretty: true
                },
                files: [
                    {expand: true, cwd: 'client/app', src: '**/*.jade', dest: 'public/app/', ext: '.html' }
                ]
            }
        },

        less: {
            development: {
                options: {
                    debug: true
                },
                files: [
                    {expand: true, cwd: 'client/less', src: '**/*.less', dest: 'public/css/', ext: '.css' }
                ]
            }
        },

        watch: {
            scripts: {
                files: ['client/app/**/*.js'],
                tasks: ['copy:development']
            },
            views: {
                files: ['client/app/**/*.jade'],
                tasks: ['jade:development']
            },
            styles: {
                files: ['client/less/**/*.less'],
                tasks: ['less:development']
            },
            livereaload: {
                files: ['public/**/*.*', 'app/views/**/*.jade'],
                options: {livereload: true}
            }
        },

        nodemon: {
            development: {
                script: 'server',
                options: {
                    nodeArgs: ['--debug'],
                    watch: ['server.js', 'app/**/*.js', 'config/**/*.js'],
                    ignore: ['node_modules/**', 'bower_components/**', 'public/**', 'client/**', 'test/**']
                }
            }
        },

        concurrent: {
            development: {
                tasks: ['nodemon:development', 'watch:scripts', 'watch:views', 'watch:styles', 'watch:livereaload'],
                options: {
                    logConcurrentOutput: true
                }
            },
            test: {}
        }

    });

    grunt.loadNpmTasks('grunt-bower');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');


    grunt.registerTask('development', 'Executa las tareas necesarias para development',
        ['clean:development', 'bower:development', 'jade:development', 'less:development', 'copy:development']);

    grunt.registerTask('server', 'Executa el servidor en modo development', ['concurrent:development']);


}