module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            theme: {
                files: [
                    {
                        expand: true,
                        src: [
                            'app/menu.json',
                            'themes/default/assets/**',
                            '!themes/default/assets/less/**',
                            'favicon.png'
                        ],
                        dest: 'build/'
                    }
                ]
            },
            socketio: {
                files: [
                    {
                        expand: true,
                        src: [
                            'app/vendors/socket.io.min.js'
                        ],
                        rename: function(dest, src) {
                            return dest + 'socket-io.js';
                        },
                        dest: 'build/'
                    }
                ]
            }
        },
        less: {
            bootstrap: {
                src: ['bower_components/bootstrap/less/bootstrap.less'],
               dest: 'themes/default/assets/css/bootstrap.css'
            },
            theme: {
                src: ['themes/default/assets/less/theme.less'],
                dest: 'themes/default/assets/css/theme.css'
            }
        },
        requirejs: {
            frontend: {
                options: {
                    baseUrl: './app',
                    optimize: 'none',
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: {
                        start: "(function() {",
                        end: "require(['main']) }());"
                    },
                    mainConfigFile: './app/config.js',
                    name: 'main',
                    include: [],
                    exclude: ['./views.js', './vendors/socket.io.min.js'],
                    out: 'build/js/main.min.js'
                }
            }
        },
        uglify: {
            frontend: {
                src: ['build/js/main.min.js'],
                dest: 'build/js/main.min.js'
            },
            options: {
                compress: false,
                mangle: false,
                preserveComments: false,
                beautify: {
                    ascii_only: true
                },
                sourceMappingURL: function (fileName) {
                    return fileName.replace(/^build\/js\//, '').replace(/\.js$/, '.map');
                },
                sourceMap: function (fileName) {
                    return fileName.replace(/\.js$/, '.map');
                }
            }
        },
        watch: {
            css: {
                files: 'themes/**/assets/**/*.less',
                tasks: ['less'],
                options: {
                    livereload: true
                }
            }//,
//            html: {
//                files: ['themes/**/views/**/*.html'],
//                tasks: ['i18nextract'],
//                options: {
//                    livereload: true
//                }
//            }
        },
        php: {
            dev: {
                options: {
                    hostname: '127.0.0.1',
                    port: 8081
                }
            }
        },
        htmlmin: {
            backend: {
                files: {
                    'build/index.html': 'themes/default/index.html'
                },
                options: {
                    removeComments: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeOptionalTags: true,
                    collapseWhitespace: true
                }
            }
        },
        replace: {
            default: {
                src: 'build/index.html',
                overwrite: true,
                replacements: [
                    {
                        from: /<script src="(.*)\/require.js"(.*)><\/script>/gm,
                        to: '<script src="/js/main.min.js"></script>'//<script src="/js/app/vendors/socket.io.min.js"></script>
                    }
                ]
            }
        },
        i18nextract: {
            backend: {
                lang: ['uk_UA', 'ru_RU'],
                src: ['themes/*/views/**/*.html', 'index.html'],
                dest: 'locale',
                prefix: 'theme-',
                safeMode: false
            }
        },
        ngTemplateCache: {
            views: {
                files: {
                    'build/views.js': './themes/*/views/**/*.html'
                },
                options: {
                    trim: '.',
                    module: 'app'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-angular-translate');
    grunt.loadNpmTasks('grunt-php');
    grunt.loadNpmTasks('grunt-hustler');

    grunt.registerTask('dev', [
        'copy',
        'php:dev',
        'watch'
    ]);
    grunt.registerTask('default', [
        'ngTemplateCache',
        'less:theme',
        'copy',
        'requirejs',
        'uglify',
        'htmlmin',
        'replace'
    ]);
};
