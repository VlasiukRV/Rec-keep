var app = angular.module('app', ['ui.bootstrap', 'ngResource', 'ngRoute', 'ngCookies', 'oi.select', 'cfp.hotkeys']);

// Constants
app.constant('appConfig', {
    appName: "appTaskList",
    appUrl: "/"+this.appName
})
;

// Configs
app
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('myHttpResponseInterceptor');
    }])
    .config(['$routeProvider', function ($routeProvider) {
        appService.setRoute($routeProvider);
    }])
    .config(['$provide', function ($provide) {
        $provide.decorator('$locale', ['$delegate', function ($delegate) {
            $delegate.NUMBER_FORMATS.PATTERNS[1].negPre = '-\u00A4';
            $delegate.NUMBER_FORMATS.PATTERNS[1].negSuf = '';
            return $delegate;
        }]);

    }])
;

// Services
app
    .service('appEnvironment', ['$location', 'appConfig', function ($location, appConfig) {
        return appService.appEnvironment($location, appConfig);
    }])
    .service('dataStorage', ['appConfig', function (appConfig) {
        return appService.dataStorage(appConfig);
    }])
;

// Factories
app
    .factory('myHttpResponseInterceptor', ['$q', '$location', 'dataStorage', function ($q, $location, dataStorage) {
        return appService.appHttpResponseInterceptor($q, $location, dataStorage);
    }])
    .factory('entityEditService', ['$resource', 'appEnvironment', function ($resource, appEnvironment) {
        return appService.entityEditService($resource, appEnvironment);
    }])
    .factory('securityService', ['$resource', 'appEnvironment', function ($resource, appEnvironment) {
        return appService.securityService($resource, appEnvironment);
    }])
    .factory('operationService', ['$resource', 'appEnvironment', function ($resource, appEnvironment) {
        return appService.operationService($resource, appEnvironment);
    }])
    .factory('systemService', ['$resource', 'appEnvironment', function ($resource, appEnvironment) {
        return appService.systemService($resource, appEnvironment);
    }])
    .factory('resourceService', function (entityEditService, systemService, securityService, operationService) {
        return appService.resourceService(entityEditService, systemService, securityService, operationService);
    })
;

// Directives
app
    .directive('ngElementReady', function () {
        return appDirective.directiveElementReady();
    })
    .directive('textValue', [function () {
        return appDirective.directiveTextValue();
    }])
    .directive('messageLine', [function () {
        return appDirective.directiveMessageLine();
    }])
    .directive('menuBar', [function () {
        return appDirective.directiveMenuBar();
    }])
    .directive('menuCollection', [function () {
        return appDirective.directiveMenuCollection();
    }])
    .directive('menuItem', ['$compile', function ($compile) {
        return appDirective.directiveMenuItem($compile);
    }])
    .directive('loginPage', [function () {
        return appDirective.directiveLoginPage();
    }])
    .directive('smDatepicker', function () {
        return appDirective.formsDirective.directiveDatePicker();
    })
    .directive('button', function () {
        return appDirective.formsDirective.directiveButton();
    })
    .directive('formToolbox', function () {
        return appDirective.formsDirective.directiveFormToolbox();
    })
    .directive('entityProperty', function () {
        return appDirective.formsDirective.directiveEntityProperty();
    })
    .directive('entityEditForm', function () {
        return appDirective.formsDirective.directiveEntityEditForm();
    })
    .directive('entityEditFormCol', ['$compile', function ($compile) {
        return appDirective.formsDirective.directiveEntityEditFormCol($compile);
    }])
    .directive('entityEditFormRow', function () {
        return appDirective.formsDirective.directiveEntityEditFormRow();
    })
    .directive('entityListForm', function () {
        return appDirective.formsDirective.directiveEntityListForm();
    })
    .directive('updatableText', ['$interval', function ($interval) {
        return appDirective.directiveUpdatableText($interval);
    }])
;

// Filters
app
    .filter('myDate', ['dateFilter', function (dateFilter) {
        return function (input) {
            if (input == null) {
                return "";
            }
            var _date = dateFilter(new Date(input), 'dd.MM.yyyy');

            return _date.toUpperCase();
        };
    }])
;

// Controllers
app
    .controller('workPlaceController',
    [
        '$window', '$http', '$cookies', '$rootScope', '$scope', '$location', 'dataStorage', 'resourceService', 'dateFilter',
        appController.workPlaceController
    ]
)
    .controller('farmController',
    [
        '$scope',
        appController.farmController
    ]
)
    .controller('farmListController',
    [
        '$scope', 'dataStorage',
        appController.farmListController
    ]
)
    .controller('editFarmController',
    [
        '$scope', 'dataStorage',
        appController.editFarmController
    ]
)
    .controller('projectController',
    [
        '$scope',
        appController.projectController
    ]
)
    .controller('projectListController',
    [
        '$scope', 'dataStorage',
        appController.projectListController
    ]
)
    .controller('editProjectController',
    [
        '$scope', 'dataStorage',
        appController.editProjectController
    ]
)
    .controller('taskController',
    [
        '$scope',
        appController.taskController
    ]
)
    .controller('taskListController',
    [
        '$scope', 'dataStorage',
        appController.taskListController
    ]
)
    .controller('editTaskController',
    [
        '$scope', 'dataStorage',
        appController.editTaskController
    ]
)
    .controller('userController',
    [
        '$scope',
        appController.userController
    ]
)
    .controller('userListController',
    [
        '$scope', 'dataStorage',
        appController.userListController
    ]
)
    .controller('editUserController',
    [
        '$scope', 'dataStorage',
        appController.editUserController
    ]
)
    .controller('roleController',
    [
        '$scope',
        appController.roleController
    ]
)
    .controller('roleListController',
    [
        '$scope', 'dataStorage',
        appController.roleListController
    ]
)
    .controller('editRoleController',
    [
        '$scope', 'dataStorage',
        appController.editRoleController
    ]
);
