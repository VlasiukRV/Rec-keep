;
(function (exp) {
    if (!exp.moduleConfig) {
        exp.moduleConfig = new Object(null);
    }
    var moduleConfig = exp.moduleConfig;

    moduleConfig.appEnvironment = function (
        metadataSet,

        userInterface,

        metadataEnumSpecification_TaskState,

        metadataEntitySpecification_Farm,
        metadataEntitySpecification_PoultryCalendar,
        metadataEntitySpecification_Project,
        metadataEntitySpecification_User,
        metadataEntitySpecification_Role,
        metadataEntitySpecification_ServiceTask,
        metadataEntitySpecification_Task
    ) {

        var _userInterface = userInterface;

        var appEnvironment = {
            metadataSet: undefined,
            metadataSpecifications: {
                enums: [],
                entities: []
            },
            setMetadataSet: function (_metadataSet) {
                if (_metadataSet) {
                    this.metadataSet = _metadataSet;
                    this.metadataSet.userInterface = _userInterface;
                }
                return this;
            },
            getMetadataSet: function () {
                return this.metadataSet;
            },
            initMetadataSet: function () {
                var i;
                for (i = 0; i < this.metadataSpecifications.enums.length; i++) {
                    this.metadataSet.installMetadataObjectEnum(this.metadataSpecifications.enums[i]);
                }
                for (i = 0; i < this.metadataSpecifications.entities.length; i++) {
                    var metadataEntitySpecification = this.metadataSpecifications.entities[i];
                    this.metadataSet.installMetadataObjectEntity(metadataEntitySpecification);
                    this.registeredController(metadataEntitySpecification);
                }

                return this;
            },

            addMetadataEntitySpecification: function(metadataEntitySpecification) {
                this.metadataSpecifications.entities.push(metadataEntitySpecification);

                return this;
            },
            addMetadataEnumSpecification: function(metadataEnumSpecification) {
                this.metadataSpecifications.enums.push(metadataEnumSpecification);

                return this;
            },

            registeredController: function(metadataEntitySpecification) {

                var metadataName = metadataEntitySpecification.metadataName;

                appController[metadataName + 'Controller'] = function ($scope) {
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

                appController['edit' + appUtils.ucFirst(metadataName) + 'Controller'] = function ($scope, dataStorage, EntityEditForm) {
                    appService.forms.EditEntityController.apply(this, arguments);
                    this.metadataName = metadataName;
                    this.initController();
                };

                appController[metadataName + 'ListController'] = function ($scope, dataStorage, EntityListForm) {
                    appService.forms.ListEntityController.apply(this, arguments);
                    this.metadataName = metadataName;
                    this.initController();
                };

            }

        };

        appEnvironment
            .setMetadataSet(metadataSet)

            .addMetadataEnumSpecification(metadataEnumSpecification_TaskState)
            .addMetadataEntitySpecification(metadataEntitySpecification_Project)
            .addMetadataEntitySpecification(metadataEntitySpecification_User)
            .addMetadataEntitySpecification(metadataEntitySpecification_Role)
            .addMetadataEntitySpecification(metadataEntitySpecification_ServiceTask)
            .addMetadataEntitySpecification(metadataEntitySpecification_Task)
            .addMetadataEntitySpecification(metadataEntitySpecification_Farm)
            .addMetadataEntitySpecification(metadataEntitySpecification_PoultryCalendar)

            .initMetadataSet();

        return appEnvironment;
    };

})(window);