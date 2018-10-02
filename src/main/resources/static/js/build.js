;
(function (exp) {
    if (!exp.appUtils) {
        exp.appUtils = new Object(null);
    }
    var appUtils = exp.appUtils;

    appUtils.Class = function (Parent) {

        // prototype есть только в функции
        // При создании объекта через new, в его прототип __proto__ записывается ссылка из prototype
        var klass = function () {
            if (Parent) {
                // call object builder of parent
                Parent.prototype.$_buildObject.call(this, {});
            }
            // call object builder
            this.$_buildObject();
        };
        // object builder
        klass.prototype.$_buildObject = function () {
        };

        if (Parent) {
            // Inherit
            klass.prototype = Object.create(Parent.prototype);
            // save parent
            klass.prototype.$_parentClass = Parent;
        }

        // Add methods, fields for Klass
        klass.extend = function (obj) {
            var extended = obj.extended;
            for (var key in obj) {
                klass[key] = obj[key];
            }
            if (extended) extended(klass);
        };

        // Add methods for object
        klass.includeMthd = function (obj) {
            var included = obj.included;
            for (var key in obj) {
                klass.prototype[key] = obj[key];
                /*
                 // Вызов метода родителя у метода потомка
                 klass.prototype.run = function () {
                 // Вызов метода родителя внутри своего
                 Parent.prototype.run.apply(this);
                 // реализация метода
                 };
                 */
            }
            if (included) included(klass);
        };
        // Add fields for object
        klass.prototype.includeFd = function (obj) {
            var included = obj.included;
            for (var key in obj) {
                this[key] = obj[key];
            }
            if (included) included(klass);
        };
        // Add define fields for object
        klass.prototype.includeDefineFd = function (key, desc) {
            var description = {
                configurable: true,
                enumerable: true,
                get: function () {
                    return "";
                }
            };
            if (desc.enumerable) {
                description.enumerable = desc.enumerable;
            }
            if (desc.get) {
                description.get = desc.get;
            }

            Object.defineProperty(this, key, description);
        };

        return klass;
    };

    appUtils.makeDate = function (millisecond) {
        return new Date(millisecond);
    };

    appUtils.getClass = function (obj) {
        return {}.toString.call(obj).slice(8, -1);
    };

    appUtils.fillValuesProperty = function (source, receiver) {
        for (var key in source) {
            var sourceProperty = source[key];
            if (!(key in receiver)) {
                continue;
            }
            if (key.indexOf("$$") >= 0) {
                continue;
            }
            if (typeof sourceProperty == 'function') {
                continue;
            }

            if (angular.isDate(sourceProperty)) {
                receiver[key] = sourceProperty;
            } else if (angular.isArray(sourceProperty)) {
                var  isload = false;
                if(receiver[key]){
                    if (receiver[key].fillByTemplate) {
                        receiver[key].fillByTemplate(sourceProperty);
                        isload = true;
                    }
                } else {
                    receiver[key] = [];
                }
                if (sourceProperty.fillByTemplate) {
                    receiver[key].fillByTemplate = sourceProperty.fillByTemplate;
                    receiver[key].fillByTemplate(sourceProperty);
                } else {
                    if (!isload) {
                        receiver[key] = sourceProperty;
                    }
                }
                if (sourceProperty.representationList) {
                    receiver[key].representationList = sourceProperty.representationList;
                }

            } else if (sourceProperty == null) {
                receiver[key] = sourceProperty;
            } else if (typeof sourceProperty === 'object') {
                if (receiver[key]) {

                } else {
                    receiver[key] = {};
                }
                appUtils.fillValuesProperty(sourceProperty, receiver[key]);
            } else {
                receiver[key] = sourceProperty;
            }
        }
        return receiver;
    };

    // ToDo
    appUtils.fillAllValuesProperty = function (source, receiver) {
        for (var key in source) {
            var sourceProperty = source[key];
            if (key.indexOf("$$") >= 0) {
                continue;
            }

            if (angular.isDate(sourceProperty)) {
                receiver[key] = sourceProperty;
            } else if (angular.isArray(sourceProperty)) {
                if (receiver[key]) {

                }else {
                    receiver[key] = [];
                }
                if (sourceProperty.fillByTemplate) {
                    receiver[key].fillByTemplate = sourceProperty.fillByTemplate;
                    receiver[key].fillByTemplate(sourceProperty);
                } else {
                    receiver[key] = sourceProperty;
                }
                if (sourceProperty.representationList) {
                    receiver[key].representationList = sourceProperty.representationList;
                }
            } else if (sourceProperty == null) {
                receiver[key] = sourceProperty;
            } else if (typeof sourceProperty === 'object') {
                if (receiver[key]) {

                } else {
                    receiver[key] = {};
                }
                appUtils.fillAllValuesProperty(sourceProperty, receiver[key]);
            } else {
                receiver[key] = sourceProperty;
            }
        }
        return receiver;
    };

    appUtils.clearProperties = function (o) {
        for (var key in o) {
            var property = o[key];
            if (typeof property === 'number') {
                property = 0;
            } else if (typeof property === 'string') {
                property = "";
            } else if (typeof property === 'boolean') {
                property = false;
            } else if (this.getClass(property) === 'Date') {
                property = new Date();
            } else if (typeof property === 'object') {
                this.clearProperties(property);
            }
        }
    };

    if ([].indexOf) {
        appUtils.find = function (array, value) {
            return array.indexOf(value);
        };
    } else {
        appUtils.find = function (array, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === value) return i;
            }

            return -1;
        };
    }

    appUtils.ucFirst = function (str) {
        if (!str) {
            return str;
        }

        return str[0].toUpperCase() + str.slice(1);
    };

    appUtils.log = function () {
        if (typeof console == "undefined") return;

        var args = jQuery.makeArray(arguments);
        args.unshift("(App:)");
        console.log.apply(console, args);
    };

})(window);

