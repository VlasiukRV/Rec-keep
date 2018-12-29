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
            $location.url("/login");
        };
        $scope.eventAfterLogin = function () {
            var appMetadataSet = dataStorage.getAppMetadataSet();
            appMetadataSet.loadAllEntities();

            refreshSessionInformation();
            $location.url("/appTaskList");
        };
        $scope.logout = function () {
            var appMetadataSet = dataStorage.getAppMetadataSet();
            var principal = appMetadataSet.userInterface.security.principal;

            if (principal.authenticated) {
                principal.logout($http);
                $location.url(dataStorage.getAppConfig().appUrl);
            }
        };

        function refreshSessionInformation() {
            var appMetadataSet = dataStorage.getAppMetadataSet();

            var principal = appMetadataSet.userInterface.security.principal;
            if (principal.authenticated) {
                principal.getSessionInformation(resourceService);
                principal.updatePrincipalUser(appMetadataSet);
                selfScope.principal = principal;
            } else {
                $location.url(dataStorage.getAppConfig().appUrl);
            }

        };

        refreshSessionInformation();
    };

})(window);