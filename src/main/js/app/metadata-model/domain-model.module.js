angular.module('module.domain-model', 
	[
		'module.metadata-model',
		'module.ui.list-form'
	]
)

.service('metadataEntitySpecification_Farm', [
	'Entity',
	'fmListForm_TYPES',

	function(Entity, fmListForm_TYPES){

        var Farm = appUtils.Class(Entity);

        return {
            entityClass: Farm,
            fnGetEntityInstance: function () {
                	return new Farm()
            	},
            metadataName: "farm",
            metadataRepresentation: "farm",
            metadataDescription: "Farm list",
            entityField: {
                objectField: {},
                entityField: {

                    // entity field
                    name: {
                        value: "",
                        fieldDescription: {
                            inputType: "text",
                            label: "name",
                            availability: true,
                            entityListService: null
                        }
                    }

                },
                defineField: {

                    representation: {
                        enumerable: true,
                        get: function () {
                            return "" + this.name;
                        }
                    }

                }
            	},

            fmListForm: {
                listType: fmListForm_TYPES.tile
            	},
            entityFieldsPlacing: [
                [
                    {editFieldId: "id", fieldLength: 3},
                    {
                        editFieldId: [
                            [{editFieldId: "name", fieldLength: 12}]
                        ],
                        fieldLength: 5
                    }
                ],
                [
                    {editFieldId: "description", fieldLength: 12}
                ]
            ]
        }
	}]
)
.service('metadataEntitySpecification_Project', [
	'Entity',

 	function(Entity){
        var Project = appUtils.Class(Entity);

        return {
            entityClass: Project,
            fnGetEntityInstance: function () {
                return new Project()
            },
            metadataName: "project",
            metadataRepresentation: "Project",
            metadataDescription: "Project list",
            entityField: {
                objectField: {},
                entityField: {

                    // entity field
                    name: {
                        value: "",
                        fieldDescription: {
                            inputType: "text",
                            label: "name",
                            availability: true,
                            entityListService: null
                        }
                    }

                },
                defineField: {

                    representation: {
                        enumerable: true,
                        get: function () {
                            return "" + this.name;
                        }
                    }

                }
            },

            entityFieldsPlacing: [
                [
                    {editFieldId: "id", fieldLength: 3},
                    {
                        editFieldId: [
                            [{editFieldId: "name", fieldLength: 12}]
                        ],
                        fieldLength: 5
                    }
                ],
                [
                    {editFieldId: "description", fieldLength: 12}
                ]
            ]
        };	
	}]
)
.service('metadataEntitySpecification_User', [
	'Entity',
	'fmListForm_TYPES',

	function(Entity, fmListForm_TYPES){
	
        var User = appUtils.Class(Entity);
        return {
            entityClass: User,
            fnGetEntityInstance: function () {
                return new User()
            },
            metadataName: "user",
            metadataRepresentation: "User",
            metadataDescription: "User list",
            entityField: {
                objectField: {},
                entityField: {

                    username: {
                        value: "",
                        fieldDescription: {
                            inputType: "text",
                            label: "username",
                            availability: true,
                            entityListService: null
                        }
                    },
                    password: {
                        value: "",
                        fieldDescription: {
                            inputType: "text",
                            label: "password",
                            availability: true,
                            entityListService: null
                        }
                    },
                    mailAddress: {
                        value: "",
                        fieldDescription: {
                            inputType: "text",
                            label: "mailAddress",
                            availability: true,
                            entityListService: null
                        }
                    },
                    enabled: {
                        value: false,
                        fieldDescription: {
                            inputType: "checkbox",
                            label: "enabled",
                            availability: false,
                            entityListService: null
                        }
                    }

                },
                defineField: {

                    representation: {
                        enumerable: true,
                        get: function () {
                            return "" + this.username + " (" + this.description + ") ";
                        }
                    }

                }
            },

            fmListForm: {
                listType: fmListForm_TYPES.panel
            },

            entityFieldsPlacing: [
                [
                    {editFieldId: "id", fieldLength: 3}
                ],
                [
                    {
                        editFieldId: [
                            [{editFieldId: "username", fieldLength: 12}],
                            [{editFieldId: "password", fieldLength: 12}],
                            [{editFieldId: "mailAddress", fieldLength: 12}]
                        ],
                        fieldLength: 5
                    }
                ],
                [
                    {editFieldId: "description", fieldLength: 12}
                ]
            ]

        };
	}]
)
.service('metadataEntitySpecification_Role', [
	'Entity',
    '$injector',

	function(Entity, $injector){

        var appMetadataSet = $injector.get('appMetadataSet');
        var Role = appUtils.Class(Entity);

        var metadataEntitySpecification_Role = {
            entityClass: Role,
            fnGetEntityInstance: function () {
                return new Role()
            },
            metadataName: "role",
            metadataRepresentation: "Role",
            metadataDescription: "Role list",
            entityField: {
                objectField: {},
                entityField: {

                    // entity field
                    role: {
                        value: "",
                        fieldDescription: {
                            inputType: "text",
                            label: "role",
                            availability: true,
                            entityListService: null
                        }
                    },
                    users: {
                        value: [],
                        fieldDescription: {
                            inputType: "multiselect",
                            label: "users",
                            availability: true,
                            entityListService: function () {
                                return appMetadataSet.getEntityList("user");
                            }
                        }
                    }


                },
                defineField: {

                    representation: {
                        enumerable: true,
                        get: function () {
                            return "" + this.role;
                        }
                    }

                }
            },
            entityFieldsPlacing: [
                [
                    {editFieldId: "id", fieldLength: 3},
                    {
                        editFieldId: [
                            [{editFieldId: "role", fieldLength: 12}]
                        ],
                        fieldLength: 5
                    }
                ],
                [
                    {editFieldId: "users", fieldLength: 5},
                    {editFieldId: "description", fieldLength: 12}
                ]
            ]
        };
        metadataEntitySpecification_Role.entityField.entityField.users.value.representationList = function () {
            var str = "";
            var k = 0;
            while (true) {
                if (k == this.length) {
                    break;
                }
                str = str + "; " + this[k].representation;
                k = k + 1;

            }
            return str;
        };
        metadataEntitySpecification_Role.entityField.entityField.users.value.fillByTemplate = function (template) {
            this.length = 0;
            var k = 0;
            while (true) {
                if (k == template.length) {
                    break;
                }
                var entity = appMetadataSet.getEntityInstance("user");
                appUtils.fillValuesProperty(template[k], entity);
                this.push(entity);
                k = k + 1;
            }
        };

		return metadataEntitySpecification_Role;
	}]
)
.service('metadataEntitySpecification_Task', [
	'Entity',
    '$injector',

	function(Entity, $injector){
        var appMetadataSet = $injector.get('appMetadataSet');
	    var Task = appUtils.Class(Entity);

	    var metadataEntitySpecification_Task = {
	        entityClass: Task,
	        fnGetEntityInstance: function () {
	            return new Task()
	        },
	        metadataName: "task",
	        metadataRepresentation: "Task",
	        metadataDescription: "Task list",
	        entityField: {
	            objectField: {},
	            entityField: {

	                plainTime:{
	                    value: 0,
	                    fieldDescription: {
	                        inputType: "number",
	                        label: "plain time",
	                        availability: true,
	                        entityListService: null
	                    }
	                },

	                date: {
	                    value: "",
	                    fieldDescription: {
	                        inputType: "date",
	                        label: "date",
	                        availability: true,
	                        entityListService: null
	                    }
	                },
	                title: {
	                    value: "",
	                    fieldDescription: {
	                        inputType: "text",
	                        label: "title",
	                        availability: true,
	                        entityListService: null
	                    }
	                },
	                author: {
	                    value: {},
	                    fieldDescription: {
	                        inputType: "select",
	                        label: "author",
	                        availability: true,
	                        getInstance: function(){
	                            return appMetadataSet.getEntityInstance("user");
	                        },
	                        entityListService: function () {
	                            return appMetadataSet.getEntityList("user");
	                        }
	                    }
	                },
	                executor: {
	                    value: [],
	                    fieldDescription: {
	                        inputType: "multiselect",
	                        label: "executor",
	                        availability: true,
	                        entityListService: function () {
	                            return appMetadataSet.getEntityList("user");
	                        }
	                    }
	                },
	                project: {
	                    value: {},
	                    fieldDescription: {
	                        inputType: "select",
	                        label: "project",
	                        availability: true,
	                        getInstance: function(){
	                            return appMetadataSet.getEntityInstance("project");
	                        },
	                        entityListService: function () {
	                            return appMetadataSet.getEntityList("project")
	                        }
	                    }
	                },
	                state: {
	                    value: "TODO",
	                    fieldDescription: {
	                        inputType: "enum",
	                        label: "state",
	                        availability: true,
	                        entityListService: function(){
	                            return appMetadataSet.getEntityList("taskState")
	                        }
	                    }
	                }

	            },
	            defineField: {

	                representation: {
	                    enumerable: true,
	                    get: function () {
	                        return "" + this.date + " /" + this.title + "/ (" + this.description + ") ";
	                    }
	                }

	            }
	        },

	        entityFieldsPlacing: [
	            [
	                    {editFieldId: "id", fieldLength: 3},
	                    {
	                        editFieldId: [
	                            [
	                                {editFieldId: "date", fieldLength: 6},
	                                {editFieldId: "state", fieldLength: 6}
	                            ],
	                            [{editFieldId: "title", fieldLength: 12}],
	                            [
	                                {editFieldId: "project", fieldLength: 7},
	                                {editFieldId: "executor", fieldLength: 5}
	                            ]
	                        ],
	                        fieldLength: 9
	                    }
	            ],
	            [
	                {editFieldId: "plainTime", fieldLength: 3}
	            ],
	            [
	                {editFieldId: "description", fieldLength: 12}
	            ],
	            [
	                {editFieldId: "author", fieldLength: 3}
	            ]
	        ]

	    };

	    metadataEntitySpecification_Task.entityField.entityField.executor.value.representationList = function() {
	        var str = "";
	        var k=0;
	        while (true) {
	            if(k == this.length){
	                break;
	            }
	            str = str+"; "+this[k].representation;
	            k = k+1;

	        }
	        return str;
	    };
	    metadataEntitySpecification_Task.entityField.entityField.executor.value.fillByTemplate = function(template) {
	        this.length=0;
	        var k=0;
	        while (true) {
	            if(k == template.length){
	                break;
	            }
	            var entity = appMetadataSet.getEntityInstance("user");
	            appUtils.fillValuesProperty(template[k], entity);
	            this.push(entity);
	            k = k+1;
	        }
	    };

		return metadataEntitySpecification_Task;	
	}]
)
.service('metadataEnumSpecification_TaskState', [
    'Enum', 
    function(){
        var EnumTaskState = new Enum;
        return {
            enumClass: EnumTaskState,
            metadataName: "taskState"
        };    
    }]
)
;		