;
(function (exp) {
    if(!exp.appDirective){
        exp.appDirective = new Object(null);
    }
    var appDirective = exp.appDirective;

    appDirective.directiveLoginPage = function () {

        return {
            restrict: 'E',
            require: '',
            replace: true,
            templateUrl: '/templates/appRoom/tasklist/directive/app-template-form-login.html',
            scope: {
                eventAfterLogin: "&"
            },
            controller: ['$http', '$rootScope', '$scope', 'dataStorage', function ($http, $rootScope, $scope, dataStorage) {
                $scope.credentials = {};
                $scope.login = function () {
                    var appMetadataSet = dataStorage.getAppMetadaSet();
                    if (appMetadataSet) {
                        var principal = appMetadataSet.userInterface.security.principal;
                        if (principal) {
                            principal.login($http, $scope.credentials, function (data) {
                                if (data.authenticated) {
                                    $scope.eventAfterLogin();
                                }
                            });
                        }
                    }
                };
            }]
        }
    };

    appDirective.directiveMessageLine = function () {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/app-template-message-line.html',
            scope: {
                errorDescriptions: "="
            },
            link: function (scope, element, attrs) {

            },
            controller: ['$scope', 'dataStorage', function ($scope, dataStorage) {
                $scope.updateErrorDescription = function () {
                    $scope.errorDescriptions = dataStorage.getErrorDescriptions();
                };
                $scope.deleteErrorDescription = function (index) {
                    $scope.errorDescriptions.delErrorDescription(index);
                    if ($scope.errorDescriptions.errorsCount() == 0) {
                        $scope.errorDescriptions.show = false;
                    }
                };
            }]
        }
    };

    appDirective.directiveMenuBar = function () {
        return {
            restrict: 'E',
            require: '',
            replace: true,
            templateUrl: '/templates/appRoom/tasklist/directive/app-template-menu-bar.html',
            scope: {
                menuBar: "="
            }
        }
    };

    appDirective.directiveMenuCollection = function () {
        return {
            restrict: 'E',
            require: '',
            replace: true,
            templateUrl: '/templates/appRoom/tasklist/directive/app-template-menu-collection.html',
            scope: {
                menuCollection: "=",
                command: "="
            }
        }
    };

    appDirective.directiveMenuItem = function ($compile) {
        return {
            restrict: 'E',
            require: '',
            replace: true,
            templateUrl: '/templates/appRoom/tasklist/directive/app-template-menu-item.html',
            scope: {
                command: "="
            },
            link: function (scope, element, attrs) {
                if (scope.command.dropdownMenu) {
                    var e = $compile("<menu-collection command = 'command' menu-collection='command.commandList'></menu-collection>")(scope);
                    element.replaceWith(e);
                }
            },
            controller: ['$scope', '$window', '$location', function ($scope, $window, $location) {
                $scope.commandHandler = function () {
                    if (typeof($scope.command.command) == 'string') {
                        $location.url($scope.command.command);
                    } else {
                        $scope.command.command();
                    }
                };
            }]
        }
    };

    appDirective.directiveUpdatableText = function ($interval) {
        return {
            restrict: 'E',
            scope: {
                fCallBack: "&"
            },
            link: function link(scope, element, attrs) {
                var timeoutId;

                var updateText = function updateText() {
                    element.text(scope.fCallBack());
                };

                scope.$watch(attrs.smCurrentTime, function () {
                    updateText();
                });

                element.on('$destroy', function () {
                    $interval.cancel(timeoutId);
                });

                // start the UI update process; save the timeoutId for canceling
                timeoutId = $interval(function () {
                    updateText(); // update DOM
                }, 1000);
            }

        };
    };

    appDirective.directiveCurrentTime = function ($interval, dateFilter) {
        return {
            link: function link(scope, element, attrs) {
                var format = 'M/d/yy h:mm:ss a';
                var timeoutId;

                var updateTimer = function () {
                    element.text(dateFilter(new Date(), format));
                };

                scope.$watch(attrs.smCurrentTime, function () {
                    updateTimer();
                });

                element.on('$destroy', function () {
                    $interval.cancel(timeoutId);
                });

                // start the UI update process; save the timeoutId for canceling
                timeoutId = $interval(function () {
                    updateTimer(); // update DOM
                }, 1000);
            }

        };
    }

})(window);
;
(function(exp) {
    if(!exp.appDirective){
        exp.appDirective = new Object(null);
    }
    var formsDirective = new Object(null);
    exp.appDirective.formsDirective = formsDirective;

    formsDirective.directiveButton = function () {
        return {
            restrict: 'E',
            compile: function (element, attrs) {
                element.addClass('btn');
                if (attrs.type === 'submit') {
                    element.addClass('btn-primary');
                } else {
                    element.addClass('btn-default');
                }
                if (attrs.size) {
                    element.addClass('btn-' + attrs.size);
                }
            }
        }
    };

    formsDirective.directiveDatePicker = function () {

        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {

                //model -> view
                ngModelCtrl.$formatters.push(function (date) {
                        date = new Date(date);
                        if (angular.isDefined(date) &&
                            date !== null && !angular.isDate(date)) {
                            throw new Error('ng-Model value must be a Date object');
                        }
                        return date;
                    }
                );

                //view -> model
                ngModelCtrl.$parsers.push(function (viewValue) {
                        return viewValue.getTime();
                    }
                );
            }
        };
    };

    function refreshSelectList (scope) {
        if (scope.property == undefined) {
            return;
        }
        if (scope.property.inputType == "enum") {
            if (scope.property.entityListService()) {
                scope.selectList = scope.property.entityListService().list
            }
        } else if (scope.property.inputType == "select" || scope.property.inputType == "multiselect") {
            if (scope.property.entityListService()) {
                scope.selectList = scope.property.entityListService().list
            }
        }
    }

    formsDirective.directiveEntityProperty = function () {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/entityEditDirective/app-template-entity-property.html ',
            scope: {
                entity: '=',
                property: '='
            },
            link: function (scope, element, attrs) {
                refreshSelectList(scope);
            },
            controller: ['$scope', function ($scope) {
                $scope.refreshSelectList = refreshSelectList($scope);
                $scope.propertyChanged = function () {
                }
            }]
        }
    };

    formsDirective.directiveEntityEditForm = function () {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/entityEditDirective/app-template-entity-edit-form.html ',
            scope: {
                entityEditForm: "="
            },
            link: function (scope, element, attrs) {

            },
            controller: ['$scope', function ($scope) {
                $scope.closeForm = function () {
                    $scope.entityEditForm.eventCloseForm();
                };
                $scope.updateForm = function () {
                    $scope.entityEditForm.eventUpdateForm();
                };
                $scope.createEntity = function () {
                    $scope.entityEditForm.eventCreateEntity($scope.entityEditForm.currentEntity);
                };
            }]
        }
    };

    formsDirective.directiveEntityEditFormRow = function () {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/entityEditDirective/app-template-entity-edit-form-row.html ',
            scope: {
                entityfieldsrow: "=",
                entityeditform: "="
            },
            link: function (scope, element, attrs) {
            }
        }
    };

    formsDirective.directiveEntityEditFormCol = function ($compile) {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/entityEditDirective/app-template-entity-edit-form-col.html ',
            scope: {
                fieldplacing: "=",
                entityeditform: "="
            },
            link: function (scope, element, attrs) {
                if (angular.isArray(scope.fieldplacing.editFieldId)) {
                    var e = $compile("" +
                        "<div ng-repeat='entityfieldsrow in fieldplacing.editFieldId track by $index'>" +
                        "<entity-edit-form-row entityfieldsrow='entityfieldsrow' entityeditform='entityeditform'> " +
                        "</entity-edit-form-row>" +
                        "</div>"
                    )(scope);
                    element.replaceWith(e);
                }
            }
        }
    };

    formsDirective.directiveEntityListForm = function () {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/entityEditDirective/app-template-entity-list-form.html ',
            scope: {
                entityListForm: "="
            },
            link: function (scope, element, attrs) {

            },
            controller: ['$scope', function ($scope) {
                $scope.closeForm = function () {
                    $scope.entityListForm.eventCloseForm();
                };
                $scope.updateForm = function () {
                    $scope.entityListForm.eventUpdateForm();
                    $scope.entityListForm.entities = $scope.entityListForm.appMetadataSet.getEntityList($scope.entityListForm.metadataName).list;
                };
                $scope.findEntity = function (searchEx) {
                    $scope.entityListForm.eventFindEntity(searchEx);
                    $scope.entityListForm.entities = $scope.entityListForm.appMetadataSet.getEntityList($scope.entityListForm.metadataName).list;
                };
                $scope.addNewEntity = function () {
                    $scope.entityListForm.eventAddNewEntity();
                };
                $scope.deleteEntity = function (id) {
                    $scope.entityListForm.eventDeleteEntity(id);
                };
                $scope.editEntity = function (id) {
                    $scope.entityListForm.eventEditEntity(id);
                };
            }]
        }
    }

})(window);
;
(function (exp) {
    if (!exp.appService) {
        exp.appService = new Object(null);
    }
    var appService = exp.appService;

    appService.dataStorage = function (_appConfig) {

        var appConfig = _appConfig;
        var appMetadataSet = null;

        var currentEntities = new Object(null);

        return {
            getAppConfig: function () {
                return appConfig;
            },
            getAppMetadaSet: function () {
                return appMetadataSet;
            },
            setAppMetadataSet: function (metadataSet) {
                appMetadataSet = metadataSet;
            },

            setCurrentEntityByName: function (entityName, _date) {
                if(entityName != undefined) {
                    currentEntities[entityName] = _date;
                }
            },
            getCurrentEntityByName: function (entityName) {
                if(entityName != undefined) {
                    if (currentEntities[entityName] == null) {
                        currentUser = this.getNewEntityByName(entityName);
                    }
                    return currentEntities[entityName];
                }else{
                    return null;
                }
            },
            getNewEntityByName: function (entityName) {
                return this.getAppMetadaSet().getEntityInstance(entityName);
            }
        };
    };

////////////////////////////////////
// angular SERVICEs
////////////////////////////////////

    appService.appEnvironment = function ($location, appConfig) {
        var location = $location;
        return {
            getAppHttpUrl: function getAppHttpUrl(urlSuffix) {
                var appAddress = "http://" + location.$$host + ":" + location.$$port;

                return appAddress + "/" + appConfig.appName + urlSuffix;
            }
        }
    };

    appService.setRoute = function (routeProvider) {
        routeProvider
            .when('/login', {
                templateUrl: '/login'
            })
            .when("/user", {
                templateUrl: "/appTaskList/security/usersList"
            })
            .when("/role", {
                templateUrl: "/appTaskList/security/roleList"
            })
            .when("/farm", {
                templateUrl: '/appTaskList/farmsList'
            })            
            .when("/project", {
                templateUrl: '/appTaskList/projectsList'
            })
            .when("/task", {
                templateUrl: "/appTaskList/tasksList"
            })
            .when("/currentPrincipalInformation", {
                templateUrl: "/appTaskList/currentPrincipalInformation"
            })
            .when("/cashFlow", {
                templateUrl: "/appCashAccounting/cashFlowList"
            })
            .when("/cashFlowItem", {
                templateUrl: "/appCashAccounting/cashFlowItemList"
            })

        ;
        return routeProvider;
    };

    appService.appHttpResponseInterceptor = function ($q, dataStorage) {
        return {
            'request': function (config) {
                config.url = config.url.split('%2F').join('/');
                return config;
            },

            'response': function (response) {
                var appMetadataSet = dataStorage.getAppMetadaSet();
                if (appMetadataSet) {
                    var errorDescriptions = appMetadataSet.userInterface.errorDescriptions;
                    if (errorDescriptions) {
                        errorDescriptions.handleResponse(response);
                    }
                }
                return response;
            },

            'responseError': function (response) {
                var appMetadataSet = dataStorage.getAppMetadaSet();
                if (appMetadataSet) {
                    var errorDescriptions = appMetadataSet.userInterface.errorDescriptions;
                    if (errorDescriptions) {
                        errorDescriptions.handleResponse(response);
                    }
                }
                return $q.reject(response);
            }
        };
    };

    appService.entityEditService = function (resource, appEnvironment) {
        return resource(
            appEnvironment.getAppHttpUrl('/entity/:entityName/:entityId'),
            {
                entityName: "@entityName",
                entityId: "@entityId"
            },
            {
                getEntity: {
                    method: "GET"
                },
                createEntity: {
                    method: "POST"
                },
                deleteEntity: {
                    method: "DELETE"
                }
            }
        );
    };

    appService.securityService = function (resource, appEnvironment) {
        return resource(
            appEnvironment.getAppHttpUrl('/system/security/:command'),
            {
                sessionID: "@sessionID"
            },
            {
                getAllPrincipals: {
                    method: "GET",
                    params: {
                        command: "getAllPrincipals"
                    }
                },
                getSessionInformation: {
                    method: "GET",
                    params: {
                        command: "getSessionInformation"
                    }
                }
            }
        );
    };

    appService.operationService = function (resource, appEnvironment) {
        return resource(
            appEnvironment.getAppHttpUrl('/service/:command'),
            {
                command: "@command"
            },
            {
                executeCommand: {
                    method: "GET"
                }
            }
        );
    };

    appService.systemService = function (resource, appEnvironment) {
        return resource(
            appEnvironment.getAppHttpUrl('/system/:command'),
            {
                command: "@command"
            },
            {
                executeCommand: {
                    method: "GET"
                }
            }
        );
    };

    appService.resourceService = function (_entityEditService, _systemService, _securityService, _operationService) {

        var entityEditService = _entityEditService;
        var systemService = _systemService;
        var securityService = _securityService;
        var operationService = _operationService;

        return {
            getEntityEditService: function () {
                return entityEditService;
            },
            getSystemService: function () {
                return systemService;
            },
            getSecurityService: function () {
                return securityService;
            },
            getOperationService: function () {
                return operationService;
            }
        };
    }

////////////////////////////////////
// UTILS
////////////////////////////////////

    appService.ExecuteSystemCommand = function (resourceService, command) {
        var systemService = resourceService.getSystemService();
        systemService.executeCommand({command: command}, {});
    };

    appService.ExecuteServiceCommand = function (resourceService, command) {
        var operationService = resourceService.getOperationService();
        operationService.executeCommand({command: command}, {});
    };

////////////////////////////////////
// App metadata
////////////////////////////////////

    // Abstract model of application interface
    var appInterface = Object.create(null);
    (function () {

        var Principal = appUtils.Class();
        (function () {
            Principal.prototype.$_buildObject = function () {
                this.includeFd({
                    authenticated: false,
                    name: 'NO_Authentication',
                    sessionId: null,
                    authorities: [],
                    currentUserId: 0,
                    currentUser: {}
                })
            };
            var setNotAuthenticated = function (currentPrincipal) {
                currentPrincipal.authenticated = false;
                currentPrincipal.name = 'NO_Authentication';
                currentPrincipal.sessionId = null;
                currentPrincipal.authorities = [];
                currentPrincipal.currentUserId = 0;
                currentPrincipal.currentUser = {};
            };
            var authenticate = function ($http, credentials, callback) {

                var principal = undefined;
                var headers = credentials ? {
                    authorization: "Basic "
                    + btoa(credentials.username + ":"
                    + credentials.password)
                } : {};

                $http.get('/appTaskList/service/authenticate', {
                    headers: headers
                })
                    .then(function (response) {
                        if (response.data.status == 200) {
                            var principal = response.data.data;
                        }
                        callback && callback({authenticated: true, principal: principal});
                    }, function () {
                        callback && callback({authenticated: false, principal: principal});
                    }
                );
            };
            Principal.includeMthd({
                logout: function ($http) {
                    var self = this;
                    $http.post('/appTaskList/logout', {}).finally(function () {
                        self.authenticated = false;
                        setNotAuthenticated(self);
                    });
                },
                login: function ($http, credentials, callback) {
                    var self = this;
                    authenticate($http, credentials, function (data) {
                        if (data.authenticated) {
                            console.log("Login succeeded");
                            credentials.error = false;
                        } else {
                            console.log("Login failed");
                            credentials.error = true;
                        }
                        self.setAuthenticated(data.principal);
                        callback && callback(self);
                    })
                },
                getSessionInformation: function (resourceService, $cookies) {
                    var securityService = resourceService.getSecurityService();

                    var currentPrincipal = this;
                    securityService.getSessionInformation({}, {}, function (response) {
                        if (response.status == 200) {
                            var data = response.data;
                            currentPrincipal.setAuthenticated(data);
                        }
                    })
                },
                updatePrincipalUser: function (appMetadataSet) {
                    var self = this;
                    appMetadataSet.metadataEvents.publish("ev:entityList:" + "user" + ":update", function () {
                        var entityList = appMetadataSet.getEntityList("user");
                        if (entityList) {
                            self.currentUser = entityList.findEntityById(self.currentUserId);
                        }
                    });
                },
                setAuthenticated: function (data) {
                    setNotAuthenticated(self);
                    if (data != undefined) {
                        this.authenticated = true;
                        this.name = data.userName;
                        this.sessionId = data.sessionId;
                        this.authorities = data.authorities;
                        this.currentUserId = data.currentUserId;
                    }
                }
            });
        })();

        var ErrorDescription = appUtils.Class();
        (function () {
            ErrorDescription.prototype.$_buildObject = function () {
                this.includeFd({
                    error: false,
                    status: 0,
                    statusText: "",
                    type: 'success'
                })
            };
            ErrorDescription.includeMthd({
                SetHTTPError: function (statusText, status) {
                    this.error = true;
                    this.status = status;
                    this.statusText = "HTTP error: " + statusText;
                },
                SetNoError: function () {
                    this.error = false;
                    this.status = 200;
                    this.statusText = "";
                },
                SetAppError: function (statusText) {
                    this.error = true;
                    this.status = 0;
                    this.statusText = "App error: " + statusText;
                }
            });
        })();

        var ErrorDescriptions = appUtils.Class();
        (function () {
            ErrorDescriptions.prototype.$_buildObject = function () {
                this.includeFd({
                    errorDescriptions: [],
                    show: false
                });
            };
            ErrorDescriptions.includeMthd({
                handleResponse: function (response) {
                    var errorDescription = new ErrorDescription();
                    errorDescription.SetNoError();
                    if ((response.status == 200) ||
                        (response.status == 404) ||
                        (response.status == 403)
                    ) {
                        var objectResponse = response.data;
                        if (objectResponse instanceof Object) {
                            if ("message" in objectResponse && "status" in objectResponse) { //ToDo
                                if (response.data.status != 200) {
                                    errorDescription.SetAppError(objectResponse.message);
                                }
                            }
                        } else if (response.status != 200) {
                            objectResponse = eval("(" + response.data + ")");
                            errorDescription.SetAppError(objectResponse.message);
                        }
                    } else {
                        errorDescription.SetHTTPError(response.statusText, response.status);
                    }
                    if (errorDescription.error) {
                        this.addErrorDescription(errorDescription);
                        this.show = true;
                    }
                },
                addErrorDescription: function (_data) {
                    this.errorDescriptions.push(_data);
                },
                delErrorDescription: function (index) {
                    this.errorDescriptions.splice(index, 1);
                },
                getErrorDescriptions: function () {
                    return this.errorDescriptions;
                },
                errorsCount: function () {
                    return this.errorDescriptions.length;
                }
            });
        })();

        var EditForm = appUtils.Class();
        (function () {
            EditForm.prototype.$_buildObject = function () {
                this.includeFd({
                    editFormName: "<--label for form-->",
                    formProperties: {},
                    formPropertiesPlacing: {},

                    eventCloseForm: function () {
                    },
                    eventUpdateForm: function () {
                    }
                });
            };
        })();

        var EntityEditForm = appUtils.Class(EditForm);
        (function () {
            EntityEditForm.prototype.$_buildObject = function () {
                this.includeFd({
                    currentEntity: {},

                    eventCreateEntity: function () {
                    }
                });
            };
        })();

        var EntityListForm = appUtils.Class(EditForm);
        (function () {
            EntityListForm.prototype.$_buildObject = function () {
                this.includeFd({
                    entities: [],

                    eventAddNewEntity: function () {
                    },
                    eventDeleteEntity: function (id) {
                    },
                    eventEditEntity: function (id) {
                    },
                    eventFindEntity: function () {

                    }
                });
            };
        })();

        var MenuCommand = appUtils.Class();
        (function () {
            MenuCommand.prototype.$_buildObject = function () {
                this.includeFd({
                    commandName: "",

                    dropdownMenu: false,
                    text: "",
                    command: null,
                    commandList: []
                })
            };
            MenuCommand.includeMthd({
                addCommand: function (command) {
                    this.commandList.push(command);
                    return this;
                },
                getSubMenu: function (commandName) {
                    for (var i = 0; i < this.commandList.length; i++) {
                        var currentCommand = this.commandList[i];
                        if (currentCommand.commandName === commandName) {
                            return currentCommand;
                        }
                        if (currentCommand.commandList.length > 0) {
                            return currentCommand.getSubMenu(commandName);
                        }
                    }
                    return undefined;
                }
            });

        }());

        var UserInterface = appUtils.Class();
        (function () {
            UserInterface.prototype.$_buildObject = function () {
                this.includeFd({
                    security: {
                        principal: new Principal()
                    },
                    errorDescriptions: new ErrorDescriptions(),
                    commandBar: {
                        mainUrl: '#',
                        commandBar: new MenuCommand()
                    },
                    appMetadataSet: null
                });
            };
            UserInterface.includeMthd({
                commandBarSetMainUrl: function (mainUrl) {
                    this.commandBar.mainUrl = mainUrl;
                    return this;
                },
                commandBarAddCommand: function (command) {
                    this.commandBar.commandList.push(command);
                    return this;
                },
                editFormGetEntityEditForm: function () {
                    return new EntityEditForm();
                },
                editFormGetEntityListForm: function () {
                    return new EntityListForm();
                }
            })
        }());

        appInterface.UserInterface = UserInterface;
        appInterface.getNewEntityCommand = function (commandName, text) {
            var command = new MenuCommand();
            command.dropdownMenu = false;
            command.commandName = commandName;
            command.text = text;
            command.command = commandName;

            return command;
        };
        appInterface.getNewDropdownCommand = function (commandName, text) {
            var command = new MenuCommand();
            command.dropdownMenu = true;
            command.commandName = commandName;
            command.text = text;
            return command;
        };
        appInterface.getNewCommand = function (commandName, text, functionCommand) {
            var command = new MenuCommand();
            command.dropdownMenu = false;
            command.commandName = commandName;
            command.text = text;
            command.command = functionCommand;

            return command;
        };

    }());

    // Abstract model of application
    var abstractAppModel = Object.create(null);
    (function () {

        var MetadataEvents = appUtils.Class();
        (function () {
            MetadataEvents.prototype.$_buildObject = function () {
                this.includeFd({
                    events: $({})
                });
            };
            MetadataEvents.includeMthd({
                subscribe: function () {
                    this.events.bind.apply(this.events, arguments);
                },
                unSubscribe: function () {
                    this.events.unbind.apply(this.events, arguments);
                },
                publish: function () {
                    this.events.trigger.apply(this.events, arguments);
                }
            });
        })();
        var metadataEventsImpl = new MetadataEvents();

        // Abstract model of entity
        var Entity = appUtils.Class();
        (function () {
            Entity.prototype.includeEntityFd = function (fd, entityFd, defineFd) {
                var strEntityFd = "";
                this.includeFd({entityFd: ""});
                if (fd) {
                    this.includeFd(fd);
                }
                if (entityFd) {
                    this.includeFd(entityFd);
                    for (var key in entityFd) {
                        strEntityFd = "" + strEntityFd + ", " + key;
                    }
                    if (strEntityFd.length > 0) strEntityFd = strEntityFd.slice(2);
                    this.includeFd({entityFd: strEntityFd});
                }
                if (defineFd) {
                    for (var key in defineFd) {
                        this.includeDefineFd(key, defineFd[key])
                    }
                }
            };

            Entity.prototype.$_buildObject = function () {
                this.includeEntityFd(
                    {
                        // object field
                        metadataName: ""
                    }, {
                        // entity field
                        id: null,
                        description: ""
                    }, {
                        // define field
                        representation: {
                            enumerable: true,
                            get: function () {
                                if (this.name) {
                                    return "" + this.name;
                                } else {
                                    return "entity [" + this.metadataName + "] id: " + this.id + "";
                                }
                            }
                        }
                    }
                );

            };

            Entity.includeMthd({
                isEmpty: function () {
                    // ToDo write what attribute of empty entity
                    return this.id == 0 || this.id == null;
                },

                translateToEntityJSON: function () {
                    var replacer = this.entityFd.split(", ");
                    return JSON.stringify(this, replacer);
                },

                createEntity: function (fCallBack) {
                    if (!this.metadataName) {

                    }
                    var entityJSON = this.translateToEntityJSON();
                    abstractAppModel.resourceService.getEntityEditService().createEntity(
                        {entityName: this.metadataName}, entityJSON,
                        baseCreateEntity.bind(this, fCallBack),
                        function (httpResponse) {
                            /*resourceService.collError(httpResponse)*/
                        }
                    )
                }

            });
            var baseCreateEntity = function () {
                var fCallBack = arguments[0];
                var data = arguments[1];

                if (data.result = 200) {
                    var originalEntity = data.data;
                    if (originalEntity) {
                        appUtils.fillValuesProperty(originalEntity, this);
                        fCallBack(this);
                    }
                }
            };
        })();

        // Abstract model of entity list
        var EntityList = appUtils.Class();
        (function () {
            EntityList.prototype.$_buildObject = function () {
                this.includeFd(
                    {
                        metadataName: "",
                        list: [],
                        metadataObject: null
                    });
            };
            var updateEnt = function (fCallBack, data) {
                /*
                 var fCallBack = arguments[0];
                 var data = arguments[1];
                 */

                if (data.result = 200) {
                    var originalUserList = data.data;
                    if (originalUserList) {
                        originalUserList.forEach(function (item, i, arr) {
                            var entity = this.metadataObject.getEntityInstance();
                            appUtils.fillValuesProperty(item, entity);
                            this.addEntity(entity);
                        }, this);
                    }
                    console.log("Update " + this.metadataObject.metadataName);
                }

                if (fCallBack) {
                    fCallBack(this);
                }
            };

            var deleteEnt = function () {
                var id = arguments[0];
                var fCallBack = arguments[1];
                var data = arguments[2];

                if (data.result = 200) {
                    this.list.forEach(function (item, i) {
                        if (item.id == id) {
                            this.list.splice(i, 1);
                            return true;
                        }
                    }, this);
                }

                if (fCallBack) {
                    fCallBack(this);
                }
            };

            EntityList.includeMthd({
                addEntity: function (entity) {
                    var entityAdded = false;
                    for (var index = 0; index < this.list.length; ++index) {
                        var item = this.list[index];
                        if (item.id === entity.id) {
                            this.list[index] = entity;
                            entityAdded = true;
                            return;
                        }
                    }
                    if (!entityAdded) {
                        this.list.push(entity);
                    }
                },
                findEntityById: function (id) {
                    for (var index = 0; index < this.list.length; ++index) {
                        var item = this.list[index];
                        if (item.id === id) {
                            return item;
                        }
                    }
                    return undefined;
                },
                addEntityByTemplate: function (template, fCallBack) {
                    var entity = null;
                    if (template.isEmpty()) {
                        entity = this.metadataObject.getEntityInstance(this.metadataName);
                    } else {
                        entity = this.findEntityById(template.id);
                    }

                    var entityList = this;
                    appUtils.fillValuesProperty(template, entity);
                    entity.createEntity(function (data) {
                        entityList.addEntity(data);
                        fCallBack();
                    });
                },
                update: function (fCallBack) {
                    var self = this;
                    self.list = [];
                    abstractAppModel.resourceService.getEntityEditService()
                        .getEntity({entityName: this.metadataName}, {},
                        function (data) {
                            updateEnt.call(self, fCallBack, data)
                        },
                        function (httpResponse) {
                            /*resourceService.collError(httpResponse)*/
                        }
                    );
                },
                findEntity: function (searchEx, fCallBack) {
                    var self = this;
                    self.list = [];
                    abstractAppModel.resourceService.getEntityEditService()
                        .getEntity({entityName: this.metadataName, search: searchEx}, {},
                        function (data) {
                            updateEnt.call(self, fCallBack, data)
                        },
                        function (httpResponse) {
                            /*resourceService.collError(httpResponse)*/
                        }
                    );
                },
                deleteEntity: function (id, fCallBack) {
                    abstractAppModel.resourceService.getEntityEditService()
                        .deleteEntity({entityName: this.metadataName, entityId: id}, {},
                        deleteEnt.bind(this, id, fCallBack),
                        function (httpResponse) {
                            /*resourceService.collError(httpResponse)*/
                        }
                    )
                }

            })
        })();

        // Abstract model of enums
        var Enum = appUtils.Class();
        (function () {
            Enum.prototype.$_buildObject = function () {
                this.includeFd(
                    {
                        metadataName: "",
                        list: {}
                    });
            };

            Enum.includeMthd({
                update: function () {
                    var source = this;
                    abstractAppModel.resourceService.getEntityEditService()
                        .getEntity({entityName: "enum", entityId: this.metadataName}, {},
                        function (data) {
                            source.list = data.data;
                        },
                        function (httpResponse) {
                            /*resourceService.collError(httpResponse)*/
                        }
                    );
                }
            });

        })();

        // Abstract model of entity field
        var MetadataEditField = appUtils.Class();
        (function () {
            MetadataEditField.prototype.$_buildObject = function () {
                this.includeFd({
                    name: "",
                    inputType: "text",
                    label: "<--label for property-->",

                    entityListService: {},

                    availability: true,

                    visibility: true,
                    availabilityInEditForm: true,
                    visibilityInEditForm: true,
                    availabilityInListForm: true,
                    visibilityInListForm: true
                })
            };
            MetadataEditField.includeMthd({
                buildEditField: function (fieldDescription, name) {
                    if (name) {
                        this.name = name;
                    } else {
                        if (fieldDescription.name) {
                            this.name = fieldDescription.name;
                        }
                    }
                    if (fieldDescription.inputType) {
                        this.inputType = fieldDescription.inputType;
                    }
                    if (fieldDescription.label) {
                        this.label = fieldDescription.label;
                    } else {
                        this.label = this.name;
                    }
                    if (fieldDescription.availability) {
                        this.availability = fieldDescription.availability;
                    }
                    if (fieldDescription.entityListService) {
                        this.entityListService = fieldDescription.entityListService;
                    }
                }
            })
        })();

        var MetadataObject = appUtils.Class();
        (function () {
            MetadataObject.prototype.$_buildObject = function () {
                this.includeFd({
                    metadataName: "",

                    representation: "",
                    description: "",
                    image: null,

                    metadataEditFieldsSet: [],
                    fmEditForm: {
                        metadataEditFieldsSet: {},
                        metadataEditFieldsPlacing: []
                    },
                    fmListForm: {
                        metadataEditFieldsSet: [],
                        metadataFilterFieldsSet: []
                    }
                })
            };
            MetadataObject.includeMthd({
                getEntityInstance: function () {
                    return null;
                },
                installMetadata: function (metadataName, fnGetEntityInstance, representation, description, image) {
                    this.metadataName = metadataName;
                    this.getEntityInstance = fnGetEntityInstance;

                    if (representation) {
                        this.representation = representation;
                    }
                    if (description) {
                        this.description = description;
                    }
                    if (image) {
                        this.image = image;
                    }

                },
                bookEntityForms: function (_metadataEditFieldsSet, _metadataFilterFieldsSet, _editFieldsPlacing) {
                    var i;
                    if (_editFieldsPlacing) {
                        this.fmEditForm.metadataEditFieldsPlacing = _editFieldsPlacing;
                    }
                    if (_metadataEditFieldsSet) {
                        var editField = undefined;

                        for (i = 0; i < _metadataEditFieldsSet.length; i++) {
                            editField = _metadataEditFieldsSet[i];

                            if (editField.availability) {
                                this.metadataEditFieldsSet.push(editField);
                            }
                        }

                        for (i = 0; i < this.metadataEditFieldsSet.length; i++) {
                            editField = this.metadataEditFieldsSet[i];

                            if (editField.availabilityInEditForm) {
                                this.fmEditForm.metadataEditFieldsSet[editField.name] = editField;
                            }
                            if (editField.availabilityInListForm) {
                                this.fmListForm.metadataEditFieldsSet.push(editField);
                            }
                        }
                    }
                    if (_metadataFilterFieldsSet) {
                        for (i = 0; i < _metadataEditFieldsSet.length; i++) {
                            editField = _metadataEditFieldsSet[i];
                            /*if (appUtils.find(this.fmListForm.metadataEditFieldsSet, editField) > 0) {*/
                            this.fmListForm.metadataFilterFieldsSet.push(editField);
                            /*}*/
                        }
                    }
                }
            })
        })();

        var MetadataEntitySpecification = appUtils.Class();
        (function () {
            MetadataEntitySpecification.prototype.$_buildObject = function () {
                this.includeFd({
                    metadataName: "",
                    metadataRepresentation: "",
                    metadataDescription: "",
                    entityField: {
                        objectField: {},
                        entityField: {},
                        defineField: {}
                    },
                    entityFieldsPlacing: []
                })
            };
            MetadataEntitySpecification.includeMthd({
                getObjectFields: function () {
                    var objectFields = this.entityField.objectField;
                    objectFields.metadataName = this.metadataName;
                    return objectFields;
                },
                getEntityFields: function () {
                    var source = this.entityField.entityField;
                    var entityFields = {};
                    for (var key in source) {
                        if (angular.isArray(source[key].value)) {
                            entityFields[key] = [];
                            // ToDo
                            if (source[key].value.fillByTemplate) {
                                entityFields[key].fillByTemplate = source[key].value.fillByTemplate;
                            }
                            if (source[key].value.representationList) {
                                entityFields[key].representationList = source[key].value.representationList;
                                /*entityFields[key].representationList = source[key].representationList;*/
                            }
                        } else if (typeof source[key].value === 'object') {
                            if (source[key].fieldDescription && source[key].fieldDescription.getInstance) {
                                entityFields[key] = source[key].fieldDescription.getInstance();
                            } else {
                                entityFields[key] = {};
                            }
                        }
                        else {
                            entityFields[key] = source[key].value;
                        }
                    }
                    return entityFields;
                },
                getEntityFieldsDescription: function () {
                    var source = this.entityField.entityField;
                    var entityFieldsDescription = [];
                    for (var key in source) {
                        var metadataEditField = new MetadataEditField();
                        metadataEditField.buildEditField(source[key].fieldDescription, key);
                        entityFieldsDescription.push(metadataEditField);
                    }
                    return entityFieldsDescription;
                },
                getEntityFieldsPlacing: function () {
                    return this.entityFieldsPlacing;
                }
            });
        })();

        var MetadataSet = appUtils.Class();
        (function () {
            MetadataSet.prototype.$_buildObject = function () {
                this.includeFd({
                    // entities
                    entityList: Object.create(null),
                    metadataEvents: metadataEventsImpl,

                    // user interface
                    userInterface: new appInterface.UserInterface()
                });
            };
            MetadataSet.includeMthd({
                installMetadataObjectEnum: function (metadataEnumSpecification) {
                    var EnumClass = metadataEnumSpecification.enumClass;
                    EnumClass.metadataName = metadataEnumSpecification.metadataName;
                    var metadataSet = this;

                    metadataSet.bookEntityList(EnumClass);
                    // event
                    metadataSet.metadataEvents.subscribe("ev:entityList:" + metadataEnumSpecification.metadataName + ":update",
                        function (event, fCallBack) {
                            EnumClass.update(fCallBack)
                        }
                    );

                    return metadataSet;
                },
                installMetadataObjectEntity: function (entitySpecification) {
                    var metadataSet = this;
                    var EntityClass = entitySpecification.entityClass;

                    var metadataEntitySpecification = new MetadataEntitySpecification();
                    metadataEntitySpecification.metadataName = entitySpecification.metadataName;
                    metadataEntitySpecification.metadataRepresentation = entitySpecification.metadataRepresentation;
                    metadataEntitySpecification.metadataDescription = entitySpecification.metadataDescription;

                    appUtils.fillAllValuesProperty(entitySpecification.entityField.entityField, metadataEntitySpecification.entityField.entityField);
                    appUtils.fillAllValuesProperty(entitySpecification.entityField.objectField, metadataEntitySpecification.entityField.objectField);
                    metadataEntitySpecification.entityField.defineField = entitySpecification.entityField.defineField;

                    metadataEntitySpecification.entityField.entityField.id = {
                        value: "",
                        fieldDescription: {
                            inputType: "text",
                            label: "id",
                            availability: true,
                            entityListService: null
                        }
                    };
                    metadataEntitySpecification.entityField.entityField.description = {
                        value: "",
                        fieldDescription: {
                            inputType: "textarea",
                            label: "description",
                            availability: true,
                            entityListService: null
                        }
                    };
                    metadataEntitySpecification.entityFieldsPlacing = entitySpecification.entityFieldsPlacing;

                    (function () {
                        // field
                        EntityClass.prototype.$_buildObject = function () {
                            this.includeEntityFd(
                                metadataEntitySpecification.getObjectFields(),
                                metadataEntitySpecification.getEntityFields(),
                                metadataEntitySpecification.entityField.defineField
                            );
                        };
                    })();

                    var entityList = new EntityList();
                    entityList.metadataName = metadataEntitySpecification.metadataName;

                    var metadataObject = new MetadataObject();

                    metadataObject.installMetadata(metadataEntitySpecification.metadataName,
                        entitySpecification.fnGetEntityInstance,
                        metadataEntitySpecification.metadataRepresentation,
                        metadataEntitySpecification.metadataDescription
                    );

                    var metadataEditFieldsSet = metadataEntitySpecification.getEntityFieldsDescription();
                    var editFieldsPlacing = metadataEntitySpecification.getEntityFieldsPlacing();
                    metadataObject.bookEntityForms(metadataEditFieldsSet, undefined, editFieldsPlacing);

                    metadataSet.bookMetadataObject(metadataObject);
                    metadataSet.bookEntityList(entityList);

                    // event
                    metadataEventsImpl.subscribe("ev:entityList:" + metadataEntitySpecification.metadataName + ":update",
                        function (event, fCallBack) {
                            entityList.update(fCallBack)
                        }
                    );
                    metadataEventsImpl.subscribe("ev:entityList:" + metadataEntitySpecification.metadataName + ":deleteEntity",
                        function (event, id, fCallBack) {
                            entityList.deleteEntity(id, fCallBack);
                        }
                    );

                    // EditMenu
                    var entitySubMenu = metadataSet.userInterface.commandBar.commandBar.getSubMenu('modelDD');
                    if (entitySubMenu != undefined) {
                        entitySubMenu.addCommand(appInterface.getNewEntityCommand(entitySpecification.metadataName, entitySpecification.metadataRepresentation))
                    }

                    return metadataSet;
                },
                getMetadataSpecification: function (metadataName) {
                    var metadataSpecification = this.entityList[metadataName];
                    if (metadataSpecification) {
                        return metadataSpecification
                    } else {
                        metadataSpecification = {metadataName: metadataName, metadataObject: null, entityList: null};
                        this.entityList[metadataName] = metadataSpecification;
                        return metadataSpecification;
                    }
                },
                bookMetadataObject: function (metadataObject) {
                    var metadataSpecification = this.getMetadataSpecification(metadataObject.metadataName);
                    metadataSpecification.metadataObject = metadataObject;
                },
                bookEntityList: function (entityList) {
                    var metadataSpecification = this.getMetadataSpecification(entityList.metadataName);
                    metadataSpecification.entityList = entityList;
                    metadataSpecification.entityList.metadataObject = metadataSpecification.metadataObject;
                },
                getMetadataObject: function (metadataName) {
                    if (this.entityList[metadataName]) {
                        return this.entityList[metadataName].metadataObject;
                    } else {
                        return undefined;
                    }
                },
                getEntityList: function (metadataName) {
                    if (this.entityList[metadataName]) {
                        return this.entityList[metadataName].entityList;
                    } else {
                        return undefined;
                    }
                },
                getEntityInstance: function (metadataName) {
                    var metadataSpecification = this.entityList[metadataName];
                    if (metadataSpecification) {
                        if (metadataSpecification.metadataObject) {
                            return metadataSpecification.metadataObject.getEntityInstance();
                        }
                    }
                    return null;
                },
                getInterface: function () {
                    return this.userInterface;
                },

                loadAllEntities: function () {
                    window.status = "Load objects...";
                    var entityName;
                    for (entityName in this.entityList) {
                        this.metadataEvents.publish("ev:entityList:" + entityName + ":update")
                    }
                }
            })
        })();

        abstractAppModel.resourceService = undefined;
        abstractAppModel.Entity = Entity;
        abstractAppModel.Enum = Enum;
        abstractAppModel.MetadataSet = MetadataSet;

    })();

    if (!appService.appInitialization) {
        appService.appInitialization = new Object(null);
    }
    var appInitialization = appService.appInitialization;
    (function () {
        appInitialization.abstractAppModel = abstractAppModel;
        appInitialization.metadataSet = undefined;
        appInitialization.metadataSpecifications = {
            enums: [],
            entities: []
        };

        appInitialization.setMetadataSet = function (metadataSet) {
            if (metadataSet === undefined) {
                appInitialization.metadataSet = new abstractAppModel.MetadataSet();
            } else {
                appInitialization.metadataSet = metadataSet;
            }

            return appInitialization;
        };

        appInitialization.getMetadataSet = function () {
            return appInitialization.metadataSet;
        };

        appInitialization.initMetadataSet = function () {
            var appMetadataSet = appInitialization.metadataSet;

            // EditBar
            var menuModel = appInterface.getNewDropdownCommand("modelDD", "Model");
            var menuSystem = appInterface.getNewDropdownCommand("systemDD", "System")
                .addCommand(appInterface.getNewCommand("initDataBase", "initDataBase", function () {
                    ExecuteSystemCommand(abstractAppModel.resourceService, "jdbc/initDataBase")
                }))
                .addCommand(appInterface.getNewCommand("runArchiveService", "runArchiveService", function () {
                    ExecuteSystemCommand(abstractAppModel.resourceService, "taskScheduler/runArchiveService")
                }))
                .addCommand(appInterface.getNewCommand("stopArchiveService", "stopArchiveService", function () {
                    ExecuteSystemCommand(abstractAppModel.resourceService, "taskScheduler/stopArchiveService")
                }))
                .addCommand(appInterface.getNewCommand("sendMail", "sendMail", function () {
                    ExecuteSystemCommand(abstractAppModel.resourceService, "taskScheduler/sendMail")
                }))
                .addCommand(appInterface.getNewCommand("interruptTaskExecutor", "interruptTaskExecutor", function () {
                    ExecuteSystemCommand(abstractAppModel.resourceService, "taskScheduler/interruptTaskExecutor")
                }));

            var userInterface = new appInterface.UserInterface();
            userInterface.appMetadataSet = appMetadataSet;
            userInterface
                .commandBarSetMainUrl("#/task")
                .commandBar.commandBar
                    .addCommand(menuModel)
                    .addCommand(menuSystem);

            appMetadataSet.userInterface = userInterface;
            var i;
            for (i = 0; i < appInitialization.metadataSpecifications.enums.length; i++) {
                appMetadataSet.installMetadataObjectEnum(appInitialization.metadataSpecifications.enums[i]);
            }
            for (i = 0; i < appInitialization.metadataSpecifications.entities.length; i++) {
                appMetadataSet.installMetadataObjectEntity(appInitialization.metadataSpecifications.entities[i]);
            }
            return appInitialization;
        }

    })();

    appService.getMetadataSet = function (resourceService) {

        abstractAppModel.resourceService = resourceService;

        appInitialization
            .setMetadataSet()

            .initEnumsModel()
            .initProjectModel()
            .initUserModel()
            .initTaskModel()
            .initFarmModel()

            .initMetadataSet();

        return appInitialization.getMetadataSet();
    };

})(window);
;
(function (exp) {
    if (!exp.appService) {
        exp.appService = new Object(null);
    }
    var forms = new Object(null);
    exp.appService.forms = forms;

    forms.ListEntityController = function ($scope, dataStorage) {
        this.appMetadataSet = dataStorage.getAppMetadaSet();
        this.numPerpage = 10;

        this.initController = function () {
            $scope.flagShowSearch = false;
            $scope.$parent.openListForm = this.openListForm;
            $scope.$parent.closeListForm = this.closeListForm;

            var metadataSpecification = this.appMetadataSet.getEntityList(this.metadataName);
            var entityListForm = this.appMetadataSet.userInterface.editFormGetEntityListForm();

            entityListForm.metadataName = this.metadataName;
            entityListForm.appMetadataSet = this.appMetadataSet;
            entityListForm.metadataSpecification = metadataSpecification;
            entityListForm.editFormName = metadataSpecification.metadataObject.description;
            entityListForm.formProperties = metadataSpecification.metadataObject.fmListForm.metadataEditFieldsSet;
            entityListForm.entities = metadataSpecification.list;

            entityListForm.numPerPage = this.numPerpage;
            entityListForm.currentPage = 1;
            entityListForm.totalItems = metadataSpecification.list.length;
            entityListForm.entitiesFiltered = [];
            entityListForm.entitiesEmpty = [];

            entityListForm.eventCloseForm = this.closeListForm;
            entityListForm.eventUpdateForm = this.updateForm;
            entityListForm.eventAddNewEntity = this.addNewEntity;
            entityListForm.eventEditEntity = this.editEntity;
            entityListForm.eventDeleteEntity = this.deleteEntity;
            entityListForm.eventFindEntity = this.findEntity;

            entityListForm.openEditForm = this.openEditForm;
            entityListForm.updateViewEntityList = this.updateViewEntityList;
            entityListForm.closeListForm = this.closeListForm;
            entityListForm.eventPageChanged = this.pageChanged;

            $scope.entityListForm = entityListForm;
            $scope.$parent.entityListForm = entityListForm;

            entityListForm.eventUpdateForm();
        };

        this.pageChanged = function () {
            var begin = ((this.currentPage - 1) * this.numPerPage)
                , end = begin + this.numPerPage;
            this.entitiesFiltered = this.entities.slice(begin, end);
            this.entitiesEmpty = new Array(this.numPerPage - this.entitiesFiltered.length);
        };

        this.addNewEntity = function () {
            this.openEditForm(this.appMetadataSet.getEntityList(this.metadataName).metadataObject.getEntityInstance())
        };

        this.editEntity = function (id) {
            var entity = this.appMetadataSet.getEntityList(this.metadataName).findEntityById(id);
            if (entity != undefined) {
                var editEntity = this.appMetadataSet.getEntityList(this.metadataName).metadataObject.getEntityInstance();
                appUtils.fillValuesProperty(entity, editEntity);
                this.openEditForm(editEntity);
            }
        };

        this.deleteEntity = function (id) {
            var self = this;
            this.appMetadataSet.getEntityList(this.metadataName).deleteEntity(id, function (data) {
                self.updateViewEntityList();
            });
        };

        this.findEntity = function (searchEx) {
            var self = this;
            this.appMetadataSet.getEntityList(this.metadataName).findEntity(searchEx, function (data) {
                self.totalItems = self.entities.length;
                self.eventPageChanged();
            });
        };

        this.updateViewEntityList = function () {
            var self = this;
            this.appMetadataSet.metadataEvents.publish("ev:entityList:" + this.metadataName + ":update", function () {
                self.totalItems = self.entities.length;
                self.eventPageChanged();
            });
        };

        this.openEditForm = function (currentEntity) {
            dataStorage.setCurrentEntityByName(this.metadataName, currentEntity);
            this.closeListForm();
        };

        this.closeListForm = function () {
            $scope.$parent.showListForm = false;
            $scope.$parent.openEditForm();
        };

        this.openListForm = function () {
            $scope.$parent.showListForm = true;
            this.entityListForm.updateViewEntityList();
        };

        this.updateForm = function () {
            this.updateViewEntityList();
        };

    };

    forms.EditEntityController = function ($scope, dataStorage) {
        this.appMetadataSet = dataStorage.getAppMetadaSet();
        this.currentEntity = dataStorage.getCurrentEntityByName(this.metadataName);

        this.initController = function () {
            $scope.$parent.openEditForm = this.openEditForm;
            $scope.$parent.closeEditForm = this.closeEditForm;

            var metadataSpecification = this.appMetadataSet.getEntityList(this.metadataName);

            var entityEditForm = this.appMetadataSet.userInterface.editFormGetEntityEditForm();
            entityEditForm.metadataName = this.metadataName;
            entityEditForm.appMetadataSet = this.appMetadataSet;
            entityEditForm.metadataSpecification = metadataSpecification;
            entityEditForm.editFormName = "New " + this.metadataName + ":";
            entityEditForm.formProperties = metadataSpecification.metadataObject.fmEditForm.metadataEditFieldsSet;
            entityEditForm.entityFieldsPlacing = metadataSpecification.metadataObject.fmEditForm.metadataEditFieldsPlacing;

            entityEditForm.eventCloseForm = this.closeEditForm;
            entityEditForm.eventUpdateForm = this.updateForm;
            entityEditForm.eventCreateEntity = this.createEntity;

            entityEditForm.openEditForm = this.openEditForm;
            entityEditForm.closeEditForm = this.closeEditForm;
            entityEditForm.updateForm = this.updateForm;
            entityEditForm.createEntity = this.createEntity;

            $scope.entityEditForm = entityEditForm;
            $scope.$parent.entityEditForm = entityEditForm;
        };

        this.updateForm = function () {
            this.currentEntity = dataStorage.getCurrentEntityByName(this.metadataName);
        };

        this.createEntity = function (template) {
            var entityList = this.appMetadataSet.getEntityList(this.metadataName);
            var self = this;
            entityList.addEntityByTemplate(template, function () {
                self.appMetadataSet.metadataEvents.publish("ev:entityList:" + self.metadataName + ":update", function () {
                    self.closeEditForm();
                });
            });
        };

        this.openEditForm = function () {
            $scope.$parent.showEditForm = true;
            this.entityEditForm.updateForm();
        };

        this.closeEditForm = function () {
            $scope.$parent.showEditForm = false;
            $scope.$parent.openListForm();
        };

    };

})(window);
;
(function (appInitialization) {

    appInitialization.initEnumsModel = function () {
        var EnumTaskState = new appInitialization.abstractAppModel.Enum;
        var metadataEnumSpecification_TaskState = {
            enumClass: EnumTaskState,
            metadataName: "taskState"
        };

        appInitialization.metadataSpecifications.enums.push(metadataEnumSpecification_TaskState);

        return appInitialization;
    };

})(appService.appInitialization);
;
(function (appInitialization) {

    appInitialization.initUserModel = function () {

        var appMetadataSet = appInitialization.metadataSet;

        var User = appUtils.Class(appInitialization.abstractAppModel.Entity);
        var metadataEntitySpecification_User = {
            entityClass: User,
            fnGetEntityInstance: function () {
                return new User()
            },
            metadataName: "user",
            metadataRepresentation: "User",
            metadataDescription: "User list",
            entityField: {
                objectField: {},
                entityField: {

                    username: {
                        value: "",
                        fieldDescription: {
                            inputType: "text",
                            label: "username",
                            availability: true,
                            entityListService: null
                        }
                    },
                    password: {
                        value: "",
                        fieldDescription: {
                            inputType: "text",
                            label: "password",
                            availability: true,
                            entityListService: null
                        }
                    },
                    mailAddress: {
                        value: "",
                        fieldDescription: {
                            inputType: "text",
                            label: "mailAddress",
                            availability: true,
                            entityListService: null
                        }
                    },
                    enabled: {
                        value: false,
                        fieldDescription: {
                            inputType: "checkbox",
                            label: "enabled",
                            availability: false,
                            entityListService: null
                        }
                    }

                },
                defineField: {

                    representation: {
                        enumerable: true,
                        get: function () {
                            return "" + this.username + " (" + this.description + ") ";
                        }
                    }

                }
            },

            entityFieldsPlacing: [
                [
                    {editFieldId: "id", fieldLength: 3}
                ],
                [
                    {
                        editFieldId: [
                            [{editFieldId: "username", fieldLength: 12}],
                            [{editFieldId: "password", fieldLength: 12}],
                            [{editFieldId: "mailAddress", fieldLength: 12}]
                        ],
                        fieldLength: 5
                    }
                ],
                [
                    {editFieldId: "description", fieldLength: 12}
                ]
            ]

        };

        var Role = appUtils.Class(appInitialization.abstractAppModel.Entity);
        var metadataEntitySpecification_Role = {
            entityClass: Role,
            fnGetEntityInstance: function () {
                return new Role()
            },
            metadataName: "role",
            metadataRepresentation: "Role",
            metadataDescription: "Role list",
            entityField: {
                objectField: {},
                entityField: {

                    // entity field
                    role: {
                        value: "",
                        fieldDescription: {
                            inputType: "text",
                            label: "role",
                            availability: true,
                            entityListService: null
                        }
                    },
                    users: {
                        value: [],
                        fieldDescription: {
                            inputType: "multiselect",
                            label: "users",
                            availability: true,
                            entityListService: function () {
                                return appMetadataSet.getEntityList("user");
                            }
                        }
                    }


                },
                defineField: {

                    representation: {
                        enumerable: true,
                        get: function () {
                            return "" + this.role;
                        }
                    }

                }
            },
            entityFieldsPlacing: [
                [
                    {editFieldId: "id", fieldLength: 3},
                    {
                        editFieldId: [
                            [{editFieldId: "role", fieldLength: 12}]
                        ],
                        fieldLength: 5
                    }
                ],
                [
                    {editFieldId: "users", fieldLength: 5},
                    {editFieldId: "description", fieldLength: 12}
                ]
            ]
        };
        metadataEntitySpecification_Role.entityField.entityField.users.value.representationList = function () {
            var str = "";
            var k = 0;
            while (true) {
                if (k == this.length) {
                    break;
                }
                str = str + "; " + this[k].representation;
                k = k + 1;

            }
            return str;
        };
        metadataEntitySpecification_Role.entityField.entityField.users.value.fillByTemplate = function (template) {
            this.length = 0;
            var k = 0;
            while (true) {
                if (k == template.length) {
                    break;
                }
                var entity = appMetadataSet.getEntityInstance("user");
                appUtils.fillValuesProperty(template[k], entity);
                this.push(entity);
                k = k + 1;
            }
        };

        appInitialization.metadataSpecifications.entities.push(metadataEntitySpecification_Role);
        appInitialization.metadataSpecifications.entities.push(metadataEntitySpecification_User);

        return appInitialization;
    };

})(appService.appInitialization);
;
(function (appInitialization) {

    appInitialization.initProjectModel = function () {

        var appMetadataSet = appInitialization.metadataSet;

        var Project = appUtils.Class(appInitialization.abstractAppModel.Entity);
        var metadataEntitySpecification_Project = {
            entityClass: Project,
            fnGetEntityInstance: function () {
                return new Project()
            },
            metadataName: "project",
            metadataRepresentation: "Project",
            metadataDescription: "Project list",
            entityField: {
                objectField: {},
                entityField: {

                    // entity field
                    name: {
                        value: "",
                        fieldDescription: {
                            inputType: "text",
                            label: "name",
                            availability: true,
                            entityListService: null
                        }
                    }

                },
                defineField: {

                    representation: {
                        enumerable: true,
                        get: function () {
                            return "" + this.name;
                        }
                    }

                }
            },

            entityFieldsPlacing: [
                [
                    {editFieldId: "id", fieldLength: 3},
                    {
                        editFieldId: [
                            [{editFieldId: "name", fieldLength: 12}]
                        ],
                        fieldLength: 5
                    }
                ],
                [
                    {editFieldId: "description", fieldLength: 12}
                ]
            ]
        };

        appInitialization.metadataSpecifications.entities.push(metadataEntitySpecification_Project);

        return appInitialization;
    };

})(appService.appInitialization);
;
(function (appInitialization) {

    appInitialization.initTaskModel = function(){

    var appMetadataSet = appInitialization.metadataSet;

    var Task = appUtils.Class(appInitialization.abstractAppModel.Entity);
    var metadataEntitySpecification_Task = {
        entityClass: Task,
        fnGetEntityInstance: function () {
            return new Task()
        },
        metadataName: "task",
        metadataRepresentation: "Task",
        metadataDescription: "Task list",
        entityField: {
            objectField: {},
            entityField: {

                plainTime:{
                    value: 0,
                    fieldDescription: {
                        inputType: "number",
                        label: "plain time",
                        availability: true,
                        entityListService: null
                    }
                },

                date: {
                    value: "",
                    fieldDescription: {
                        inputType: "date",
                        label: "date",
                        availability: true,
                        entityListService: null
                    }
                },
                title: {
                    value: "",
                    fieldDescription: {
                        inputType: "text",
                        label: "title",
                        availability: true,
                        entityListService: null
                    }
                },
                author: {
                    value: {},
                    fieldDescription: {
                        inputType: "select",
                        label: "author",
                        availability: true,
                        getInstance: function(){
                            return appMetadataSet.getEntityInstance("user");
                        },
                        entityListService: function () {
                            return appMetadataSet.getEntityList("user");
                        }
                    }
                },
                executor: {
                    value: [],
                    fieldDescription: {
                        inputType: "multiselect",
                        label: "executor",
                        availability: true,
                        entityListService: function () {
                            return appMetadataSet.getEntityList("user");
                        }
                    }
                },
                project: {
                    value: {},
                    fieldDescription: {
                        inputType: "select",
                        label: "project",
                        availability: true,
                        getInstance: function(){
                            return appMetadataSet.getEntityInstance("project");
                        },
                        entityListService: function () {
                            return appMetadataSet.getEntityList("project")
                        }
                    }
                },
                state: {
                    value: "TODO",
                    fieldDescription: {
                        inputType: "enum",
                        label: "state",
                        availability: true,
                        entityListService: function(){
                            return appMetadataSet.getEntityList("taskState")
                        }
                    }
                }

            },
            defineField: {

                representation: {
                    enumerable: true,
                    get: function () {
                        return "" + this.date + " /" + this.title + "/ (" + this.description + ") ";
                    }
                }

            }
        },

        entityFieldsPlacing: [
            [
                    {editFieldId: "id", fieldLength: 3},
                    {
                        editFieldId: [
                            [
                                {editFieldId: "date", fieldLength: 4},
                                {editFieldId: "state", fieldLength: 4}
                            ],
                            [{editFieldId: "title", fieldLength: 12}],
                            [
                                {editFieldId: "project", fieldLength: 7},
                                {editFieldId: "executor", fieldLength: 5}
                            ]
                        ],
                        fieldLength: 9
                    }
            ],
            [
                {editFieldId: "plainTime", fieldLength: 3}
            ],
            [
                {editFieldId: "description", fieldLength: 12}
            ],
            [
                {editFieldId: "author", fieldLength: 3}
            ]
        ]

    };
    metadataEntitySpecification_Task.entityField.entityField.executor.value.representationList = function() {
        var str = "";
        var k=0;
        while (true) {
            if(k == this.length){
                break;
            }
            str = str+"; "+this[k].representation;
            k = k+1;

        }
        return str;
    };
    metadataEntitySpecification_Task.entityField.entityField.executor.value.fillByTemplate = function(template) {
        this.length=0;
        var k=0;
        while (true) {
            if(k == template.length){
                break;
            }
            var entity = appMetadataSet.getEntityInstance("user");
            appUtils.fillValuesProperty(template[k], entity);
            this.push(entity);
            k = k+1;
        }
    };

    appInitialization.metadataSpecifications.entities.push(metadataEntitySpecification_Task);

    return appInitialization;
};

})(appService.appInitialization);
;
(function (appInitialization) {

    appInitialization.initFarmModel = function () {

        var appMetadataSet = appInitialization.metadataSet;

        var Farm = appUtils.Class(appInitialization.abstractAppModel.Entity);
        var metadataEntitySpecification_Farm = {
            entityClass: Farm,
            fnGetEntityInstance: function () {
                return new Farm()
            },
            metadataName: "farm",
            metadataRepresentation: "farm",
            metadataDescription: "Farm list",
            entityField: {
                objectField: {},
                entityField: {

                    // entity field
                    name: {
                        value: "",
                        fieldDescription: {
                            inputType: "text",
                            label: "name",
                            availability: true,
                            entityListService: null
                        }
                    }

                },
                defineField: {

                    representation: {
                        enumerable: true,
                        get: function () {
                            return "" + this.name;
                        }
                    }

                }
            },

            entityFieldsPlacing: [
                [
                    {editFieldId: "id", fieldLength: 3},
                    {
                        editFieldId: [
                            [{editFieldId: "name", fieldLength: 12}]
                        ],
                        fieldLength: 5
                    }
                ],
                [
                    {editFieldId: "description", fieldLength: 12}
                ]
            ]
        };

        appInitialization.metadataSpecifications.entities.push(metadataEntitySpecification_Farm);

        return appInitialization;
    };

})(appService.appInitialization);
;
(function (exp) {
    if (!exp.appController) {
        exp.appController = new Object(null);
    }
    var appController = exp.appController;

    appController.workPlaceController = function ($window, $http, $cookies, $rootScope, $scope, $location, dataStorage, resourceService, dateFilter) {
        var cookies = $cookies;

        var appMetadataSet = appService.getMetadataSet(resourceService);
        dataStorage.setAppMetadataSet(appMetadataSet);
        $scope.errorDescriptions = appMetadataSet.userInterface.errorDescriptions;
        $scope.commandBar = appMetadataSet.userInterface.commandBar;
        $scope.principal = appMetadataSet.userInterface.security.principal;
        var selfScope = $scope;

        $scope.getCurrentTime = function () {
            return dateFilter(new Date(), 'M/d/yy h:mm:ss a');
        };

        $scope.login = function () {
            selfScope.showLogin = true;
            $location.url("/login");
        };
        $scope.eventAfterLogin = function () {
            var appMetadataSet = dataStorage.getAppMetadaSet();
            appMetadataSet.loadAllEntities();

            var currentPrincipal = appMetadataSet.userInterface.security.principal;
            if (currentPrincipal.authenticated) {
                currentPrincipal.getSessionInformation(resourceService, cookies);
                currentPrincipal.updatePrincipalUser(appMetadataSet);
                selfScope.principal = currentPrincipal;
                selfScope.showLogin = false;
            } else {
                $location.url(dataStorage.getAppConfig().appUrl);
            }
        };
        $scope.logout = function () {
            var appMetadataSet = dataStorage.getAppMetadaSet();
            var currentPrincipal = appMetadataSet.userInterface.security.principal;

            if (currentPrincipal.authenticated) {
                currentPrincipal.logout($http);
                $location.url(dataStorage.getAppConfig().appUrl);
            }
        };
    };

})(window);
;
(function (exp) {
    if (!exp.appController) {
        exp.appController = new Object(null);
    }
    var appController = exp.appController;

    appController.userController = function ($scope) {
        $scope.showEditForm = false;
        $scope.showListForm = true;

        $scope.openEditForm = function () {
        };
        $scope.closeEditForm = function () {
        };

        $scope.openListForm = function () {
        };
        $scope.closeListForm = function () {
        };
    };

    appController.editUserController = function ($scope, dataStorage) {

        appService.forms.EditEntityController.apply(this, arguments);
        this.metadataName = "user";
        this.initController();

    };

    appController.userListController = function ($scope, dataStorage) {
        appService.forms.ListEntityController.apply(this, arguments);
        this.metadataName = "user";
        this.initController();
    };

    appController.roleController = function ($scope) {
        $scope.showEditForm = false;
        $scope.showListForm = true;

        $scope.openEditForm = function () {
        };
        $scope.closeEditForm = function () {
        };

        $scope.openListForm = function () {
        };
        $scope.closeListForm = function () {
        };
    };

    appController.editRoleController = function ($scope, dataStorage) {
        appService.forms.EditEntityController.apply(this, arguments);
        this.metadataName = "role";
        this.initController();
    };

    appController.roleListController = function ($scope, dataStorage) {
        appService.forms.ListEntityController.apply(this, arguments);
        this.metadataName = "role";
        this.initController();
    };

})(window);
;
(function (exp) {
    if (!exp.appController) {
        exp.appController = new Object(null);
    }
    var appController = exp.appController;

    appController.projectController = function ($scope) {
        $scope.showEditForm = false;
        $scope.showListForm = true;

        $scope.openEditForm = function () {
        };
        $scope.closeEditForm = function () {
        };

        $scope.openListForm = function () {
        };
        $scope.closeListForm = function () {
        };
    };

    appController.editProjectController = function ($scope, dataStorage) {
        appService.forms.EditEntityController.apply(this, arguments);
        this.metadataName = "project";
        this.initController();
    };

    appController. projectListController = function ($scope, dataStorage) {
        appService.forms.ListEntityController.apply(this, arguments);
        this.metadataName = "project";
        this.initController();
    };

})(window);
;
(function (exp) {
    if (!exp.appController) {
        exp.appController = new Object(null);
    }
    var appController = exp.appController;

    appController.taskController = function ($scope) {
        $scope.showEditForm = false;
        $scope.showListForm = true;

        $scope.openEditForm = function () {
        };
        $scope.closeEditForm = function () {
        };

        $scope.openListForm = function () {
        };
        $scope.closeListForm = function () {
        };
    };

    appController.editTaskController = function ($scope, dataStorage) {
        appService.forms.EditEntityController.apply(this, arguments);
        this.metadataName = "task";
        this.initController();
    };

    appController.taskListController = function ($scope, dataStorage) {
        appService.forms.ListEntityController.apply(this, arguments);
        this.metadataName = "task";
        this.initController();
    };

})(window);
;
(function (exp) {
    if (!exp.appController) {
        exp.appController = new Object(null);
    }
    var appController = exp.appController;

    appController.farmController = function ($scope) {
        $scope.showEditForm = false;
        $scope.showListForm = true;

        $scope.openEditForm = function () {
        };
        $scope.closeEditForm = function () {
        };

        $scope.openListForm = function () {
        };
        $scope.closeListForm = function () {
        };
    };

    appController.editFarmController = function ($scope, dataStorage) {
        appService.forms.EditEntityController.apply(this, arguments);
        this.metadataName = "farm";
        this.initController();
    };

    appController.farmListController = function ($scope, dataStorage) {
        appService.forms.ListEntityController.apply(this, arguments);
        this.metadataName = "farm";
        this.initController();
    };

})(window);
var app = angular.module('app', ['ui.bootstrap', 'ngResource', 'ngRoute', 'ngCookies', 'oi.select', 'cfp.hotkeys']);

