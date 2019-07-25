var app = angular.module('app', [
    'ui.bootstrap', 
    'ngResource', 
    'ngRoute', 
    'ngCookies', 
    'oi.select', 
    'cfp.hotkeys',

    'angular-jsoneditor',

    'module.config',

    'module.ui.main-menu',
    'module.ui.edit-form',
    'module.ui.list-form',

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
.service('dataStorage', ['appEnvironment', function (appEnvironment) {
    var dataStorage = appService.dataStorage();
    dataStorage.setAppMetadataSet(appEnvironment.getMetadataSet());

    return dataStorage;
}])

;

// Factories
app
.factory('myHttpResponseInterceptor', 
    [
    '$q', 
    '$location', 
    'errorDescriptions', 
    appService.appHttpResponseInterceptor
    ]
)
;

// Filters
app
.filter('myDate', ['dateFilter', function (dateFilter) {
    return function (input) {
        if (input == null) {
            return '';
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
    '$window', 
    '$http', 
    '$cookies', 
    '$rootScope', 
    '$scope', 
    '$location',
    'dataStorage',
    'appConfig', 
    'resourceService', 
    'dateFilter',
    'errorDescriptions',
    
    appController.workPlaceController
    ]
    )

.controller('dashboard', 
    [
    '$scope',
    'dataStorage',
    'appConfig', 
    'resourceService', 
    'errorDescriptions',

    appController.dashboard 
    ]
    )
.controller('poultryCalendarController',
    [
        '$scope',
        function ($scope) {
            appController.poultryCalendarController.apply(this, arguments);
        }
    ]
    )
.controller('poultryCalendarListController',
    [
        '$scope',
        'dataStorage',
        'EntityListForm',

        function ($scope, dataStorage, EntityListForm) {
            appController.poultryCalendarListController.apply(this, arguments);
        }
    ]
    )
.controller('editPoultryCalendarController',
    [
        '$scope',
        'dataStorage',
        'EntityEditForm',

        function ($scope, dataStorage, EntityEditForm) {
            appController.editPoultryCalendarController.apply(this, arguments);
        }
    ]
    )

.controller('farmController',
    [
        '$scope',

        function ($scope) {
            appController.farmController.apply(this, arguments);
        }
    ]
    )
.controller('farmListController',
    [
        '$scope', 
        'dataStorage', 
        'EntityListForm',

        function ($scope, dataStorage, EntityListForm) {
            appController.farmListController.apply(this, arguments);
        }
    ]
    )
.controller('editFarmController',
    [
        '$scope', 
        'dataStorage', 
        'EntityEditForm',

        function ($scope, dataStorage, EntityEditForm) {
            appController.editFarmController.apply(this, arguments);
        }
    ]
    )

.controller('projectController',
    [
        '$scope',
    
        function ($scope) {
            appController.projectController.apply(this, arguments);
        }
    ]
    )
.controller('projectListController',
    [
        '$scope', 
        'dataStorage', 
        'EntityListForm',

        function ($scope, dataStorage, EntityListForm) {
            appController.projectListController.apply(this, arguments);
        }
    ]
    )
.controller('editProjectController',
    [
        '$scope', 
        'dataStorage', 
        'EntityEditForm',

        function ($scope, dataStorage, EntityEditForm) {
            appController.editProjectController.apply(this, arguments);
        }
    ]
    )

.controller('taskController',
    [
        '$scope',
    
        function ($scope) {
            appController.taskController.apply(this, arguments);
        }
    ]
    )
.controller('taskListController',
    [
        '$scope', 
        'dataStorage', 
        'EntityListForm',

        function ($scope, dataStorage, EntityListForm) {
            appController.taskListController.apply(this, arguments);
        }
    ]
    )
.controller('editTaskController',
    [
        '$scope', 
        'dataStorage', 
        'EntityEditForm',

        function ($scope, dataStorage, EntityEditForm) {
            appController.editTaskController.apply(this, arguments);
        }
    ]
    )

.controller('userController',
    [
        '$scope',

        function ($scope) {
            appController.userController.apply(this, arguments);
        }
    ]
    )
.controller('userListController',
    [
        '$scope', 
        'dataStorage', 
        'EntityListForm',

        function ($scope, dataStorage, EntityListForm) {
            appController.userListController.apply(this, arguments);
        }
    ]
    )
.controller('editUserController',
    [
        '$scope', 
        'dataStorage', 
        'EntityEditForm',

        function ($scope, dataStorage, EntityEditForm) {
            appController.editUserController.apply(this, arguments);
        }
    ]
    )

.controller('roleController',
    [
        '$scope',
    
        function ($scope) {
            appController.roleController.apply(this, arguments);
        }
    ]
    )
.controller('roleListController',
    [
        '$scope', 
        'dataStorage', 
        'EntityListForm',

        function ($scope, dataStorage, EntityListForm) {
            appController.roleListController.apply(this, arguments);
        }
    ]
    )
.controller('editRoleController',
    [
        '$scope', 
        'dataStorage', 
        'EntityEditForm',

        function ($scope, dataStorage, EntityEditForm) {
            appController.editRoleController.apply(this, arguments);
        }
    ]
    )

.controller('serviceTaskController',
    [
        '$scope',

        function ($scope) {
            appController.serviceTaskController.apply(this, arguments);
        }
    ]
    )
.controller('serviceTaskListController',
    [
        '$scope',
        'dataStorage',
        'EntityListForm',

        function ($scope, dataStorage, EntityListForm) {
            appController.serviceTaskListController.apply(this, arguments);
        }
    ]
    )
.controller('editServiceTaskController',
    [
        '$scope',
        'dataStorage',
        'EntityEditForm',

        function ($scope, dataStorage, EntityEditForm) {
            appController.editServiceTaskController.apply(this, arguments);
        }
    ]
    )
;
