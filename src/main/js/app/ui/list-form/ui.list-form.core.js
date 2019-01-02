;
(function (exp) {
    if (!exp.appService) {
        exp.appService = new Object(null);
    }

    if (!exp.appService.forms) {
        exp.appService.forms = new Object(null);
    }

    var forms = exp.appService.forms;
    
    forms.fmListForm_TYPES: {
            table: {
                name: 'table',
                quantityProperties: 5,
                limitCellLength: 20,
            },
            tile: {
                name: 'tile'
            },
            panel: {
                name: 'panel',
                quantityProperties: 5,
                limitCellLength: 20,
            }
    };

    forms.EditForm = appUtils.Class();
    (function () {
        EditForm.prototype.$_buildObject = function () {
            this.includeFd({
                editFormName: "<--label for form-->",
                formProperties: {},

                eventCloseForm: function () {
                },
                eventUpdateForm: function () {
                }
            });
        };
    })();

var EntityListForm = appUtils.Class(forms.EditForm);
    (function () {
        EntityListForm.prototype.$_buildObject = function () {
            this.includeFd({
                entities: [],

                toolboxMenu: {
                    swichPanel: {
                        command:function (selfScope) {
                            selfScope.entityListForm.setListType(forms.fmListForm_TYPES.panel);
                        },
                        text:'swich Panel',
                        ico: 'glyphicon glyphicon-list-alt'
                    },
                    swichTable: {
                        command:function (selfScope) {
                            selfScope.entityListForm.setListType(forms.fmListForm_TYPES.table);
                        },
                        text:'swich Table',
                        ico: 'glyphicon glyphicon-align-justify'
                    },
                    swichTile: {
                        command:function (selfScope) {
                            selfScope.entityListForm.setListType(forms.fmListForm_TYPES.tile);
                        },
                        text:'swich Tile',
                        ico: 'glyphicon glyphicon-th'
                    }

                },
                entityToolboxMenu: {
                    editEntity: {
                        command: function (selfScope) {
                            selfScope.entityListForm.eventEditEntity(selfScope.entity.id);
                        },
                        text:'Edit',
                        ico: 'glyphicon glyphicon-pencil'
                    },
                    deleteEntity: {
                        command:function (selfScope) {
                            selfScope.entityListForm.eventDeleteEntity(selfScope.entity.id);
                        },
                        text:'Delete',
                        ico: 'glyphicon glyphicon-trash'
                    }

                },

                listConfig: {
                    'panel': {
                        quantityProperties: 5,
                        limitCellLength: 20
                    }
                },
                listType: systemEnums.fmListForm_TYPES.table,
                setListType: function (listType) {
                    this.listType = listType;
                },

                eventAddNewEntity: function () {
                },
                eventDeleteEntity: function (id) {
                },
                eventEditEntity: function (id) {
                },
                eventFindEntity: function () {

                }
            });
        };
    })();
    
    forms.ListEntityController = function ($scope, dataStorage) {
        this.appMetadataSet = dataStorage.getAppMetadaSet();
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
            var begin = ((this.currentPage - 1) * this.numPerPage)
                , end = begin + this.numPerPage;
            this.entitiesFiltered = this.entities.slice(begin, end);
            this.entitiesEmpty = new Array(0);
        };

        this.addNewEntity = function () {
            this.openEditForm(this.appMetadataSet.getEntityList(this.metadataName).metadataObject.getEntityInstance())
        };

        this.editEntity = function (id) {
            var entity = this.appMetadataSet.getEntityList(this.metadataName).findEntityById(id);
            if (entity != undefined) {
                var editEntity = this.appMetadataSet.getEntityList(this.metadataName).metadataObject.getEntityInstance();
                appUtils.fillValuesProperty(entity, editEntity);
                this.openEditForm(editEntity);
            }
        };

        this.deleteEntity = function (id) {
            var self = this;
            this.appMetadataSet.getEntityList(this.metadataName).deleteEntity(id, function (data) {
                self.updateViewEntityList();
            });
        };

        this.findEntity = function (searchEx) {
            var self = this;
            this.appMetadataSet.getEntityList(this.metadataName).findEntity(searchEx, function (data) {
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