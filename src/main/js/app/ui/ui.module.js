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
;