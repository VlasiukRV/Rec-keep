;
(function (exp) {
    if (!exp.appController) {
        exp.appController = new Object(null);
    }
    var appController = exp.appController;

    appController.workPlaceController = function (
        $window, 
        $http, 
        $cookies, 
        $rootScope, 
        $scope, 
        $location,
        appInitialization,
        metadataSet, 
        dataStorage, 
        appConfig, 
        resourceService, 
        dateFilter, 
        errorDescriptions) {

        var cookies = $cookies;

        $scope.errorDescriptions = errorDescriptions;
        $scope.commandBar = metadataSet.userInterface.commandBar;
        $scope.principal = metadataSet.userInterface.security.principal;
        var selfScope = $scope;

        function refreshSessionInformation() {
            $scope.appConfig = appConfig;
            var metadataSet = dataStorage.getAppMetadataSet();

            var principal = metadataSet.userInterface.security.principal;
            if (principal.authenticated) {
                principal.getSessionInformation(resourceService);
                principal.updatePrincipalUser(metadataSet);
                selfScope.principal = principal;
            } else {
                $location.url(appConfig.appUrl);
            }

        }

        $scope.getCurrentTime = function () {
            return dateFilter(new Date(), 'M/d/yy h:mm:ss a');
        };

        $scope.login = function () {
            $location.url('/login');
        };
        $scope.eventAfterLogin = function () {
            var metadataSet = dataStorage.getAppMetadataSet();
            metadataSet.loadAllEntities();

            refreshSessionInformation();
            $location.url(appConfig.appUrl);
        };
        $scope.logout = function () {
            var metadataSet = dataStorage.getAppMetadataSet();
            var principal = metadataSet.userInterface.security.principal;

            if (principal.authenticated) {
                principal.logout($http);
                $location.url(appConfig.appUrl);
            }
        };

        refreshSessionInformation();
    };

    appController.dashboard = function(
        $scope, 
        appInitialization,
        metadataSet,
        dataStorage,
        appConfig, 
        resourceService, 
        errorDescriptions){
        $scope.countValue = {valueLabel: 'Label 75', value: 75, minValue:0, maxValue: 100};

        $scope.countValueList = [];
        $scope.countValueList.push({valueLabel: 'Label 1 Tile', value: 10});
        $scope.countValueList.push({valueLabel: 'Label 2 Tile', value: 20});
        $scope.countValueList.push({valueLabel: 'Label 3 Tile', value: 30});
        $scope.countValueList.push({valueLabel: 'Label 4 Tile', value: 40});

        $scope.countValueList1 = [];
        $scope.countValueList1.push({valueLabel: 'Label 10 Tile', value: 100});
        $scope.countValueList1.push({valueLabel: 'Label 20 Tile', value: 200});
        $scope.countValueList1.push($scope.countValue);

        $scope.countValueList2 = [];
        $scope.countValueList2.push($scope.countValue);
        
    };

})(window);