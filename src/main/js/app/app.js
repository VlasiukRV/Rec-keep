var app = angular.module('app', [
    'ui.bootstrap', 
    'ngResource', 
    'ngRoute', 
    'ngCookies', 
    'oi.select', 
    'cfp.hotkeys',

    'module.config',

    'module.ui.main-menu',
    'module.ui.edit-form',
    'module.ui.list-form',

    'module.ui',

    'module.metadata-model',
    'module.domain-model'

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
.service('dataStorage', function () {
    return appService.dataStorage();
})

.service('metadataSet', [
    'abstractAppModel',
    'userInterface',

    'metadataEnumSpecification_TaskState',
    
    'metadataEntitySpecification_Farm',
    'metadataEntitySpecification_Project',
    'metadataEntitySpecification_User',
    'metadataEntitySpecification_Role',
    'metadataEntitySpecification_Task',

    function(abstractAppModel, 
        userInterface,

        metadataEnumSpecification_TaskState,
        
        metadataEntitySpecification_Farm,
        metadataEntitySpecification_Project,
        metadataEntitySpecification_User,
        metadataEntitySpecification_Role,
        metadataEntitySpecification_Task
        ){

        appInitialization = {
            abstractAppModel: abstractAppModel,
            metadataSet: undefined,
            metadataSpecifications: {
                enums: [],
                entities: []
            },
            setMetadataSet: function (metadataSet) {
                if (metadataSet) {
                    this.metadataSet = metadataSet;                    
                } else {
                    this.metadataSet = new abstractAppModel.MetadataSet();
                }
                this.metadataSet.userInterface = userInterface;

                return this;
            },
            getMetadataSet: function () {
                return this.metadataSet;
            },
            initMetadataSet: function () {                
                var i;
                for (i = 0; i < this.metadataSpecifications.enums.length; i++) {
                    this.metadataSet.installMetadataObjectEnum(this.metadataSpecifications.enums[i]);
                }
                for (i = 0; i < appInitialization.metadataSpecifications.entities.length; i++) {
                    this.metadataSet.installMetadataObjectEntity(this.metadataSpecifications.entities[i]);
                }

                return this;
            },

            addMetadataEntitySpecification: function(metadataEntitySpecification) {
                this.metadataSpecifications.entities.push(metadataEntitySpecification);

                return this;
            },
            addMetadataEnumSpecification: function(metadataEnumSpecification) {
                this.metadataSpecifications.enums.push(metadataEnumSpecification);

                return this;
            }

        };

        appInitialization
            .setMetadataSet()

            .addMetadataEnumSpecification(metadataEnumSpecification_TaskState)
            .addMetadataEntitySpecification(metadataEntitySpecification_Project)
            .addMetadataEntitySpecification(metadataEntitySpecification_User)
            .addMetadataEntitySpecification(metadataEntitySpecification_Role)
            .addMetadataEntitySpecification(metadataEntitySpecification_Task)
            .addMetadataEntitySpecification(metadataEntitySpecification_Farm)

            .initMetadataSet();

        return appInitialization.getMetadataSet();        
    }])

;

// Factories
app
.factory('myHttpResponseInterceptor', ['$q', '$location', 'errorDescriptions', function ($q, $location, errorDescriptions) {
    return appService.appHttpResponseInterceptor($q, $location, errorDescriptions);
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
    '$window', 
    '$http', 
    '$cookies', 
    '$rootScope', 
    '$scope', 
    '$location', 
    'metadataSet',
    'dataStorage',
    'appConfig', 
    'resourceService', 
    'dateFilter',
    'errorDescriptions',
    
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
    '$scope', 
    'dataStorage', 
    'EntityListForm',

    appController.farmListController
    ]
    )
.controller('editFarmController',
    [
    '$scope', 
    'dataStorage', 
    'EntityEditForm',

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
    '$scope', 
    'dataStorage', 
    'EntityListForm',

    appController.projectListController
    ]
    )
.controller('editProjectController',
    [
    '$scope', 
    'dataStorage', 
    'EntityEditForm',

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
    '$scope', 
    'dataStorage', 
    'EntityListForm',

    appController.taskListController
    ]
    )
.controller('editTaskController',
    [
    '$scope', 
    'dataStorage', 
    'EntityEditForm',

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
    '$scope', 
    'dataStorage', 
    'EntityListForm',

    appController.userListController
    ]
    )
.controller('editUserController',
    [
    '$scope', 
    'dataStorage', 
    'EntityEditForm',

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
    '$scope', 
    'dataStorage', 
    'EntityListForm',

    appController.roleListController
    ]
    )
.controller('editRoleController',
    [
    '$scope', 
    'dataStorage', 
    'EntityEditForm',

    appController.editRoleController
    ]
    );
