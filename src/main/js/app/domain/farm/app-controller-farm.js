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

    appController.editFarmController = function ($scope, dataStorage, EntityEditForm) {
        appService.forms.EditEntityController.apply(this, arguments);
        this.metadataName = "farm";
        this.initController();
    };

    appController.farmListController = function ($scope, dataStorage, EntityListForm) {
        appService.forms.ListEntityController.apply(this, arguments);
        this.metadataName = "farm";
        this.initController();
    };

})(window);