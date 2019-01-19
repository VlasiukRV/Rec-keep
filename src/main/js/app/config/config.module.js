angular.module('module.config', 
	[
	'ngResource'
	]
)

.constant('appConfig', 
	{
		name: "Rec-Keep",
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
