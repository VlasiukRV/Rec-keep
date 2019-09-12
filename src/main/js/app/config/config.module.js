angular.module('module.config', 
	[
	'ngResource',

    'module.config',
    'module.core',
    'module.ui.list-form'
	]
)

.constant('appConfig', 
	{
		name: 'Record Keeper',
    	appName: 'appTaskList',
    	version: '0.0.1',
    	appIcon: 'fa fa-database',
    	appUrl: '/'+this.appName,
	}
)

// Services
// 

.service ('appHttp', ['appConfig', '$location', function(appConfig, $location) {
    var location = $location;

    return {
        getAppHttpUrl: function(urlSuffix) {
                var appAddress = "http://" + location.$$host + ":" + location.$$port;

                return appAddress + "/" + appConfig.appName + urlSuffix;
            }
    }
}])

.service('metadataSet', ['MetadataSet', function(MetadataSet){
    return new MetadataSet();
}])


.service('appEnvironment', 
	[
    'metadataSet',

    'userInterface',

    'metadataEnumSpecification_TaskState',

    'metadataEntitySpecification_Farm',
    'metadataEntitySpecification_PoultryCalendar',
    'metadataEntitySpecification_Project',
    'metadataEntitySpecification_User',
    'metadataEntitySpecification_Role',
    'metadataEntitySpecification_ServiceTask',
    'metadataEntitySpecification_Task',

	moduleConfig.appEnvironment
	]
)

// Domain model
// 

    .service('metadataEntitySpecification_PoultryCalendar', [
        'Entity',
        'fmListForm_TYPES',

        moduleConfig.metadataEntitySpecification_PoultryCalendar
        ]
    )

    .service('metadataEntitySpecification_Farm', [
        'Entity',
        'fmListForm_TYPES',

        moduleConfig.metadataEntitySpecification_Farm
        ]
    )

    .service('metadataEntitySpecification_Project', [
        'Entity',

        moduleConfig.metadataEntitySpecification_Project
        ]
    )

    .service('metadataEntitySpecification_User', [
        'Entity',
        'fmListForm_TYPES',

        moduleConfig.metadataEntitySpecification_User
        ]
    )

    .service('metadataEntitySpecification_Role', [
        'Entity',
        'metadataSet',

        moduleConfig.metadataEntitySpecification_Role
        ]
    )

    .service('metadataEntitySpecification_ServiceTask', [
        'Entity',
        'metadataSet',
        'fmListForm_TYPES',

        moduleConfig.metadataEntitySpecification_ServiceTask
        ]
    )

    .service('metadataEntitySpecification_Task', [
        'Entity',
        'metadataSet',

        moduleConfig.metadataEntitySpecification_Task
        ]
    )

    .service('metadataEnumSpecification_TaskState', [
        'Enum',
        
        moduleConfig.metadataEnumSpecification_TaskState
        ]
    )
;
