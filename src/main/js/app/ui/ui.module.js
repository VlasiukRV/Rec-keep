angular.module('module.ui', [
	'ngResource', 

	'module.config',
	'module.config.system',

	'module.ui.main-menu',
	'module.ui.edit-form',
	'module.ui.list-form'
	])


.directive('ngElementReady', function () {
	return moduleUI.directive.directiveElementReady();
})
.directive('loginPage', ['principal', function (principal) {
	return moduleUI.directive.directiveLoginPage(principal);
}])

.controller('workPlaceController',[
	'$window', 
	'$http', 
	'$cookies', 
	'$rootScope', 
	'$scope', 
	'$location', 
	'dataStorage', 
	'resourceService', 
	'dateFilter', 
	'errorDescriptions',
	
	appController.workPlaceController
	]
	;