angular.module('module.domain-model',
    [
        'module.metadata-model',
        'module.ui.list-form'
    ]
)
    .service('metadataEntitySpecification_PoultryCalendar', [
        'Entity',
        'fmListForm_TYPES',

        function (Entity, fmListForm_TYPES) {

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
        }]
    )
    .service('metadataEntitySpecification_Farm', [
        'Entity',
        'fmListForm_TYPES',

        function (Entity, fmListForm_TYPES) {

            var Farm = appUtils.Class(Entity);

            return {
                entityClass: Farm,
                fnGetEntityInstance: function () {
                    return new Farm();
                },
                metadataName: 'farm',
                metadataRepresentation: 'farm',
                metadataDescription: 'Farm list',
                entityField: {
                    objectField: {},
                    entityField: {

                        // entity field
                        name: {
                            value: '',
                            fieldDescription: {
                                inputType: 'text',
                                label: 'name',
                                availability: true,
                                entityListService: null
                            }
                        }

                    },
                    defineField: {

                        representation: {
                            enumerable: true,
                            get: function () {
                                return '' + this.name;
                            }
                        }

                    }
                },

                fmListForm: {
                    listType: fmListForm_TYPES.tile
                },
                entityFieldsPlacing: [
                    [
                        {editFieldId: 'id', fieldLength: 3},
                        {
                            editFieldId: [
                                [{editFieldId: 'name', fieldLength: 12}]
                            ],
                            fieldLength: 5
                        }
                    ],
                    [
                        {editFieldId: 'description', fieldLength: 12}
                    ]
                ]
            };
        }]
    )
    .service('metadataEntitySpecification_Project', [
        'Entity',

        function (Entity) {
            var Project = appUtils.Class(Entity);

            return {
                entityClass: Project,
                fnGetEntityInstance: function () {
                    return new Project();
                },
                metadataName: 'project',
                metadataRepresentation: 'Project',
                metadataDescription: 'Project list',
                entityField: {
                    objectField: {},
                    entityField: {

                        // entity field
                        name: {
                            value: '',
                            fieldDescription: {
                                inputType: 'text',
                                label: 'name',
                                availability: true,
                                entityListService: null
                            }
                        }

                    },
                    defineField: {

                        representation: {
                            enumerable: true,
                            get: function () {
                                return '' + this.name;
                            }
                        }

                    }
                },

                entityFieldsPlacing: [
                    [
                        {editFieldId: 'id', fieldLength: 3},
                        {
                            editFieldId: [
                                [{editFieldId: 'name', fieldLength: 12}]
                            ],
                            fieldLength: 5
                        }
                    ],
                    [
                        {editFieldId: 'description', fieldLength: 12}
                    ]
                ]
            };
        }]
    )
    .service('metadataEntitySpecification_User', [
        'Entity',
        'fmListForm_TYPES',

        function (Entity, fmListForm_TYPES) {

            var User = appUtils.Class(Entity);
            return {
                entityClass: User,
                fnGetEntityInstance: function () {
                    return new User();
                },
                metadataName: 'user',
                metadataRepresentation: 'User',
                metadataDescription: 'User list',
                entityField: {
                    objectField: {
                        icon: 'fa user',
                    },
                    entityField: {

                        username: {
                            value: '',
                            fieldDescription: {
                                inputType: 'text',
                                label: 'username',
                                availability: true,
                                entityListService: null
                            }
                        },
                        password: {
                            value: '',
                            fieldDescription: {
                                inputType: 'text',
                                label: 'password',
                                availability: true,
                                entityListService: null
                            }
                        },
                        mailAddress: {
                            value: '',
                            fieldDescription: {
                                inputType: 'text',
                                label: 'mailAddress',
                                availability: true,
                                entityListService: null
                            }
                        },
                        enabled: {
                            value: false,
                            fieldDescription: {
                                inputType: 'checkbox',
                                label: 'enabled',
                                availability: false,
                                entityListService: null
                            }
                        }

                    },
                    defineField: {

                        representation: {
                            enumerable: true,
                            get: function () {
                                return '' + this.username + ' (' + this.description + ') ';
                            }
                        }

                    }
                },

                fmListForm: {
                    listType: fmListForm_TYPES.panel
                },

                entityFieldsPlacing: [
                    [
                        {editFieldId: 'id', fieldLength: 3}
                    ],
                    [
                        {
                            editFieldId: [
                                [{editFieldId: 'username', fieldLength: 12}],
                                [{editFieldId: 'password', fieldLength: 12}],
                                [{editFieldId: 'mailAddress', fieldLength: 12}]
                            ],
                            fieldLength: 5
                        }
                    ],
                    [
                        {editFieldId: 'description', fieldLength: 12}
                    ]
                ]

            };
        }]
    )
    .service('metadataEntitySpecification_Role', [
        'Entity',
        '$injector',

        function (Entity, $injector) {

            var Role = appUtils.Class(Entity);

            var metadataEntitySpecification_Role = {
                entityClass: Role,
                fnGetEntityInstance: function () {
                    return new Role();
                },
                metadataName: 'role',
                metadataRepresentation: 'Role',
                metadataDescription: 'Role list',
                entityField: {
                    objectField: {
                        icon: 'fa-group',
                    },
                    entityField: {

                        // entity field
                        role: {
                            value: '',
                            fieldDescription: {
                                inputType: 'text',
                                label: 'role',
                                availability: true,
                                entityListService: null
                            }
                        },
                        users: {
                            value: [],
                            fieldDescription: {
                                inputType: 'multiselect',
                                label: 'users',
                                availability: true,
                                entityListService: function () {
                                    var metadataSet = $injector.get('metadataSet');
                                    return metadataSet.getEntityList('user');
                                }
                            }
                        }


                    },
                    defineField: {
                        representation: {
                            enumerable: true,
                            get: function () {
                                return '' + this.role;
                            }
                        }

                    }
                },
                entityFieldsPlacing: [
                    [
                        {editFieldId: 'id', fieldLength: 3},
                        {
                            editFieldId: [
                                [{editFieldId: 'role', fieldLength: 12}]
                            ],
                            fieldLength: 5
                        }
                    ],
                    [
                        {editFieldId: 'users', fieldLength: 5},
                        {editFieldId: 'description', fieldLength: 12}
                    ]
                ]
            };
            metadataEntitySpecification_Role.entityField.entityField.users.value.representationList = function () {
                var str = '';
                var k = 0;
                while (true) {
                    if (k === this.length) {
                        break;
                    }
                    str = str + '; ' + this[k].representation;
                    k = k + 1;

                }
                return str;
            };
            metadataEntitySpecification_Role.entityField.entityField.users.value.fillByTemplate = function (template) {
                var metadataSet = $injector.get('metadataSet');
                this.length = 0;
                var k = 0;
                while (true) {
                    if (k === template.length) {
                        break;
                    }
                    var entity = metadataSet.getEntityInstance('user');
                    appUtils.fillValuesProperty(template[k], entity);
                    this.push(entity);
                    k = k + 1;
                }
            };

            return metadataEntitySpecification_Role;
        }]
    )
    .service('metadataEntitySpecification_ServiceTask', [
        'Entity',
        'fmListForm_TYPES',

        function (Entity, fmListForm_TYPES) {

            var ServiceTask = appUtils.Class(Entity);
            return {
                entityClass: ServiceTask,
                fnGetEntityInstance: function () {
                    return new ServiceTask();
                },
                metadataName: 'serviceTask',
                metadataRepresentation: 'serviceTask',
                metadataDescription: 'ServiceTask list',
                entityField: {
                    objectField: {
                        icon: '',
                    },
                    entityField: {

                        taskName: {
                            value: '',
                            fieldDescription: {
                                inputType: 'text',
                                label: 'Task name',
                                availability: true,
                                entityListService: null
                            }
                        },
                        execute: {
                            value: '',
                            fieldDescription: {
                                inputType: 'checkbox',
                                label: 'Execute',
                                availability: true,
                                entityListService: null
                            }
                        },
                        taskIsRunning: {
                            value: '',
                            fieldDescription: {
                                inputType: 'checkbox',
                                label: 'Task is running',
                                availability: true,
                                entityListService: null
                            }
                        },
                        taskVariable: {
                            value: '',
                            fieldDescription: {
                                inputType: 'jsonEditor',
                                label: 'task variable',
                                availability: false,
                                entityListService: null
                            }
                        },
                        taskResult: {
                            value: '',
                            fieldDescription: {
                                inputType: 'jsonEditor',
                                label: 'task result',
                                availability: false,
                                entityListService: null
                            }
                        }

                    },
                    defineField: {

                        representation: {
                            enumerable: true,
                            get: function () {
                                return '' + this.taskName + ' (' + this.description + ') ';
                            }
                        }

                    }
                },

                fmListForm: {
                    listType: fmListForm_TYPES.table
                },

                entityFieldsPlacing: [
                    [
                        {editFieldId: 'id', fieldLength: 3}
                    ],
                    [
                        {
                            editFieldId: [
                                [{editFieldId: 'taskName', fieldLength: 12}],
                                [{execute: 'password', fieldLength: 12}],
                                [{taskIsRunning: 'mailAddress', fieldLength: 12}]
                            ],
                            fieldLength: 5
                        }
                    ],
                    [
                        {editFieldId: 'taskVariable', fieldLength: 12}
                    ],
                    [
                        {editFieldId: 'taskResult', fieldLength: 12}
                    ],
                    [
                        {editFieldId: 'description', fieldLength: 12}
                    ]
                ]

            };
        }]
    )
    .service('metadataEntitySpecification_Task', [
        'Entity',
        '$injector',

        function (Entity, $injector) {
            var Task = appUtils.Class(Entity);

            var metadataEntitySpecification_Task = {
                entityClass: Task,
                fnGetEntityInstance: function () {
                    return new Task();
                },
                metadataName: 'task',
                metadataRepresentation: 'Task',
                metadataDescription: 'Task list',
                entityField: {
                    objectField: {},
                    entityField: {

                        plainTime: {
                            value: 0,
                            fieldDescription: {
                                inputType: 'number',
                                label: 'plain time',
                                availability: true,
                                entityListService: null
                            }
                        },

                        date: {
                            value: '',
                            fieldDescription: {
                                inputType: 'date',
                                label: 'date',
                                availability: true,
                                entityListService: null
                            }
                        },
                        title: {
                            value: '',
                            fieldDescription: {
                                inputType: 'text',
                                label: 'title',
                                availability: true,
                                entityListService: null
                            }
                        },
                        author: {
                            value: {},
                            fieldDescription: {
                                inputType: 'select',
                                label: 'author',
                                availability: true,
                                getInstance: function () {
                                    var metadataSet = $injector.get('metadataSet');
                                    return metadataSet.getEntityInstance('user');
                                },
                                entityListService: function () {
                                    var metadataSet = $injector.get('metadataSet');
                                    return metadataSet.getEntityList('user');
                                }
                            }
                        },
                        executor: {
                            value: [],
                            fieldDescription: {
                                inputType: 'multiselect',
                                label: 'executor',
                                availability: true,
                                entityListService: function () {
                                    var metadataSet = $injector.get('metadataSet');
                                    return metadataSet.getEntityList('user');
                                }
                            }
                        },
                        project: {
                            value: {},
                            fieldDescription: {
                                inputType: 'select',
                                label: 'project',
                                availability: true,
                                getInstance: function () {
                                    var metadataSet = $injector.get('metadataSet');
                                    return metadataSet.getEntityInstance('project');
                                },
                                entityListService: function () {
                                    var metadataSet = $injector.get('metadataSet');
                                    return metadataSet.getEntityList('project');
                                }
                            }
                        },
                        state: {
                            value: 'TODO',
                            fieldDescription: {
                                inputType: 'enum',
                                label: 'state',
                                availability: true,
                                entityListService: function () {
                                    var metadataSet = $injector.get('metadataSet');
                                    return metadataSet.getEntityList('taskState');
                                }
                            }
                        }

                    },
                    defineField: {

                        representation: {
                            enumerable: true,
                            get: function () {
                                return '' + this.date + ' /' + this.title + '/ (' + this.description + ') ';
                            }
                        }

                    }
                },

                entityFieldsPlacing: [
                    [
                        {editFieldId: 'id', fieldLength: 3},
                        {
                            editFieldId: [
                                [
                                    {editFieldId: 'date', fieldLength: 6},
                                    {editFieldId: 'state', fieldLength: 6}
                                ],
                                [{editFieldId: 'title', fieldLength: 12}],
                                [
                                    {editFieldId: 'project', fieldLength: 7},
                                    {editFieldId: 'executor', fieldLength: 5}
                                ]
                            ],
                            fieldLength: 9
                        }
                    ],
                    [
                        {editFieldId: 'plainTime', fieldLength: 3}
                    ],
                    [
                        {editFieldId: 'description', fieldLength: 12}
                    ],
                    [
                        {editFieldId: 'author', fieldLength: 3}
                    ]
                ]

            };

            metadataEntitySpecification_Task.entityField.entityField.executor.value.representationList = function () {
                var str = '';
                var k = 0;
                while (true) {
                    if (k === this.length) {
                        break;
                    }
                    str = str + '; ' + this[k].representation;
                    k = k + 1;

                }
                return str;
            };
            metadataEntitySpecification_Task.entityField.entityField.executor.value.fillByTemplate = function (template) {
                this.length = 0;
                var k = 0;
                var metadataSet = $injector.get('metadataSet');
                while (true) {
                    if (k === template.length) {
                        break;
                    }
                    var entity = metadataSet.getEntityInstance('user');
                    appUtils.fillValuesProperty(template[k], entity);
                    this.push(entity);
                    k = k + 1;
                }
            };

            return metadataEntitySpecification_Task;
        }]
    )
    .service('metadataEnumSpecification_TaskState', [
        'Enum',
        function (Enum) {
            var EnumTaskState = new Enum();
            return {
                enumClass: EnumTaskState,
                metadataName: 'taskState'
            };
        }]
    )
;		