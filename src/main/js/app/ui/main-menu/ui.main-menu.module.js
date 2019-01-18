angular.module('module.ui.main-menu', [
	'ngResource',
	'module.ui.form',
	'module.config.system'
	])

.factory('systemService', ['$resource', 'appEnvironment', function ($resource, appEnvironment) {
	return varInterfaceUtill.systemService($resource, appEnvironment);
}])

.factory('securityService', ['$resource', 'appEnvironment', function ($resource, appEnvironment) {
	return varInterfaceUtill.securityService($resource, appEnvironment);
}])

.factory('operationService', ['$resource', 'appEnvironment', function ($resource, appEnvironment) {
	return varInterfaceUtill.operationService($resource, appEnvironment);
}])

.factory('resourceService', ['entityEditService', 'systemService', 'securityService', 'operationService', function (entityEditService, systemService, securityService, operationService) {
	return varInterfaceUtill.resourceService(entityEditService, systemService, securityService, operationService);
}])

.factory('menuModel', [function () {
	return varInterfaceUtill.getNewDropdownCommand("modelDD", "Model");
}])

.factory('menuSystem', ['resourceService', function (resourceService) {
	var menuSystem = varInterfaceUtill.getNewDropdownCommand("systemDD", "System")
	.addCommand(varInterfaceUtill.getNewCommand("initDataBase", "initDataBase", function () {
		varInterfaceUtill.ExecuteSystemCommand(resourceService, "jdbc/initDataBase")
	}))
	.addCommand(varInterfaceUtill.getNewCommand("runCreateReport", "runCreateReport", function () {
		varInterfaceUtill.ExecuteSystemCommand(resourceService, "taskScheduler/runCreateReport")
	}))
	.addCommand(varInterfaceUtill.getNewCommand("stopCreateReport", "stopCreateReport", function () {
		varInterfaceUtill.ExecuteSystemCommand(resourceService, "taskScheduler/stopCreateReport")
	}))
	.addCommand(varInterfaceUtill.getNewCommand("runArchiveService", "runArchiveService", function () {
		varInterfaceUtill.ExecuteSystemCommand(resourceService, "taskScheduler/runArchiveService")
	}))
	.addCommand(varInterfaceUtill.getNewCommand("stopArchiveService", "stopArchiveService", function () {
		varInterfaceUtill.ExecuteSystemCommand(resourceService, "taskScheduler/stopArchiveService")
	}))
	.addCommand(varInterfaceUtill.getNewCommand("sendMail", "sendMail", function () {
		varInterfaceUtill.ExecuteSystemCommand(resourceService, "taskScheduler/sendMail")
	}))
	.addCommand(varInterfaceUtill.getNewCommand("interruptTaskExecutor", "interruptTaskExecutor", function () {
		varInterfaceUtill.ExecuteSystemCommand(resourceService, "taskScheduler/interruptTaskExecutor")
	}));
	return menuSystem;
}])

.service('errorDescriptions', [function(){
	return new varInterfaceUtill.ErrorDescriptions();
}])
.service('userInterface', ['principal', 'menuModel', 'menuSystem', function (principal, menuModel, menuSystem) {

	var userInterface = new varInterfaceUtill.UserInterface();
	userInterface.security.principal = principal;
	/*userInterface.appMetadataSet = appMetadataSet;*/
	userInterface
	.commandBarSetMainUrl("#/task")
	.commandBar.commandBar
	.addCommand(menuModel)
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