module.exports = function (grunt) {

    var build_Tasks = [
        'clean',
        'concat',
        'uglify',
        'removelogging'
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
                        
                        'src/main/js/app/config/config.service.js',

                        'src/main/js/app/ui/ui.directive.forms.js',
                        'src/main/js/app/ui/ui.directive.js',
                        'src/main/js/app/ui/ui.service.js',

                        'src/main/js/app/app-utils.js',

                        'src/main/js/app/app-service.js',
                        'src/main/js/app/forms/app-service-forms.js',
                        'src/main/js/app/domain/app-service-model-enum.js',
                        'src/main/js/app/domain/user/app-service-model-userl.js',
                        'src/main/js/app/domain/project/app-service-model-project.js',
                        'src/main/js/app/domain/task/app-service-model-taskl.js',
                        'src/main/js/app/domain/farm/app-service-model-farm.js',

                        'src/main/js/app/app-controller.js',
                        'src/main/js/app/domain/user/app-controller-user.js',
                        'src/main/js/app/domain/project/app-controller-project.js',
                        'src/main/js/app/domain/task/app-controller-task.js',
                        'src/main/js/app/domain/farm/app-controller-farm.js',

                        'src/main/js/app/config/config.module.js',
                        'src/main/js/app/ui/ui.module.js',
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

        watch: {
            build: {
                files: ['src/main/js/**/*.js'],
                tasks: build_Tasks
            }
        },


        removelogging: {
            build: {
                src: "src/main/resources/static/build.min.js",
                dest: "src/main/resources/static/build.clean.js"
            }
        }


    });

    //подгружаем необходимые плагины
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-remove-logging');

    //регистрируем задачу

    grunt.registerTask('build', build_Tasks);

    grunt.registerTask('test', [
        'jshint'
    ]);
};
