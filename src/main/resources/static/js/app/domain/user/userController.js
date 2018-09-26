(function (exp) {
    if (!exp.appController) {
        exp.appController = new Object(null);
    }
    var appController = exp.appController;

    appController.userController = function ($scope) {
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

    appController.editUserController = function ($scope, dataStorage) {

        appService.formsService.EditEntityController.apply(this, arguments);
        this.metadataName = "user";
        this.initController();

    };

    appController.userListController = function ($scope, dataStorage) {
        appService.formsService.ListEntityController.apply(this, arguments);
        this.metadataName = "user";
        this.initController();
    };

    appController.roleController = function ($scope) {
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

    appController.editRoleController = function ($scope, dataStorage) {
        appService.formsService.EditEntityController.apply(this, arguments);
        this.metadataName = "role";
        this.initController();
    };

    appController.roleListController = function ($scope, dataStorage) {
        appService.formsService.ListEntityController.apply(this, arguments);
        this.metadataName = "role";
        this.initController();
    };

})(window);