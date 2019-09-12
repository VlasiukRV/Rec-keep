;
(function (exp) {
	if (!exp.moduleConfigSystem) {
		exp.moduleConfigSystem = new Object(null);
	}
	var moduleConfigSystem = exp.moduleConfigSystem;

	moduleConfigSystem.MetadataSet = function(
		userInterface, 
		EntityList, 
		metadataEvents, 
		MetadataEntitySpecification, 
		MetadataObject)
	{

        var MetadataSet = appUtils.Class();
        (function () {
            MetadataSet.prototype.$_buildObject = function () {
                this.includeFd({
                    // entities
                    entityList: Object.create(null),
                    metadataEvents: metadataEvents,

                    // user interface
                    userInterface: userInterface
/*
                    system: {
                        enums: systemEnums
                    }
                    */
                });
            };
            MetadataSet.includeMthd({
                installMetadataObjectEnum: function (metadataEnumSpecification) {
                    var EnumClass = metadataEnumSpecification.enumClass;
                    EnumClass.metadataName = metadataEnumSpecification.metadataName;
                    var metadataSet = this;

                    metadataSet.bookEntityList(EnumClass);
                    // event
                    metadataSet.metadataEvents.subscribe('ev:entityList:' + metadataEnumSpecification.metadataName + ':update',
                        function (event, fCallBack) {
                            EnumClass.update(fCallBack);
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
                        value: '',
                        fieldDescription: {
                            inputType: 'text',
                            label: 'id',
                            availability: true,
                            entityListService: null
                        }
                    };
                    metadataEntitySpecification.entityField.entityField.description = {
                        value: '',
                        fieldDescription: {
                            inputType: 'textarea',
                            label: 'description',
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
                    metadataEvents.subscribe('ev:entityList:' + metadataEntitySpecification.metadataName + ':update',
                        function (event, fCallBack) {
                            entityList.update(fCallBack);
                        }
                    );
                    metadataEvents.subscribe('ev:entityList:' + metadataEntitySpecification.metadataName + ':deleteEntity',
                        function (event, id, fCallBack) {
                            entityList.deleteEntity(id, fCallBack);
                        }
                    );

                    // EditMenu
                    var entitySubMenu = metadataSet.userInterface.commandBar.commandBar.getSubMenu('modelDD');
                    if (entitySubMenu !== undefined) {
                        entitySubMenu.addCommand(varInterfaceUtill.getNewEntityCommand(entitySpecification.metadataName, entitySpecification));
                    }

                    return metadataSet;
                },
                getMetadataSpecification: function (metadataName) {
                    var metadataSpecification = this.entityList[metadataName];
                    if (metadataSpecification) {
                        return metadataSpecification;
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
                    window.status = 'Load objects...';
                    var entityName;
                    for (entityName in this.entityList) {
                        this.metadataEvents.publish('ev:entityList:' + entityName + ':update');
                    }
                }
            });
        })();

        return MetadataSet;
	}

})(window);