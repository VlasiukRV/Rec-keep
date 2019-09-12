module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    var build_js = [
        'clean',
        'ngtemplates',
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
                unused: true,
                trailing: true,
                quotmark: true,
                noempty: true,
                globals: {
                    jQuery: true,
                    $: true,
                    console: true,
                    angular: true,

                    moduleConfig: true,
                    appService: true,
                    appUtils: true,
                    moduleUI: true,
                    appController: true,
                    varInterfaceUtill: true
                }
            },
            all: ['src/main/js/app/**/*.js'],
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
                'src/main/resources/static/js/gentelella.js'
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
                    'src/main/resources/static/js/lib/angularjs.js': [
                        'src/main/js/app-lib/angularjs/angular.js',
                        'src/main/js/app-lib/angularjs/angular-cookies.js',
                        'src/main/js/app-lib/angularjs/angular-resource.js',
                        'src/main/js/app-lib/angularjs/angular-route.js',
                        'src/main/js/app-lib/angularjs/angular-sanitize.js',
                        'src/main/js/app-lib/angularjs/hotkeys.min.js',
                        'src/main/js/app-lib/angularjs/select-tpls.min.js',
                        'src/main/js/app-lib/angularjs/ui-bootstrap.js',

                    ],
                    'src/main/resources/static/js/gentelella.js': [

                        'src/main/js/gentelella/vendors/jquery.sparkline.min.js',
                        
                        'src/main/js/gentelella/vendors/bootstrap-progressbar.min.js',
                        'src/main/js/gentelella/vendors/nprogress.js',

                        'src/main/js/gentelella/vendors/moment.min.js',
                        'src/main/js/gentelella/vendors/fullcalendar.min.js',
                        

                        'src/main/js/gentelella/vendors/jquery.knob.min.js',
                        'src/main/js/gentelella/vendors/jquery.vmap.min.js',
                        'src/main/js/gentelella/vendors/maps/jquery.vmap.canada.js',
                        
                        'src/main/js/gentelella/gentelella-vendors.js',
                        'src/main/js/gentelella/gentelella.js',
                        'node_modules/jsoneditor/dist/jsoneditor.min.js'
                    ],
                    'src/main/resources/static/js/build.js': [
                        
                        'src/main/js/app/app-utils.js',

                        'src/main/js/app/config/assert/**/*.js',
                        'src/main/js/app/config/core.module.js',
                        'src/main/js/app/config/config.module.js',

                        'src/main/js/app/components/angular-json-editor.js',

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

                        'src/main/js/app/app-service.js',

                        'src/main/js/app/app-controller.js',

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
                    'src/main/resources/static/js/lib/angularjs.min.js': ['src/main/resources/static/js/lib/angularjs.js'],
                    'src/main/resources/static/js/build.min.js': ['src/main/resources/static/js/build.js'],
                    'src/main/resources/static/js/gentelella.min.js': ['src/main/resources/static/js/gentelella.js']
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

        ngtemplates:  {
            app:        {
                cwd:      'src/main/resources/static',
                src:      'templates/appRoom/tasklist/directive/**/*.html',
                dest:     'src/main/resources/static/js/app-templates.js',
                options:    {
                    htmlmin:  {
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true
                    }
                }
            }
        },

        copy: {
            main: {
                expand: true,
                cwd: 'src/main/resources/static',
                src: '**',
                dest: 'target/classes/static/'
            }
        },

        watch: {
            build: {
                files: [
                        'src/main/templates/**/*.html', 
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

    grunt.registerTask('build-js', build_js);
    grunt.registerTask('build-css', build_css);
    grunt.registerTask('deploy-frontend-local', deploy_frontend_local);

    grunt.registerTask('test', [
        'jshint'
    ]);

};
