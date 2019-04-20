;
(function (exp) {
    if (!exp.appController) {
        exp.appController = new Object(null);
    }
    var appController = exp.appController;

    appController.poultryCalendarController = function ($scope) {
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

    appController.editPoultryCalendarController = function ($scope, dataStorage, EntityEditForm) {
        appService.forms.EditEntityController.apply(this, arguments);
        this.metadataName = "poultryCalendar";
        this.initController();
    };

    appController.poultryCalendarListController = function ($scope, dataStorage, EntityListForm) {
        appService.forms.ListEntityController.apply(this, arguments);
        this.metadataName = "poultryCalendar";
        this.initController();
    };

})(window);