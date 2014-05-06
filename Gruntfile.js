module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('dev', [
        'less',
        'copy',
        'php:dev',
        'watch'
    ]);
    grunt.registerTask('default', [
        'ngTemplateCache',
        'less',
        'copy',
        'requirejs',
        'uglify',
        'htmlmin',
        'cssmin',
        'replace'
    ]);

    require('./build-config.js');

    var theme = grunt.option('theme') || 'default',
        themeCfg = grunt.file.readJSON('./themes/' + theme + '/config.json');

    themeCfg.css = themeCfg.css || {};
//    console.info(themeCfg);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cfg: bazalt,
        theme: themeCfg,
        theme_dir: './themes/' + theme,
        build_dir: 'build',
        banner: 'Developed by EqualTeam (http://equalteam.net/)',
        copy: {
            api: {
                files: [
                    {
                        src: [
                            'api/**'
                        ],
                        dest: 'build/'
                    }
                ]
            },
            theme: {
                files: [
                    {
                        expand: true,
                        src: [
                            'app/*.json',
                            'locale/*',
                            'themes/<%= cfg.theme %>/assets/**',
                            '!themes/<%= cfg.theme %>/assets/less/**',
                            'favicon.png'
                        ],
                        dest: 'build/'
                    }
                ]
            }
        },
        less: {
            bootstrap: {
                src: ['bower_components/bootstrap/less/bootstrap.less'],
                dest: 'themes/<%= cfg.theme %>/assets/css/bootstrap.css'
            },
            theme: {
                files: {'themes/<%= cfg.theme %>/assets/css/theme.css': 'themes/<%= cfg.theme %>/assets/less/theme.less'},
                options: {
                    cleancss: true,
                    modifyVars: themeCfg.css
                }
            }
        },
        cssmin: {
            theme: {
                files: {
                    '<%= build_dir %>/themes/<%= cfg.theme %>/assets/css/theme.css': [
                        '<%= build_dir %>/themes/<%= cfg.theme %>/assets/css/bootstrap.css',
                        '<%= build_dir %>/themes/<%= cfg.theme %>/assets/css/theme.css'
                    ]
                }
            },
            options: {
                banner: '/*! <%= banner %> */',
                keepSpecialComments: '0'
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
                        end: "requirejs.config({" +
                            "urlArgs: '_=<%= new Date().getTime() %>'"
                            +
                            "});" +
                            " }());"
                    },
                    mainConfigFile: './app/appBootstrap.js',
                    name: 'main',
                    include: [],
                    exclude: ['./views.js'],
                    out: '<%= build_dir %>/main.js'
                }
            }
        },
        uglify: {
            requirejs: {
                src: ['bower_components/requirejs/require.js'],
                dest: '<%= build_dir %>/r.js'
            },
            frontend: {
                src: ['<%= build_dir %>/main.js'],
                dest: '<%= build_dir %>/main.js'
            },
            options: {
                banner: '/*! <%= banner %> */\n',
                compress: false,
                mangle: false,
                preserveComments: false,
                beautify: {
                    ascii_only: true
                }
            }
        },
        watch: {
            css: {
                files: 'themes/<%= cfg.theme %>/assets/**/*.less',
                tasks: ['less'],
                options: {
                    livereload: true
                }
            }
        },
        htmlmin: {
            backend: {
                files: {
                    '<%= build_dir %>/index.html': 'themes/<%= cfg.theme %>/index.html'
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
        php: {
            dev: {
                options: {
                    hostname: '127.0.0.1',
                    port: 8080
                }
            }
        },
        replace: {
            default: {
                src: '<%= build_dir %>/index.html',
                overwrite: true,
                replacements: [
                    {
                        from: /<script src="(.*)\/require.js"(.*)><\/script>/gm,
                        to: '<script src="/r.js" data-main="main"></script>'
                    },
                    {
                        from: /theme.css/gm,
                        to: 'theme.css?_=<%= new Date().getTime() %>'
                    },
                    {
                        from: '<script src="/build-config.js"></script>',
                        to: ''
                    },
                    {
                        from: '<link href="/themes/default/assets/css/bootstrap.css" rel="stylesheet" media="screen">',
                        to: ''
                    },
                    {
                        from: '<!DOCTYPE html>',
                        to: '<!DOCTYPE html>\n<!-- <%= banner %> -->\n'
                    }
                ]
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
};