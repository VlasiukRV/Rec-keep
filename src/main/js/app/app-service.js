;
(function (exp) {
    if (!exp.appService) {
        exp.appService = new Object(null);
    }
    var appService = exp.appService;

    appService.dataStorage = function () {

        var appMetadataSet = null;

        var currentEntities = new Object(null);

        return {
            getAppMetadataSet: function () {
                return appMetadataSet;
            },
            setAppMetadataSet: function (metadataSet) {
                appMetadataSet = metadataSet;
            },

            setCurrentEntityByName: function (entityName, _date) {
                if(entityName !== undefined) {
                    currentEntities[entityName] = _date;
                }
            },
            getCurrentEntityByName: function (entityName) {
                if(entityName !== undefined) {
                    if (currentEntities[entityName] == null) {
                        currentEntities[entityName] = this.getNewEntityByName(entityName);
                    }
                    return currentEntities[entityName];
                }else{
                    return null;
                }
            },
            getNewEntityByName: function (entityName) {
                return this.getAppMetadataSet().getEntityInstance(entityName);
            }
        };
    };

////////////////////////////////////
// angular SERVICEs
////////////////////////////////////

    appService.setRoute = function ($routeProvider) {
        $routeProvider
            .when('/user', {
                templateUrl: '/appTaskList/security/usersList'
            })
            .when('/role', {
                templateUrl: '/appTaskList/security/roleList'
            })
            .when('/serviceTask', {
                templateUrl: '/appTaskList/serviceTaskList'
            })
            .when('/poultryCalendar', {
                templateUrl: '/appTaskList/poultryCalendarList'
            })
            .when('/farm', {
                templateUrl: '/appTaskList/farmsList'
            })            
            .when('/project', {
                templateUrl: '/appTaskList/projectsList'
            })
            .when('/task', {
                templateUrl: '/appTaskList/tasksList'
            })
            .when('/login', {
                templateUrl: '/login'
            })
            .when('/dashboard', {
                templateUrl: '/templates/appRoom/tasklist/app-template-dashboard.html'
            })
            .when('/currentPrincipalInformation', {
                templateUrl: '/appTaskList/currentPrincipalInformation'
            })
            .otherwise({
                redirectTo: '/appTaskList'
            })

        ;
        return $routeProvider;
    };

    appService.appHttpResponseInterceptor = function ($q, $location, errorDescriptions) {
        return {
            'request': function (config) {
                config.url = config.url.split('%2F').join('/');
                return config;
            },

            'response': function (response) {
                if (errorDescriptions) {
                    errorDescriptions.handleResponse(response);
                }
                if (typeof response.data === 'string') {
                    if (response.data.indexOf instanceof Function &&
                        response.data.indexOf('id="app-login-page"') !== -1) {
                        $location.path('/login');
                }
            }
            return response;
            },

        'responseError': function (response) {
            if (errorDescriptions) {
                errorDescriptions.handleResponse(response);
            }
            return $q.reject(response);
            }
        };
    };


})(window);