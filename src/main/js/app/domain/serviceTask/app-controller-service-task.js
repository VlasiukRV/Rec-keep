;
(function (exp) {
    if (!exp.appController) {
        exp.appController = new Object(null);
    }
    var appController = exp.appController;

    appController.serviceTaskController = function ($scope) {
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

    appController.editServiceTaskController = function ($scope, dataStorage, EntityEditForm) {
        appService.forms.EditEntityController.apply(this, arguments);
        this.metadataName = "serviceTask";
        this.initController();
    };

    appController.serviceTaskListController = function ($scope, dataStorage, EntityListForm) {
        appService.forms.ListEntityController.apply(this, arguments);
        this.metadataName = "serviceTask";
        this.initController();
    };

})(window);