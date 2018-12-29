angular.module('module.ui', [
	'ngResource', 
	'module.config'
	])

.factory('securityService', ['$resource', 'appEnvironment', function ($resource, appEnvironment) {
	return moduleUI.securityService($resource, appEnvironment);
}])
.factory('operationService', ['$resource', 'appEnvironment', function ($resource, appEnvironment) {
	return moduleUI.operationService($resource, appEnvironment);
}])
.factory('systemService', ['$resource', 'appEnvironment', function ($resource, appEnvironment) {
	return moduleUI.systemService($resource, appEnvironment);
}])


.directive('ngElementReady', function () {
	return moduleUI.directive.directiveElementReady();
})
.directive('loginPage', [function () {
	return appDirective.directiveLoginPage();
}])
.directive('messageLine', [function () {
	return appDirective.directiveMessageLine();
}])
.directive('menuBar', [function () {
	return appDirective.directiveMenuBar();
}])
.directive('menuCollection', [function () {
	return appDirective.directiveMenuCollection();
}])
.directive('menuItem', ['$compile', function ($compile) {
	return appDirective.directiveMenuItem($compile);
}])
.directive('updatableText', ['$interval', function ($interval) {
	return appDirective.directiveUpdatableText($interval);
}])
.directive('textValue', [function () {
	return appDirective.directiveTextValue();
}])
.directive('messageLine', [function () {
	return appDirective.directiveMessageLine();
}])


.directive('smDatepicker', function () {
	return moduleUI.formsDirective.directiveDatePicker();
})
.directive('button', function () {
	return moduleUI.formsDirective.directiveButton();
})
.directive('formToolbox', function () {
	return moduleUI.formsDirective.directiveFormToolbox();
})
.directive('entityProperty', function () {
	return moduleUI.formsDirective.directiveEntityProperty();
})
.directive('entityEditForm', function () {
	return moduleUI.formsDirective.directiveEntityEditForm();
})
.directive('entityEditFormCol', ['$compile', function ($compile) {
	return moduleUI.formsDirective.directiveEntityEditFormCol($compile);
}])
.directive('entityEditFormRow', function () {
	return moduleUI.formsDirective.directiveEntityEditFormRow();
})
.directive('entityListForm', function () {
	return moduleUI.formsDirective.directiveEntityListForm();
})
;