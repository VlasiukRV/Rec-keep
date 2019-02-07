;
(function (exp) {
    if(!exp.moduleUI){
        exp.moduleUI = new Object(null);
    }

    if(!exp.moduleUI.directive){
        exp.moduleUI.directive = new Object(null);
    }    
    var directive = exp.moduleUI.directive;    

    directive.directiveElementReady = function() {
        return {
            priority: -1000, // a low number so this directive loads after all other directives have loaded.
            restrict: 'A', // attribute only
            link: function($scope, $element, $attributes) {
                $scope.$eval($attributes.ngElementReady);
            }
        };
    };

    directive.directiveLoginPage = function (principal) {

        return {
            restrict: 'E',
            require: '',
            replace: true,
            templateUrl: '/templates/appRoom/tasklist/directive/app-template-form-login.html',
            scope: {
                eventAfterLogin: '&'
            },
            controller: ['$location', '$http', '$rootScope', '$scope', 'dataStorage', function ($location, $http, $rootScope, $scope, dataStorage) {
                $scope.credentials = {username: 'admin', password: 'admin'};
                $scope.login = function () {
                    var appMetadataSet = dataStorage.getAppMetadataSet();
                    if (!appMetadataSet) {
                        return;
                    }
                    var principal = appMetadataSet.userInterface.security.principal;
                    if (!principal) {
                        return;
                    }

                    principal.login($http, $scope.credentials, function (data) {
                        if (!data.authenticated) {
                            return;
                        }

                        $scope.eventAfterLogin();
                    });
                };
            }]
        };
    };

    directive.directiveCurrentTime = function ($interval, dateFilter) {
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
    };

})(window);