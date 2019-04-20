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

        $scope.countValue1 = {valueLabel: 'Value 1', value: 30, minValue:0, maxValue: 100};
        $scope.countValue2 = {valueLabel: 'Value 2', value: 24, minValue:0, maxValue: 100};
        $scope.countValue3 = {valueLabel: 'Value 3', value: 60, minValue:0, maxValue: 100};
        
        $scope.countValueList1 = [];
        $scope.countValueList1.push($scope.countValue1);
        $scope.countValueList1.push($scope.countValue2);
        $scope.countValueList1.push($scope.countValue3);

        $scope.countValueList2 = [];
        $scope.countValueList2.push($scope.countValue);

        $scope.addNewEntity = function () {
            $scope.countValueList1.push({valueLabel: 'Value 1', value: 30, minValue:0, maxValue: 100});
        };
    };

})(window);