// Constants
app.constant('appConfig', {
    appName: "appTaskList",
    appUrl: "/"+this.appName
})
;

// Configs
app
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }])
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('myHttpResponseInterceptor');
    }])
    .config(['$routeProvider', function ($routeProvider) {
        appService.setRoute($routeProvider);
    }])
    .config(['$provide', function ($provide) {
        $provide.decorator('$locale', ['$delegate', function ($delegate) {
            $delegate.NUMBER_FORMATS.PATTERNS[1].negPre = '-\u00A4';
            $delegate.NUMBER_FORMATS.PATTERNS[1].negSuf = '';
            return $delegate;
        }]);

    }])
;

// Services
app
    .service('appEnvironment', ['$location', 'appConfig', function ($location, appConfig) {
        return appService.appEnvironment($location, appConfig);
    }])
    .service('dataStorage', ['appConfig', function (appConfig) {
        return appService.dataStorage(appConfig);
    }])
;

// Factories
app
    .factory('myHttpResponseInterceptor', ['$q', 'dataStorage', function ($q, dataStorage) {
        return appService.appHttpResponseInterceptor($q, dataStorage);
    }])
    .factory('entityEditService', ['$resource', 'appEnvironment', function ($resource, appEnvironment) {
        return appService.entityEditService($resource, appEnvironment);
    }])
    .factory('securityService', ['$resource', 'appEnvironment', function ($resource, appEnvironment) {
        return appService.securityService($resource, appEnvironment);
    }])
    .factory('operationService', ['$resource', 'appEnvironment', function ($resource, appEnvironment) {
        return appService.operationService($resource, appEnvironment);
    }])
    .factory('systemService', ['$resource', 'appEnvironment', function ($resource, appEnvironment) {
        return appService.systemService($resource, appEnvironment);
    }])
    .factory('resourceService', function (entityEditService, systemService, securityService, operationService) {
        return appService.resourceService(entityEditService, systemService, securityService, operationService)
    })
