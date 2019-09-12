angular.module('module.ui.main-menu', [
	'ngResource',
	'module.ui.form',
	'module.core'
	])

.factory('systemService', ['$resource', 'appHttp', function ($resource, appHttp) {
	return varInterfaceUtill.systemService($resource, appHttp);
}])

.factory('securityService', ['$resource', 'appHttp', function ($resource, appHttp) {
	return varInterfaceUtill.securityService($resource, appHttp);
}])

.factory('operationService', ['$resource', 'appHttp', function ($resource, appHttp) {
	return varInterfaceUtill.operationService($resource, appHttp);
}])

.factory('resourceService', ['entityEditService', 'systemService', 'securityService', 'operationService', function (entityEditService, systemService, securityService, operationService) {
	return varInterfaceUtill.resourceService(entityEditService, systemService, securityService, operationService);
}])

.factory('menuGeneral', [function () {	
	var homeDashboard = varInterfaceUtill.getNewCommand('homeDashboard', 'Dashboard', 'dashboard');

	var homeDD = varInterfaceUtill.getNewDropdownCommand('homeDD', 'Home')
				.addCommand(homeDashboard);
	homeDD.icon = 'fa fa-home';

	return varInterfaceUtill.getNewGroupCommand('generalG', 'GENERAL')
				.addCommand(homeDD);
}])

.factory('menuModel', [function () {
	var modelDD = varInterfaceUtill.getNewDropdownCommand('modelDD', 'Records');
	modelDD.icon = 'fa fa-edit';

	return modelDD;
}])

.factory('menuSystem', ['resourceService', 'menuModel', function (resourceService, menuModel) {
	var menuSystem = varInterfaceUtill.getNewDropdownCommand('systemDD', 'System')
		.addCommand(varInterfaceUtill.getNewCommand('initDataBase', 'initDataBase', function () {
			varInterfaceUtill.ExecuteSystemCommand(resourceService, 'jdbc/initDataBase');
		}))
		.addCommand(varInterfaceUtill.getNewCommand('startTasksExecute', 'startTasksExecute', function () {
			varInterfaceUtill.ExecuteSystemCommand(resourceService, 'taskScheduler/startTasksExecute');
		}))

		.addCommand(varInterfaceUtill.getNewCommand('interruptTaskExecutor', 'interruptTaskExecutor', function () {
		varInterfaceUtill.ExecuteSystemCommand(resourceService, 'taskScheduler/interruptTaskExecutor');
		}));

    menuSystem.icon = 'fa fa-plug';
	return varInterfaceUtill.getNewGroupCommand('systemG', 'System')
	.addCommand(menuModel)
	.addCommand(menuSystem)
	;	

}])

.service('errorDescriptions', [function(){
	return new varInterfaceUtill.ErrorDescriptions();
}])
.service('userInterface', ['principal', 'menuGeneral', 'menuSystem', function (principal, menuGeneral, menuSystem) {

	var userInterface = new varInterfaceUtill.UserInterface();
	userInterface.security.principal = principal;
	
	userInterface
	.commandBar.commandBar
	.addCommand(menuGeneral)
	.addCommand(menuSystem);

	return userInterface;
}])

.directive('menuBar', [function () {
	return moduleUI.directive.directiveMenuBar();
}])
.directive('menuCollection', [function () {
	return moduleUI.directive.directiveMenuCollection();
}])
.directive('menuItem', ['$compile', function ($compile) {
	return moduleUI.directive.directiveMenuItem($compile);
}])
.directive('messageLine', [function () {
	return moduleUI.directive.directiveMessageLine();
}])

;