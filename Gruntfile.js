module.exports = function (grunt) {
    //описываем конфигурацию
    grunt.config.init({
        pkg: grunt.file.readJSON('package.json'), //подгружаем package.json, чтобы использовать его данные

        jshint: {     // описываем как будет проверять наш код - jsHint
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
            'taskList': {
                src: 
                	['src/main/js/**/*.js']
            }
        },

        concat: {  //описываем работу плагина конкатенации
            dist: {
                src: 
                [
            		'src/main/js/app/app-utils.js',

            		'src/main/js/app/app-directive.js',
            		'src/main/js/app/forms/app-directive-forms.js',

            		'src/main/js/app/app-service.js',
            		'src/main/js/app/forms/app-service-forms.js',
            		'src/main/js/app/domain/app-service-model-enum.js',
            		'src/main/js/app/domain/user/app-service-model-userl.js',
            		'src/main/js/app/domain/project/app-service-model-projectl.js',
            		'src/main/js/app/domain/task/app-service-model-taskl.js',
            		'src/main/js/app/domain/farm/app-service-model-farm.js',

            		'src/main/js/app/app-controller.js',
            		'src/main/js/app/domain/user/app-controller-user.js',
            		'src/main/js/app/domain/project/app-controller-project.js',
            		'src/main/js/app/domain/task/app-controller-task.js',
            		'src/main/js/app/domain/farm/app-controller-farm.js',

            		'src/main/js/app/app.js'

                ],  // какие файлы конкатенировать
                dest: 'src/main/resources/static/js/build.js'  // куда класть файл, который получиться после процесса конкатенации
            }
        },

        uglify: {  //описываем работу плагина минификации js - uglify.
            options: {
                stripBanners: true,
                banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' //комментарий который будет в минифицированном файле.
            },

            build: {
                src: 'src/main/resources/static/js/build.js',  // какой файл минифицировать
                dest: 'src/main/resources/static/js/build.min.js' // куда класть файл, который получиться после процесса минификации
            }
        },

        watch: { //описываем работу плагина слежки за файлами.
            scripts: {
                files: ['src/main/js/*.js'],  //следить за всеми js файлами в папке src
                tasks: ['jshint', 'concat', 'uglify', 'removelogging']  //при их изменении запускать следующие задачи
            }
        },


        removelogging: { //описываем работу плагина удаления логов
            dist: {
                src: "src/main/resources/static/build.min.js", // файл который надо отчистить от console.log
                dest: "src/main/resources/static/build.clean.js" // выходной файл, который получим после очистки
            }
        }


    });

    //подгружаем необходимые плагины
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-remove-logging');


    //регистрируем задачу
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'removelogging', 'watch']); //задача по умолчанию, просто grunt
    grunt.registerTask('test', ['']); //пока пусто, но кто знает, возможно в следующих уроках мы этим воспользуемся :)
};
