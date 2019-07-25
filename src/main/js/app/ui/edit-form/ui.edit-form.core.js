;
(function (exp) {
    if (!exp.appService) {
        exp.appService = new Object(null);
    }
    var appService = exp.appService;

    if (!appService.forms) {
        appService.forms = new Object(null);
    }
    var forms = appService.forms;

    forms.EditEntityController = function ($scope, dataStorage, EntityEditForm) {
        this.appMetadataSet = dataStorage.getAppMetadataSet();
        this.currentEntity = dataStorage.getCurrentEntityByName(this.metadataName);

        this.initController = function () {
            $scope.$parent.openEditForm = this.openEditForm;
            $scope.$parent.closeEditForm = this.closeEditForm;

            var metadataSpecification = this.appMetadataSet.getEntityList(this.metadataName);

            var entityEditForm = new EntityEditForm();
            entityEditForm.metadataName = this.metadataName;
            entityEditForm.appMetadataSet = this.appMetadataSet;
            entityEditForm.metadataSpecification = metadataSpecification;
            entityEditForm.editFormName = 'New ' + this.metadataName + ':';
            entityEditForm.formProperties = metadataSpecification.metadataObject.fmEditForm.metadataEditFieldsSet;
            entityEditForm.formPropertiesPlacing = metadataSpecification.metadataObject.fmEditForm.metadataEditFieldsPlacing;

            entityEditForm.eventCloseForm = this.closeEditForm;
            entityEditForm.eventUpdateForm = this.updateForm;
            entityEditForm.eventCreateEntity = this.createEntity;

            entityEditForm.openEditForm = this.openEditForm;
            entityEditForm.closeEditForm = this.closeEditForm;
            entityEditForm.updateForm = this.updateForm;
            entityEditForm.createEntity = this.createEntity;

            $scope.entityEditForm = entityEditForm;
            $scope.$parent.entityEditForm = entityEditForm;
        };

        this.updateForm = function () {
            this.currentEntity = dataStorage.getCurrentEntityByName(this.metadataName);
        };

        this.createEntity = function (template) {
            var entityList = this.appMetadataSet.getEntityList(this.metadataName);
            var self = this;
            entityList.addEntityByTemplate(template, function () {
                self.appMetadataSet.metadataEvents.publish('ev:entityList:' + self.metadataName + ':update', function () {
                    self.closeEditForm();
                });
            });
        };

        this.openEditForm = function () {
            $scope.$parent.showEditForm = true;
            this.entityEditForm.updateForm();
        };

        this.closeEditForm = function () {
            $scope.$parent.showEditForm = false;
            $scope.$parent.openListForm();
        };

    };

    forms.entityEditService = function (resource, appHttp) {
        return resource(
            appHttp.getAppHttpUrl('/entity/:entityName/:entityId'),
            {
                entityName: '@entityName',
                entityId: '@entityId'
            },
            {
                getEntity: {
                    method: 'GET'
                },
                createEntity: {
                    method: 'POST'
                },
                deleteEntity: {
                    method: 'DELETE'
                }
            }
        );
    };

})(window);