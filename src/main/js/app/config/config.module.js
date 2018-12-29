angular.module('module.config', [
	'ngResource'
	])

.constant('appConfig', {
    appName: "appTaskList",
    appUrl: "/"+this.appName
})

// Services
.service('appEnvironment', ['$location', 'appConfig', function ($location, appConfig) {
	return moduleConfig.appEnvironment($location, appConfig);
}])
;
