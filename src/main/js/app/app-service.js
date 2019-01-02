;
(function (exp) {
    if (!exp.appService) {
        exp.appService = new Object(null);
    }
    var appService = exp.appService;

    appService.dataStorage = function (_appConfig) {

        var appConfig = _appConfig;
        var appMetadataSet = null;

        var currentEntities = new Object(null);

        return {
            getAppConfig: function () {
                return appConfig;
            },
            getAppMetadataSet: function () {
                return appMetadataSet;
            },
            setAppMetadataSet: function (metadataSet) {
                appMetadataSet = metadataSet;
            },

            setCurrentEntityByName: function (entityName, _date) {
                if(entityName != undefined) {
                    currentEntities[entityName] = _date;
                }
            },
            getCurrentEntityByName: function (entityName) {
                if(entityName != undefined) {
                    if (currentEntities[entityName] == null) {
                        currentUser = this.getNewEntityByName(entityName);
                    }
                    return currentEntities[entityName];
                }else{
                    return null;
                }
            },
            getNewEntityByName: function (entityName) {
                return this.getAppMetadataSet().getEntityInstance(entityName);
            }
        };
    };

////////////////////////////////////
// angular SERVICEs
////////////////////////////////////

    appService.appEnvironment = function ($location, appConfig) {
        var location = $location;
        return {
            getAppHttpUrl: function getAppHttpUrl(urlSuffix) {
                var appAddress = "http://" + location.$$host + ":" + location.$$port;

                return appAddress + "/" + appConfig.appName + urlSuffix;
            }
        }
    };

    appService.setRoute = function (routeProvider) {
        routeProvider
            .when('/login', {
                templateUrl: '/login'
            })
            .when("/user", {
                templateUrl: "/appTaskList/security/usersList"
            })
            .when("/role", {
                templateUrl: "/appTaskList/security/roleList"
            })
            .when("/farm", {
                templateUrl: '/appTaskList/farmsList'
            })            
            .when("/project", {
                templateUrl: '/appTaskList/projectsList'
            })
            .when("/task", {
                templateUrl: "/appTaskList/tasksList"
            })
            .when("/currentPrincipalInformation", {
                templateUrl: "/appTaskList/currentPrincipalInformation"
            })
            .otherwise({
                redirectTo: '/appTaskList'
            })

        ;
        return routeProvider;
    };

    appService.appHttpResponseInterceptor = function ($q, $location, errorDescriptions) {
        return {
            'request': function (config) {
                config.url = config.url.split('%2F').join('/');
                return config;
            },

            'response': function (response) {
                if (errorDescriptions) {
                    errorDescriptions.handleResponse(response);
                }
                if (typeof response.data === 'string') {
                    if (response.data.indexOf instanceof Function &&
                        response.data.indexOf('id="app-login-page"') != -1) {
                        $location.path("/login");
                }
                return response;
            },

            'responseError': function (response) {
                if (errorDescriptions) {
                    errorDescriptions.handleResponse(response);
                }
                return $q.reject(response);
            }
        };
    };

    appService.entityEditService = function (resource, appEnvironment) {
        return resource(
            appEnvironment.getAppHttpUrl('/entity/:entityName/:entityId'),
            {
                entityName: "@entityName",
                entityId: "@entityId"
            },
            {
                getEntity: {
                    method: "GET"
                },
                createEntity: {
                    method: "POST"
                },
                deleteEntity: {
                    method: "DELETE"
                }
            }
        );
    };

////////////////////////////////////
// App metadata
////////////////////////////////////


    // Abstract model of application
    var abstractAppModel = Object.create(null);
    (function () {

        var MetadataEvents = appUtils.Class();
        (function () {
            MetadataEvents.prototype.$_buildObject = function () {
                this.includeFd({
                    events: $({})
                });
            };
            MetadataEvents.includeMthd({
                subscribe: function () {
                    this.events.bind.apply(this.events, arguments);
                },
                unSubscribe: function () {
                    this.events.unbind.apply(this.events, arguments);
                },
                publish: function () {
                    this.events.trigger.apply(this.events, arguments);
                }
            });
        })();
        var metadataEventsImpl = new MetadataEvents();

        // Abstract model of entity
        var Entity = appUtils.Class();
        (function () {
            Entity.prototype.includeEntityFd = function (fd, entityFd, defineFd) {
                var strEntityFd = "";
                this.includeFd({entityFd: ""});
                if (fd) {
                    this.includeFd(fd);
                }
                if (entityFd) {
                    this.includeFd(entityFd);
                    for (var key in entityFd) {
                        strEntityFd = "" + strEntityFd + ", " + key;
                    }
                    if (strEntityFd.length > 0) strEntityFd = strEntityFd.slice(2);
                    this.includeFd({entityFd: strEntityFd});
                }
                if (defineFd) {
                    for (var key in defineFd) {
                        this.includeDefineFd(key, defineFd[key])
                    }
                }
            };

            Entity.prototype.$_buildObject = function () {
                this.includeEntityFd(
                    {
                        // object field
                        metadataName: ""
                    }, {
                        // entity field
                        id: null,
                        description: ""
                    }, {
                        // define field
                        representation: {
                            enumerable: true,
                            get: function () {
                                if (this.name) {
                                    return "" + this.name;
                                } else {
                                    return "entity [" + this.metadataName + "] id: " + this.id + "";
                                }
                            }
                        }
                    }
                );

            };

            Entity.includeMthd({
                isEmpty: function () {
                    // ToDo write what attribute of empty entity
                    return this.id == 0 || this.id == null;
                },

                translateToEntityJSON: function () {
                    var replacer = this.entityFd.split(", ");
                    return JSON.stringify(this, replacer);
                },

                createEntity: function (fCallBack) {
                    if (!this.metadataName) {

                    }
                    var entityJSON = this.translateToEntityJSON();
                    abstractAppModel.resourceService.getEntityEditService().createEntity(
                        {entityName: this.metadataName}, entityJSON,
                        baseCreateEntity.bind(this, fCallBack),
                        function (httpResponse) {
                            /*resourceService.collError(httpResponse)*/
                        }
                    )
                }

            });
            var baseCreateEntity = function () {
                var fCallBack = arguments[0];
                var data = arguments[1];

                if (data.result = 200) {
                    var originalEntity = data.data;
                    if (originalEntity) {
                        appUtils.fillValuesProperty(originalEntity, this);
                        fCallBack(this);
                    }
                }
            };
        })();

        // Abstract model of entity list
        var EntityList = appUtils.Class();
        (function () {
            EntityList.prototype.$_buildObject = function () {
                this.includeFd(
                    {
                        metadataName: "",
                        list: [],
                        metadataObject: null
                    });
            };
            var updateEnt = function (fCallBack, data) {
                /*
                 var fCallBack = arguments[0];
                 var data = arguments[1];
                 */

                if (data.result = 200) {
                    var originalUserList = data.data;
                    if (originalUserList) {
                        originalUserList.forEach(function (item, i, arr) {
                            var entity = this.metadataObject.getEntityInstance();
                            appUtils.fillValuesProperty(item, entity);
                            this.addEntity(entity);
                        }, this);
                    }
                    console.log("Update " + this.metadataObject.metadataName);
                }

                if (fCallBack) {
                    fCallBack(this);
                }
            };

            var deleteEnt = function () {
                var id = arguments[0];
                var fCallBack = arguments[1];
                var data = arguments[2];

                if (data.result = 200) {
                    this.list.forEach(function (item, i) {
                        if (item.id == id) {
                            this.list.splice(i, 1);
                            return true;
                        }
                    }, this);
                }

                if (fCallBack) {
                    fCallBack(this);
                }
            };

            EntityList.includeMthd({
                addEntity: function (entity) {
                    var entityAdded = false;
                    for (var index = 0; index < this.list.length; ++index) {
                        var item = this.list[index];
                        if (item.id === entity.id) {
                            this.list[index] = entity;
                            entityAdded = true;
                            return;
                        }
                    }
                    if (!entityAdded) {
                        this.list.push(entity);
                    }
                },
                findEntityById: function (id) {
                    for (var index = 0; index < this.list.length; ++index) {
                        var item = this.list[index];
                        if (item.id === id) {
                            return item;
                        }
                    }
                    return undefined;
                },
                addEntityByTemplate: function (template, fCallBack) {
                    var entity = null;
                    if (template.isEmpty()) {
                        entity = this.metadataObject.getEntityInstance(this.metadataName);
                    } else {
                        entity = this.findEntityById(template.id);
                    }

                    var entityList = this;
                    appUtils.fillValuesProperty(template, entity);
                    entity.createEntity(function (data) {
                        entityList.addEntity(data);
                        fCallBack();
                    });
                },
                update: function (fCallBack) {
                    var self = this;
                    self.list = [];
                    abstractAppModel.resourceService.getEntityEditService()
                        .getEntity({entityName: this.metadataName}, {},
                        function (data) {
                            updateEnt.call(self, fCallBack, data)
                        },
                        function (httpResponse) {
                            /*resourceService.collError(httpResponse)*/
                        }
                    );
                },
                findEntity: function (searchEx, fCallBack) {
                    var self = this;
                    self.list = [];
                    abstractAppModel.resourceService.getEntityEditService()
                        .getEntity({entityName: this.metadataName, search: searchEx}, {},
                        function (data) {
                            updateEnt.call(self, fCallBack, data)
                        },
                        function (httpResponse) {
                            /*resourceService.collError(httpResponse)*/
                        }
                    );
                },
                deleteEntity: function (id, fCallBack) {
                    abstractAppModel.resourceService.getEntityEditService()
                        .deleteEntity({entityName: this.metadataName, entityId: id}, {},
                        deleteEnt.bind(this, id, fCallBack),
                        function (httpResponse) {
                            /*resourceService.collError(httpResponse)*/
                        }
                    )
                }

            })
        })();

        // Abstract model of enums
        var Enum = appUtils.Class();
        (function () {
            Enum.prototype.$_buildObject = function () {
                this.includeFd(
                    {
                        metadataName: "",
                        list: {}
                    });
            };

            Enum.includeMthd({
                update: function () {
                    var source = this;
                    abstractAppModel.resourceService.getEntityEditService()
                        .getEntity({entityName: "enum", entityId: this.metadataName}, {},
                        function (data) {
                            source.list = data.data;
                        },
                        function (httpResponse) {
                            /*resourceService.collError(httpResponse)*/
                        }
                    );
                }
            });

        })();

        // Abstract model of entity field
        var MetadataEditField = appUtils.Class();
        (function () {
            MetadataEditField.prototype.$_buildObject = function () {
                this.includeFd({
                    name: "",
                    inputType: "text",
                    label: "<--label for property-->",

                    entityListService: {},

                    availability: true,

                    visibility: true,
                    availabilityInEditForm: true,
                    visibilityInEditForm: true,
                    availabilityInListForm: true,
                    visibilityInListForm: true
                })
            };
            MetadataEditField.includeMthd({
                buildEditField: function (fieldDescription, name) {
                    if (name) {
                        this.name = name;
                    } else {
                        if (fieldDescription.name) {
                            this.name = fieldDescription.name;
                        }
                    }
                    if (fieldDescription.inputType) {
                        this.inputType = fieldDescription.inputType;
                    }
                    if (fieldDescription.label) {
                        this.label = appUtils.string.toTitleCase(fieldDescription.label);
                    } else {
                        this.label = appUtils.string.toTitleCase(this.name);
                    }
                    if (fieldDescription.availability) {
                        this.availability = fieldDescription.availability;
                    }
                    if (fieldDescription.entityListService) {
                        this.entityListService = fieldDescription.entityListService;
                    }
                }
            })
        })();

        var MetadataObject = appUtils.Class();
        (function () {
            MetadataObject.prototype.$_buildObject = function () {
                this.includeFd({
                    metadataName: "",

                    representation: "",
                    description: "",
                    image: null,

                    metadataEditFieldsSet: [],
                    fmEditForm: {
                        metadataEditFieldsSet: [],
                        metadataEditFieldsPlacing: []
                    },
                    fmListForm: {
                        metadataEditFieldsSet: [],
                        metadataFilterFieldsSet: [],
                    }
                })
            };
            MetadataObject.includeMthd({
                getEntityInstance: function () {
                    return null;
                },
                installMetadata: function (metadataName, fnGetEntityInstance, representation, description, image) {
                    this.metadataName = metadataName;
                    this.getEntityInstance = fnGetEntityInstance;

                    if (representation) {
                        this.representation = representation;
                    }
                    if (description) {
                        this.description = description;
                    }
                    if (image) {
                        this.image = image;
                    }

                },
                bookEntityForms: function (metadataEntitySpecification) {
                    var _metadataEditFieldsSet = metadataEntitySpecification.getEntityFieldsDescription();
                    var _metadataFilterFieldsSet = undefined;
                    var _editFieldsPlacing = metadataEntitySpecification.getEntityFieldsPlacing();
                    var _fmListForm = metadataEntitySpecification.getFmListForm();

                    var i;

                    if(_fmListForm) {
                        if(_fmListForm.listType) {
                            this.fmListForm.listType = _fmListForm.listType;
                        }
                    }

                    if (_editFieldsPlacing) {
                        this.fmEditForm.metadataEditFieldsPlacing = _editFieldsPlacing;
                    }
                    if (_metadataEditFieldsSet) {
                        var editField = undefined;

                        for (i = 0; i < _metadataEditFieldsSet.length; i++) {
                            editField = _metadataEditFieldsSet[i];

                            if (editField.availability) {
                                this.metadataEditFieldsSet.push(editField);
                            }
                        }

                        for (i = 0; i < this.metadataEditFieldsSet.length; i++) {
                            editField = this.metadataEditFieldsSet[i];

                            if (editField.availabilityInEditForm) {
                                this.fmEditForm.metadataEditFieldsSet[editField.name] = editField;
                            }
                            if (editField.availabilityInListForm) {
                                this.fmListForm.metadataEditFieldsSet.push(editField);
                            }
                        }
                    }
                    if (_metadataFilterFieldsSet) {
                        for (i = 0; i < _metadataEditFieldsSet.length; i++) {
                            editField = _metadataEditFieldsSet[i];
                            /*if (appUtils.find(this.fmListForm.metadataEditFieldsSet, editField) > 0) {*/
                            this.fmListForm.metadataFilterFieldsSet.push(editField);
                            /*}*/
                        }
                    }
                }
            })
        })();

        var MetadataEntitySpecification = appUtils.Class();
        (function () {
            MetadataEntitySpecification.prototype.$_buildObject = function () {
                this.includeFd({
                    metadataName: "",
                    metadataRepresentation: "",
                    metadataDescription: "",
                    entityField: {
                        objectField: {},
                        entityField: {},
                        defineField: {}
                    },

                    fmListForm: {
                        listType: systemEnums.fmListForm_TYPES.table
                    },
                    entityFieldsPlacing: []
                })
            };
            MetadataEntitySpecification.includeMthd({
                getObjectFields: function () {
                    var objectFields = this.entityField.objectField;
                    objectFields.metadataName = this.metadataName;
                    return objectFields;
                },
                getEntityFields: function () {
                    var source = this.entityField.entityField;
                    var entityFields = {};
                    for (var key in source) {
                        if (angular.isArray(source[key].value)) {
                            entityFields[key] = [];
                            // ToDo
                            if (source[key].value.fillByTemplate) {
                                entityFields[key].fillByTemplate = source[key].value.fillByTemplate;
                            }
                            if (source[key].value.representationList) {
                                entityFields[key].representationList = source[key].value.representationList;
                                /*entityFields[key].representationList = source[key].representationList;*/
                            }
                        } else if (typeof source[key].value === 'object') {
                            if (source[key].fieldDescription && source[key].fieldDescription.getInstance) {
                                entityFields[key] = source[key].fieldDescription.getInstance();
                            } else {
                                entityFields[key] = {};
                            }
                        }
                        else {
                            entityFields[key] = source[key].value;
                        }
                    }
                    return entityFields;
                },
                getEntityFieldsDescription: function () {
                    var source = this.entityField.entityField;
                    var entityFieldsDescription = [];
                    for (var key in source) {
                        var metadataEditField = new MetadataEditField();
                        metadataEditField.buildEditField(source[key].fieldDescription, key);
                        entityFieldsDescription.push(metadataEditField);
                    }
                    return entityFieldsDescription;
                },
                getFmListForm: function () {
                    return this.fmListForm;
                },
                getEntityFieldsPlacing: function () {
                    return this.entityFieldsPlacing;
                }
            });
        })();

        var MetadataSet = appUtils.Class();
        (function () {
            MetadataSet.prototype.$_buildObject = function () {
                this.includeFd({
                    // entities
                    entityList: Object.create(null),
                    metadataEvents: metadataEventsImpl,

                    // user interface
                    userInterface: new varInterfaceUtill.UserInterface(),

                    system: {
                        enums: systemEnums
                    }
                });
            };
            MetadataSet.includeMthd({
                installMetadataObjectEnum: function (metadataEnumSpecification) {
                    var EnumClass = metadataEnumSpecification.enumClass;
                    EnumClass.metadataName = metadataEnumSpecification.metadataName;
                    var metadataSet = this;

                    metadataSet.bookEntityList(EnumClass);
                    // event
                    metadataSet.metadataEvents.subscribe("ev:entityList:" + metadataEnumSpecification.metadataName + ":update",
                        function (event, fCallBack) {
                            EnumClass.update(fCallBack)
                        }
                    );

                    return metadataSet;
                },
                installMetadataObjectEntity: function (entitySpecification) {
                    var metadataSet = this;
                    var EntityClass = entitySpecification.entityClass;

                    var metadataEntitySpecification = new MetadataEntitySpecification();
                    metadataEntitySpecification.metadataName = entitySpecification.metadataName;
                    metadataEntitySpecification.metadataRepresentation = entitySpecification.metadataRepresentation;
                    metadataEntitySpecification.metadataDescription = entitySpecification.metadataDescription;

                    appUtils.fillAllValuesProperty(entitySpecification.entityField.entityField, metadataEntitySpecification.entityField.entityField);
                    appUtils.fillAllValuesProperty(entitySpecification.entityField.objectField, metadataEntitySpecification.entityField.objectField);
                    metadataEntitySpecification.entityField.defineField = entitySpecification.entityField.defineField;

                    metadataEntitySpecification.entityField.entityField.id = {
                        value: "",
                        fieldDescription: {
                            inputType: "text",
                            label: "id",
                            availability: true,
                            entityListService: null
                        }
                    };
                    metadataEntitySpecification.entityField.entityField.description = {
                        value: "",
                        fieldDescription: {
                            inputType: "textarea",
                            label: "description",
                            availability: true,
                            entityListService: null
                        }
                    };
                    metadataEntitySpecification.entityFieldsPlacing = entitySpecification.entityFieldsPlacing;
                    if(entitySpecification.fmListForm) {
                        if(entitySpecification.fmListForm.listType) {
                            metadataEntitySpecification.fmListForm.listType = entitySpecification.fmListForm.listType;
                        }
                    }

                    (function () {
                        // field
                        EntityClass.prototype.$_buildObject = function () {
                            this.includeEntityFd(
                                metadataEntitySpecification.getObjectFields(),
                                metadataEntitySpecification.getEntityFields(),
                                metadataEntitySpecification.entityField.defineField
                            );
                        };
                    })();

                    var entityList = new EntityList();
                    entityList.metadataName = metadataEntitySpecification.metadataName;

                    var metadataObject = new MetadataObject();

                    metadataObject.installMetadata(metadataEntitySpecification.metadataName,
                        entitySpecification.fnGetEntityInstance,
                        metadataEntitySpecification.metadataRepresentation,
                        metadataEntitySpecification.metadataDescription
                    );

                    metadataObject.bookEntityForms(metadataEntitySpecification);

                    metadataSet.bookMetadataObject(metadataObject);
                    metadataSet.bookEntityList(entityList);

                    // event
                    metadataEventsImpl.subscribe("ev:entityList:" + metadataEntitySpecification.metadataName + ":update",
                        function (event, fCallBack) {
                            entityList.update(fCallBack)
                        }
                    );
                    metadataEventsImpl.subscribe("ev:entityList:" + metadataEntitySpecification.metadataName + ":deleteEntity",
                        function (event, id, fCallBack) {
                            entityList.deleteEntity(id, fCallBack);
                        }
                    );

                    // EditMenu
                    var entitySubMenu = metadataSet.userInterface.commandBar.commandBar.getSubMenu('modelDD');
                    if (entitySubMenu !== undefined) {
                        entitySubMenu.addCommand(varInterfaceUtill.getNewEntityCommand(entitySpecification.metadataName, entitySpecification.metadataRepresentation))
                    }

                    return metadataSet;
                },
                getMetadataSpecification: function (metadataName) {
                    var metadataSpecification = this.entityList[metadataName];
                    if (metadataSpecification) {
                        return metadataSpecification
                    } else {
                        metadataSpecification = {metadataName: metadataName, metadataObject: null, entityList: null};
                        this.entityList[metadataName] = metadataSpecification;
                        return metadataSpecification;
                    }
                },
                bookMetadataObject: function (metadataObject) {
                    var metadataSpecification = this.getMetadataSpecification(metadataObject.metadataName);
                    metadataSpecification.metadataObject = metadataObject;
                },
                bookEntityList: function (entityList) {
                    var metadataSpecification = this.getMetadataSpecification(entityList.metadataName);
                    metadataSpecification.entityList = entityList;
                    metadataSpecification.entityList.metadataObject = metadataSpecification.metadataObject;
                },
                getMetadataObject: function (metadataName) {
                    if (this.entityList[metadataName]) {
                        return this.entityList[metadataName].metadataObject;
                    } else {
                        return undefined;
                    }
                },
                getEntityList: function (metadataName) {
                    if (this.entityList[metadataName]) {
                        return this.entityList[metadataName].entityList;
                    } else {
                        return undefined;
                    }
                },
                getEntityInstance: function (metadataName) {
                    var metadataSpecification = this.entityList[metadataName];
                    if (metadataSpecification) {
                        if (metadataSpecification.metadataObject) {
                            return metadataSpecification.metadataObject.getEntityInstance();
                        }
                    }
                    return null;
                },
                getInterface: function () {
                    return this.userInterface;
                },

                loadAllEntities: function () {
                    window.status = "Load objects...";
                    var entityName;
                    for (entityName in this.entityList) {
                        this.metadataEvents.publish("ev:entityList:" + entityName + ":update")
                    }
                }
            })
        })();

        abstractAppModel.resourceService = undefined;
        abstractAppModel.Entity = Entity;
        abstractAppModel.Enum = Enum;
        abstractAppModel.MetadataSet = MetadataSet;

    })();

    if (!appService.appInitialization) {
        appService.appInitialization = new Object(null);
    }
    var appInitialization = appService.appInitialization;
    (function () {
        appInitialization.abstractAppModel = abstractAppModel;
        appInitialization.metadataSet = undefined;
        appInitialization.metadataSpecifications = {
            enums: [],
            entities: []
        };

        appInitialization.setMetadataSet = function (metadataSet) {
            if (metadataSet === undefined) {
                appInitialization.metadataSet = new abstractAppModel.MetadataSet();
            } else {
                appInitialization.metadataSet = metadataSet;
            }

            return appInitialization;
        };

        appInitialization.getMetadataSet = function () {
            return appInitialization.metadataSet;
        };

        appInitialization.initMetadataSet = function () {
            var appMetadataSet = appInitialization.metadataSet;

            // EditBar
            var menuModel = varInterfaceUtill.getNewDropdownCommand("modelDD", "Model");
            var menuSystem = varInterfaceUtill.getNewDropdownCommand("systemDD", "System")
                .addCommand(varInterfaceUtill.getNewCommand("initDataBase", "initDataBase", function () {
                    appService.ExecuteSystemCommand(abstractAppModel.resourceService, "jdbc/initDataBase")
                }))
                .addCommand(varInterfaceUtill.getNewCommand("runCreateReport", "runCreateReport", function () {
                    appService.ExecuteSystemCommand(abstractAppModel.resourceService, "taskScheduler/runCreateReport")
                }))
                .addCommand(varInterfaceUtill.getNewCommand("stopCreateReport", "stopCreateReport", function () {
                    appService.ExecuteSystemCommand(abstractAppModel.resourceService, "taskScheduler/stopCreateReport")
                }))
                .addCommand(varInterfaceUtill.getNewCommand("runArchiveService", "runArchiveService", function () {
                    appService.ExecuteSystemCommand(abstractAppModel.resourceService, "taskScheduler/runArchiveService")
                }))
                .addCommand(varInterfaceUtill.getNewCommand("stopArchiveService", "stopArchiveService", function () {
                    appService.ExecuteSystemCommand(abstractAppModel.resourceService, "taskScheduler/stopArchiveService")
                }))
                .addCommand(varInterfaceUtill.getNewCommand("sendMail", "sendMail", function () {
                    appService.ExecuteSystemCommand(abstractAppModel.resourceService, "taskScheduler/sendMail")
                }))
                .addCommand(varInterfaceUtill.getNewCommand("interruptTaskExecutor", "interruptTaskExecutor", function () {
                    appService.ExecuteSystemCommand(abstractAppModel.resourceService, "taskScheduler/interruptTaskExecutor")
                }));

            var userInterface = new varInterfaceUtill.UserInterface();
            userInterface.appMetadataSet = appMetadataSet;
            userInterface
                .commandBarSetMainUrl("#/task")
                .commandBar.commandBar
                    .addCommand(menuModel)
                    .addCommand(menuSystem);

            appMetadataSet.userInterface = userInterface;
            var i;
            for (i = 0; i < appInitialization.metadataSpecifications.enums.length; i++) {
                appMetadataSet.installMetadataObjectEnum(appInitialization.metadataSpecifications.enums[i]);
            }
            for (i = 0; i < appInitialization.metadataSpecifications.entities.length; i++) {
                appMetadataSet.installMetadataObjectEntity(appInitialization.metadataSpecifications.entities[i]);
            }
            return appInitialization;
        }

    })();

    appService.getMetadataSet = function (resourceService) {

        abstractAppModel.resourceService = resourceService;

        appInitialization
            .setMetadataSet()

            .initEnumsModel()
            .initProjectModel()
            .initUserModel()
            .initTaskModel()
            .initFarmModel()

            .initMetadataSet();

        return appInitialization.getMetadataSet();
    };

})(window);