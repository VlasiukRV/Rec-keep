;
(function (exp) {
    if (!exp.appController) {
        exp.appController = new Object(null);
    }
    var appController = exp.appController;

    appController.projectController = function ($scope) {
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

    appController.editProjectController = function ($scope, dataStorage, EntityEditForm) {
        appService.forms.EditEntityController.apply(this, arguments);
        this.metadataName = "project";
        this.initController();
    };

    appController. projectListController = function ($scope, dataStorage, EntityListForm) {
        appService.forms.ListEntityController.apply(this, arguments);
        this.metadataName = "project";
        this.initController();
    };

})(window);