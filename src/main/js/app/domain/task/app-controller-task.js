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