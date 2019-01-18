;
(function (exp) {
    if(!exp.moduleUI){
        exp.moduleUI = new Object(null);
    }
    if(!exp.moduleUI.directive){
        exp.moduleUI.directive = new Object(null);
    }    
    var directive = exp.moduleUI.directive;

    directive.directiveMenuBar = function () {
        return {
            restrict: 'E',
            require: '',
            replace: true,
            templateUrl: '/templates/appRoom/tasklist/directive/app-template-menu-bar.html',
            scope: {
                menuBar: '='
            },
            link: function (scope, element, attrs) {
                init_sidebar_addEvent(element);
            }
        }
    };

    directive.directiveMenuCollection = function () {
        return {
            restrict: 'E',
            require: '',
            replace: true,
            templateUrl: '/templates/appRoom/tasklist/directive/app-template-menu-collection.html',
            scope: {
                menuCollection: '=',
                command: '='
            },
            link: function (scope, element, attrs) {
                init_sidebar_addEvent(element);
            }
        }
    };

    directive.directiveMenuItem = function ($compile) {
        return {
            restrict: 'E',
            require: '',
            replace: true,
            templateUrl: '/templates/appRoom/tasklist/directive/app-template-menu-item.html',
            scope: {
                command: '='
            },
            link: function (scope, element, attrs) {
                if (scope.command.isDropdownMenu) {
                    var e = $compile('<menu-collection command = "command" menu-collection="command.commandList"></menu-collection>')(scope);
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

    directive.directiveMessageLine = function () {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/app-template-message-line.html',
            scope: {
                errorDescriptions: '='
            },
            link: function (scope, element, attrs) {
            },
            controller: ['$scope', function ($scope) {
                $scope.deleteErrorDescription = function (index) {
                    $scope.errorDescriptions.delErrorDescription(index);
                    if ($scope.errorDescriptions.errorsCount() != 0) {
                        return;
                    }

                    $scope.errorDescriptions.show = false;
                };
            }]
        }
    };

})(window);