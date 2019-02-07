angular.module('module.config', 
	[
	'ngResource'
	]
)

.constant('appConfig', 
	{
		name: 'Record Keeper',
    	appName: 'appTaskList',
    	version: '0.0.1',
    	appIcon: 'fa fa-database',
    	appUrl: '/'+this.appName
	}
)

// Services
.service('appEnvironment', 
	[
	'$location', 
	'appConfig', 

	moduleConfig.appEnvironment
	]
)
;
