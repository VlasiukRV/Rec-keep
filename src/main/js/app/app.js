var app = angular.module('app', [
    'ui.bootstrap', 
    'ngResource', 
    'ngRoute', 
    'ngCookies', 
    'oi.select', 
    'cfp.hotkeys',

    'module.config',
    'module.ui'    
]);

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
    .factory('resourceService', function (entityEditService, systemService, securityService, operationService) {
        return appService.resourceService(entityEditService, systemService, securityService, operationService);
    })
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
