;
(function (exp) {
    if (!exp.moduleConfig) {
        exp.moduleConfig = new Object(null);
    }
    var moduleConfig = exp.moduleConfig;

    if (!exp.appController) {
        exp.appController = new Object(null);
    }
    var appController = exp.appController;

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

                var metadataName = metadataEntitySpecification.metadataName

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

    moduleConfig.metadataEntitySpecification_PoultryCalendar = function (Entity, fmListForm_TYPES) {

        var PoultryCalendar = appUtils.Class(Entity);

        return {
            entityClass: PoultryCalendar,
            fnGetEntityInstance: function () {
                return new PoultryCalendar();
            },
            metadataName: 'poultryCalendar',
            metadataRepresentation: 'poultryCalendar',
            metadataDescription: 'Poultry calendar',
            entityField: {
                objectField: {},
                entityField: {

                        // entity field
                        date: {
                            value: '',
                            fieldDescription: {
                                inputType: 'date',
                                label: 'Date',
                                availability: true,
                                entityListService: null
                            }
                        },
                        mortality: {
                            value: 0,
                            fieldDescription: {
                                inputType: 'number',
                                label: 'Mortality',
                                availability: true,
                                entityListService: null
                            }
                        },
                        eggProduction: {
                            value: 0,
                            fieldDescription: {
                                inputType: 'number',
                                label: 'Egg Production',
                                availability: true,
                                entityListService: null
                            }
                        },
                        eggCoolerDirtyFlats: {
                            value: 0,
                            fieldDescription: {
                                inputType: 'number',
                                label: 'Dirty Flats',
                                availability: true,
                                entityListService: null
                            }
                        },
                        eggCoolerTemperatureHi: {
                            value: 0,
                            fieldDescription: {
                                inputType: 'number',
                                label: 'Egg Cooler temperature Hi',
                                availability: true,
                                entityListService: null
                            }
                        },
                        eggCoolerTemperatureLo: {
                            value: 0,
                            fieldDescription: {
                                inputType: 'number',
                                label: 'Egg Cooler temperature Lo',
                                availability: true,
                                entityListService: null
                            }
                        },
                        eggCoolerHumidity: {
                            value: 0,
                            fieldDescription: {
                                inputType: 'number',
                                label: 'Egg Cooler humidity',
                                availability: true,
                                entityListService: null
                            }
                        },
                        barnTemperatureHi: {
                            value: 0,
                            fieldDescription: {
                                inputType: 'number',
                                label: 'Barn temperature Hi',
                                availability: true,
                                entityListService: null
                            }
                        },
                        barnTemperatureLo: {
                            value: 0,
                            fieldDescription: {
                                inputType: 'number',
                                label: 'Barn temperature Lo',
                                availability: true,
                                entityListService: null
                            }
                        },
                        waterMeterRead: {
                            value: 0,
                            fieldDescription: {
                                inputType: 'number',
                                label: 'Water Meter Read',
                                availability: true,
                                entityListService: null
                            }
                        },
                        waterCons: {
                            value: 0,
                            fieldDescription: {
                                inputType: 'number',
                                label: 'Water Cons',
                                availability: true,
                                entityListService: null
                            }
                        },
                        feedCons: {
                            value: 0,
                            fieldDescription: {
                                inputType: 'number',
                                label: 'Feed Cons',
                                availability: true,
                                entityListService: null
                            }
                        }

                    },
                    defineField: {

                        representation: {
                            enumerable: true,
                            get: function () {
                                return '' + this.date;
                            }
                        }

                    }
                },

                fmListForm: {
                    listType: fmListForm_TYPES.table
                },
                entityFieldsPlacing: [
                    [
                    {editFieldId: 'id', fieldLength: 3},
                    {
                        editFieldId: [
                        [{editFieldId: 'date', fieldLength: 12}]
                        ],
                        fieldLength: 5
                    }
                    ],
                    [
                    {editFieldId: 'mortality', fieldLength: 3},
                    {editFieldId: 'eggProduction', fieldLength: 3},
                    ],
                    [
                    {editFieldId: 'eggCoolerDirtyFlats', fieldLength: 3},
                    {editFieldId: 'eggCoolerTemperatureHi', fieldLength: 3},
                    {editFieldId: 'eggCoolerTemperatureLo', fieldLength: 3},
                    {editFieldId: 'eggCoolerHumidity', fieldLength: 3},
                    ],
                    [
                    {editFieldId: 'barnTemperatureHi', fieldLength: 3},
                    {editFieldId: 'barnTemperatureLo', fieldLength: 3},
                    ],
                    [
                    {editFieldId: 'waterMeterRead', fieldLength: 3},
                    {editFieldId: 'waterCons', fieldLength: 3},
                    {editFieldId: 'feedCons', fieldLength: 3},
                    ],
                    [
                    {editFieldId: 'description', fieldLength: 12}
                    ]
                ]
            };
        };

        moduleConfig.metadataEnumSpecification_TaskState = function (Enum) {        
            var EnumTaskState = new Enum();

            return {
                enumClass: EnumTaskState,
                metadataName: 'taskState'
            };
        }

    })(window);