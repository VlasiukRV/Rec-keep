angular.module('module.config', 
	[
	'ngResource',

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
        'MetadataEntitySpecification',
        'Entity',
        'metadataSet',
        'fmListForm_TYPES',

        moduleConfig.metadataEntitySpecification_PoultryCalendar
        ]
    )

    .service('metadataEntitySpecification_Farm', [
        'MetadataEntitySpecification',
        'Entity',
        'metadataSet',
        'fmListForm_TYPES',

        moduleConfig.metadataEntitySpecification_Farm
        ]
    )

    .service('metadataEntitySpecification_Project', [
        'MetadataEntitySpecification',
        'Entity',
        'metadataSet',
        'fmListForm_TYPES',

        moduleConfig.metadataEntitySpecification_Project
        ]
    )

    .service('metadataEntitySpecification_User', [
        'MetadataEntitySpecification',
        'Entity',
        'metadataSet',
        'fmListForm_TYPES',

        moduleConfig.metadataEntitySpecification_User
        ]
    )

    .service('metadataEntitySpecification_Role', [
        'MetadataEntitySpecification',
        'Entity',
        'metadataSet',
        'fmListForm_TYPES',

        moduleConfig.metadataEntitySpecification_Role
        ]
    )

    .service('metadataEntitySpecification_ServiceTask', [
        'MetadataEntitySpecification',
        'Entity',
        'metadataSet',
        'fmListForm_TYPES',

        moduleConfig.metadataEntitySpecification_ServiceTask
        ]
    )

    .service('metadataEntitySpecification_Task', [
        'MetadataEntitySpecification',
        'Entity',
        'metadataSet',
        'fmListForm_TYPES',

        moduleConfig.metadataEntitySpecification_Task
        ]
    )

    .service('metadataEnumSpecification_TaskState', [
        'Enum',
        
        moduleConfig.metadataEnumSpecification_TaskState
        ]
    )
;
