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

        $scope.json = {
            "Array": [1, 2, 3], "Boolean": true, "Null": null, "Number": 123,
            "Object": {"a": "b", "c": "d"}, "String": "Hello World",
            "auto": "$Hello World"
        };

        $scope.countValueList1 = [];
        $scope.countValueList1.push({valueLabel: 'Mon', value: 30, minValue:0, maxValue: 100});
        $scope.countValueList1.push({valueLabel: 'Tue', value: 24, minValue:0, maxValue: 100});
        $scope.countValueList1.push({valueLabel: 'Wed', value: 60, minValue:0, maxValue: 100});
        $scope.countValueList1.push({valueLabel: 'Thu', value: 38, minValue:0, maxValue: 100});
        $scope.countValueList1.push({valueLabel: 'Fri', value: 21, minValue:0, maxValue: 100});
        $scope.countValueList1.push({valueLabel: 'Sat', value: 45, minValue:0, maxValue: 100});
        $scope.countValueList1.push({valueLabel: 'Sun', value: 58, minValue:0, maxValue: 100});
        
        $scope.countValueList2 = [];
        $scope.countValueList2.push({valueLabel: 'Mon', value: 17, minValue:0, maxValue: 100});
        $scope.countValueList2.push({valueLabel: 'Tue', value: 24, minValue:0, maxValue: 100});
        $scope.countValueList2.push({valueLabel: 'Wed', value: 54, minValue:0, maxValue: 100});
        $scope.countValueList2.push({valueLabel: 'Thu', value: 30, minValue:0, maxValue: 100});
        $scope.countValueList2.push({valueLabel: 'Fri', value: 29, minValue:0, maxValue: 100});
        $scope.countValueList2.push({valueLabel: 'Sat', value: 43, minValue:0, maxValue: 100});
        $scope.countValueList2.push({valueLabel: 'Sun', value: 55, minValue:0, maxValue: 100});

        $scope.countValueList3 = [];
        $scope.countValueList3.push({valueLabel: 'Mon', value: 17, minValue:0, maxValue: 100});
        $scope.countValueList3.push({valueLabel: 'Tue', value: 24, minValue:0, maxValue: 100});
        $scope.countValueList3.push({valueLabel: 'Wed', value: 52, minValue:0, maxValue: 100});
        $scope.countValueList3.push({valueLabel: 'Thu', value: 32, minValue:0, maxValue: 100});
        $scope.countValueList3.push({valueLabel: 'Fri', value: 23, minValue:0, maxValue: 100});
        $scope.countValueList3.push({valueLabel: 'Sat', value: 47, minValue:0, maxValue: 100});
        $scope.countValueList3.push({valueLabel: 'Sun', value: 51, minValue:0, maxValue: 100});

        $scope.tableCountValue = [];
        $scope.tableCountValue.push({valueLabel: 'inCome', value: $scope.countValueList1})
        $scope.tableCountValue.push({valueLabel: 'outCome', value: $scope.countValueList2})
        $scope.tableCountValue.push({valueLabel: 'plan outCome', value: $scope.countValueList3})


        $('#select-list').on('change', function(event, target){
            $.each($scope.tableCountValue, function(index, element) {
                if($('#select-list').val() === element.valueLabel) {
                    $scope.countValueList = element.value
                }
            })            
        })
            
        $scope.addNewEntity = function () {
            $scope.countValueList.push({valueLabel: 'Value 1', value: 30, minValue:0, maxValue: 100});
         };
        $scope.deleteEntity = function () {
            $scope.countValueList.pop();
        };
    };

})(window);