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
        appService.formsService.EditEntityController.apply(this, arguments);
        this.metadataName = "farm";
        this.initController();
    };

    appController.farmListController = function ($scope, dataStorage) {
        appService.formsService.ListEntityController.apply(this, arguments);
        this.metadataName = "farm";
        this.initController();
    };

})(window);