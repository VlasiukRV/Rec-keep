angular.module('module.config', 
	[
	'ngResource'
	]
)

.constant('appConfig', 
	{
    	appName: "appTaskList",
    	appUrl: "/"+this.appName
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
