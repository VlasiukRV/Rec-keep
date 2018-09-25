farmController = function($scope) {
    $scope.showEditForm = false;
    $scope.showListForm = true;

    $scope.openEditForm = function(){};
    $scope.closeEditForm = function(){};

    $scope.openListForm = function(){};
    $scope.closeListForm = function(){};
};

editFarmController = function($scope, dataStorage) {
    appService.formsService.EditEntityController.apply(this, arguments);
    this.metadataName = "farm";
    this.initController();
};

farmListController = function($scope, dataStorage) {
    appService.formsService.ListEntityController.apply(this, arguments);
    this.metadataName = "farm";
    this.initController();
};
