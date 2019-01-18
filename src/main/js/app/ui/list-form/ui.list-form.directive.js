;
(function(exp) {
    if(!exp.moduleUI){
        exp.moduleUI = new Object(null);
    }
    if(!exp.moduleUI.formsDirective){
        exp.moduleUI.formsDirective = new Object(null);
    }    
    var formsDirective = exp.moduleUI.formsDirective;
    
    formsDirective.directiveEntityListForm = function () {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/entityEditDirective/app-template-entity-list-form.html ',
            scope: {
                entityListForm: '='
            },
            link: function (scope, element, attrs) {

            },
            controller: ['$scope', function ($scope) {

                $scope.closeForm = function () {
                    $scope.entityListForm.eventCloseForm();
                };
                $scope.updateForm = function () {
                    $scope.entityListForm.eventUpdateForm();
                    $scope.entityListForm.entities = $scope.entityListForm.appMetadataSet.getEntityList($scope.entityListForm.metadataName).list;
                };
                $scope.findEntity = function (searchEx) {
                    $scope.entityListForm.eventFindEntity(searchEx);
                    $scope.entityListForm.entities = $scope.entityListForm.appMetadataSet.getEntityList($scope.entityListForm.metadataName).list;
                };
                $scope.addNewEntity = function () {
                    $scope.entityListForm.eventAddNewEntity();
                };
                $scope.deleteEntity = function (id) {
                    $scope.entityListForm.eventDeleteEntity(id);
                };
                $scope.editEntity = function (id) {
                    $scope.entityListForm.eventEditEntity(id);
                };

            }]
        }
    };

})(window);