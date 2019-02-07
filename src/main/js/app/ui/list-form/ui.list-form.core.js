;
(function (exp) {
    if (!exp.appService) {
        exp.appService = new Object(null);
    }

    if (!exp.appService.forms) {
        exp.appService.forms = new Object(null);
    }

    var forms = exp.appService.forms;
    
    forms.ListEntityController = function ($scope, dataStorage, EntityListForm) {
        this.appMetadataSet = dataStorage.getAppMetadataSet();
        this.numPerpage = 10;

        this.initController = function () {
            $scope.flagShowSearch = false;
            $scope.$parent.openListForm = this.openListForm;
            $scope.$parent.closeListForm = this.closeListForm;

            var metadataSpecification = this.appMetadataSet.getEntityList(this.metadataName);
            var entityListForm = new EntityListForm();

            entityListForm.metadataName = this.metadataName;
            entityListForm.appMetadataSet = this.appMetadataSet;
            entityListForm.metadataSpecification = metadataSpecification;
            entityListForm.editFormName = metadataSpecification.metadataObject.description;
            entityListForm.formProperties = metadataSpecification.metadataObject.fmListForm.metadataEditFieldsSet;
            entityListForm.entities = metadataSpecification.list;
            if(metadataSpecification.metadataObject.fmListForm.listType) {
                entityListForm.listType = metadataSpecification.metadataObject.fmListForm.listType;
            }
            entityListForm.numPerPage = this.numPerpage;
            entityListForm.currentPage = 1;
            entityListForm.totalItems = metadataSpecification.list.length;
            entityListForm.entitiesFiltered = [];
            entityListForm.entitiesEmpty = [];

            entityListForm.eventCloseForm = this.closeListForm;
            entityListForm.eventUpdateForm = this.updateForm;
            entityListForm.eventAddNewEntity = this.addNewEntity;
            entityListForm.eventEditEntity = this.editEntity;
            entityListForm.eventDeleteEntity = this.deleteEntity;
            entityListForm.eventFindEntity = this.findEntity;

            entityListForm.openEditForm = this.openEditForm;
            entityListForm.updateViewEntityList = this.updateViewEntityList;
            entityListForm.closeListForm = this.closeListForm;
            entityListForm.eventPageChanged = this.pageChanged;

            $scope.entityListForm = entityListForm;
            $scope.$parent.entityListForm = entityListForm;

            entityListForm.eventUpdateForm();
        };

        this.pageChanged = function () {
            var begin = ((this.currentPage - 1) * this.numPerPage);
            var end = begin + this.numPerPage;
            this.entitiesFiltered = this.entities.slice(begin, end);
            this.entitiesEmpty = new Array(0);
        };

        this.addNewEntity = function () {
            this.openEditForm(this.appMetadataSet.getEntityList(this.metadataName).metadataObject.getEntityInstance());
        };

        this.editEntity = function (id) {
            var entity = this.appMetadataSet.getEntityList(this.metadataName).findEntityById(id);
            if (entity !== undefined) {
                var editEntity = this.appMetadataSet.getEntityList(this.metadataName).metadataObject.getEntityInstance();
                appUtils.fillValuesProperty(entity, editEntity);
                this.openEditForm(editEntity);
            }
        };

        this.deleteEntity = function (id) {
            var self = this;
            this.appMetadataSet.getEntityList(this.metadataName).deleteEntity(id, function () {
                self.updateViewEntityList();
            });
        };

        this.findEntity = function (searchEx) {
            var self = this;
            this.appMetadataSet.getEntityList(this.metadataName).findEntity(searchEx, function () {
                self.totalItems = self.entities.length;
                self.eventPageChanged();
            });
        };

        this.updateViewEntityList = function () {
            var self = this;
            this.appMetadataSet.metadataEvents.publish("ev:entityList:" + this.metadataName + ":update", function () {
                self.totalItems = self.entities.length;
                self.eventPageChanged();
            });
        };

        this.openEditForm = function (currentEntity) {
            dataStorage.setCurrentEntityByName(this.metadataName, currentEntity);
            this.closeListForm();
        };

        this.closeListForm = function () {
            $scope.$parent.showListForm = false;
            $scope.$parent.openEditForm();
        };

        this.openListForm = function () {
            $scope.$parent.showListForm = true;
            this.entityListForm.updateViewEntityList();
        };

        this.updateForm = function () {
            this.updateViewEntityList();
        };

    };

})(window);