;

// Directives
app
    .directive('smDatepicker', function () {
        return appDirective.formsDirective.directiveDatePicker();
    })
    .directive('button', function () {
        return appDirective.formsDirective.directiveButton();
    })
    .directive('entityProperty', function () {
        return appDirective.formsDirective.directiveEntityProperty();
    })
    .directive('entityEditForm', function () {
        return appDirective.formsDirective.directiveEntityEditForm();
    })
    .directive('entityEditFormCol', ['$compile', function ($compile) {
        return appDirective.formsDirective.directiveEntityEditFormCol($compile);
    }])
    .directive('entityEditFormRow', function () {
        return appDirective.formsDirective.directiveEntityEditFormRow();
    })
    .directive('entityListForm', function () {
        return appDirective.formsDirective.directiveEntityListForm();
    })
    .directive('updatableText', ['$interval', function ($interval) {
        return appDirective.directiveUpdatableText($interval);
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
    .directive('loginPage', [function () {
        return appDirective.directiveLoginPage();
    }])
;

// Filters
app
    .filter('myDate', ['dateFilter', function (dateFilter) {
        return function (input) {
            if (input == null) {
                return "";
            }
            var _date = dateFilter(new Date(input), 'dd.MM.yyyy');

            return _date.toUpperCase();
        };
    }])
;

// Controllers
app
    .controller('workPlaceController',
    [
        '$window', '$http', '$cookies', '$rootScope', '$scope', '$location', 'dataStorage', 'resourceService', 'dateFilter',
        appController.workPlaceController
    ]
)
    .controller('farmController',
    [
        '$scope',
        appController.farmController
    ]
)
    .controller('farmListController',
    [
        '$scope', 'dataStorage',
        appController.farmListController
    ]
)
    .controller('editFarmController',
    [
        '$scope', 'dataStorage',
        appController.editFarmController
    ]
)
    .controller('projectController',
    [
        '$scope',
        appController.projectController
    ]
)
    .controller('projectListController',
    [
        '$scope', 'dataStorage',
        appController.projectListController
    ]
)
    .controller('editProjectController',
    [
        '$scope', 'dataStorage',
        appController.editProjectController
    ]
)
    .controller('taskController',
    [
        '$scope',
        appController.taskController
    ]
)
    .controller('taskListController',
    [
        '$scope', 'dataStorage',
        appController.taskListController
    ]
)
    .controller('editTaskController',
    [
        '$scope', 'dataStorage',
        appController.editTaskController
    ]
)
    .controller('userController',
    [
        '$scope',
        appController.userController
    ]
)
    .controller('userListController',
    [
        '$scope', 'dataStorage',
        appController.userListController
    ]
)
    .controller('editUserController',
    [
        '$scope', 'dataStorage',
        appController.editUserController
    ]
)
    .controller('roleController',
    [
        '$scope',
        appController.roleController
    ]
)
    .controller('roleListController',
    [
        '$scope', 'dataStorage',
        appController.roleListController
    ]
)
    .controller('editRoleController',
    [
        '$scope', 'dataStorage',
        appController.editRoleController
    ]
);
