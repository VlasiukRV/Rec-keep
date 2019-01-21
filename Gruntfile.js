module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    var build_js = [
        'clean',
        'concat',
        'uglify',
        'removelogging'
    ];

    var build_css = [
        'sass'
    ];

    var deploy_frontend_local = [
        'copy'
    ];

    grunt.registerTask('build-js', build_js);
    grunt.registerTask('build-css', build_css);
    grunt.registerTask('deploy-frontend-local', deploy_frontend_local);

    grunt.registerTask('test', [
        'jshint'
    ]);

    grunt.config.init({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    $: true,
                    console: true
                }
            },
            test: {
                src: 
                    ['src/main/js/**/*.js']
            }
        },

        clean: {
            options: {
                force: true
            },
            build: [
                'src/main/resources/static/js/build.js',
                'src/main/resources/static/js/custom.js'
            ]
        },

        concat: {
            options: {
                sourceMap: true,
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> */'
            },
            build: {
                files: {
                    'src/main/resources/static/js/custom.js': [
                        'src/main/js/template-service.js'
                    ],
                    'src/main/resources/static/js/build.js': [
                        
                        'src/main/js/app/app-utils.js',

                        'src/main/js/app/config/system/system.service.js',
                        'src/main/js/app/config/system/system.module.js',
                        'src/main/js/app/config/config.service.js',
                        'src/main/js/app/config/config.module.js',

                        'src/main/js/app/ui/main-menu/ui.main-menu.core.js',
                        'src/main/js/app/ui/main-menu/ui.main-menu.directive.js',
                        'src/main/js/app/ui/main-menu/ui.main-menu.module.js',

                        'src/main/js/app/ui/form/form.module.js',
                        'src/main/js/app/ui/edit-form/ui.edit-form.core.js',
                        'src/main/js/app/ui/edit-form/ui.edit-form.directive.js',
                        'src/main/js/app/ui/edit-form/ui.edit-form.module.js',
                        'src/main/js/app/ui/list-form/ui.list-form.core.js',
                        'src/main/js/app/ui/list-form/ui.list-form.directive.js',
                        'src/main/js/app/ui/list-form/ui.list-form.module.js',

                        'src/main/js/app/ui/ui.directive.forms.js',
                        'src/main/js/app/ui/ui.directive.js',
                        'src/main/js/app/ui/ui.service.js',

                        'src/main/js/app/ui/ui.service.js',
                        'src/main/js/app/ui/ui.directive.js',
                        'src/main/js/app/ui/ui.module.js',

                        'src/main/js/app/metadata-model/metadata-model.module.js',
                        'src/main/js/app/metadata-model/domain-model.module.js',

                        'src/main/js/app/app-service.js',

                        'src/main/js/app/app-controller.js',
                        'src/main/js/app/domain/user/app-controller-user.js',
                        'src/main/js/app/domain/project/app-controller-project.js',
                        'src/main/js/app/domain/task/app-controller-task.js',
                        'src/main/js/app/domain/farm/app-controller-farm.js',

                        'src/main/js/app/app.js'
                    ]
                }
            }
        },

        uglify: {
            options: {
                stripBanners: true,
                banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> */'
            },

            build: {
                files: {
                    'src/main/resources/static/js/build.min.js': ['src/main/resources/static/js/build.js'],
                    'src/main/resources/static/js/custom.min.js': ['src/main/resources/static/js/custom.js']
                }
            }
        },

        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    'src/main/resources/static/css/app.css': 'src/main/sass/app.scss'
                }
            }
        },

        copy: {
            main: {
                expand: true,
                cwd: 'src/main/resources/static',
                src: '**',
                dest: 'target/classes/static/',
            }
        },

        watch: {
            build: {
                files: [
                        'src/main/js/**/*.js', 
                        'src/main/sass/**/*.scss',
                        'src/main/resources/static/templates/**/*.scss'
                        ],
                tasks: build_js.concat(build_css, deploy_frontend_local)
            }
        },

        removelogging: {
            build: {
                src: "src/main/resources/static/build.min.js",
                dest: "src/main/resources/static/build.clean.js"
            }
        }

    });

};
