;
(function (exp) {
    if (!exp.moduleConfig) {
        exp.moduleConfig = new Object(null);
    }
    var moduleConfig = exp.moduleConfig;

    moduleConfig.metadataEntitySpecification_ServiceTask = function (Entity, metadataSet, fmListForm_TYPES) {

        var ServiceTask = appUtils.Class(Entity);
        var metadataEntitySpecification_ServiceTask = {
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
                    user: {
                        value: {},
                        fieldDescription: {
                            inputType: 'select',
                            label: 'user',
                            availability: true,
                            getInstance: function () {
                                return metadataSet.getEntityInstance('user');
                            },
                            entityListService: function () {
                                return metadataSet.getEntityList('user');
                            }
                        }
                    },
                    taskRunDate: {
                        value: '',
                        fieldDescription: {
                            inputType: 'date',
                            label: 'Date task is running',
                            availability: true,
                            entityListService: null
                        }
                    },
                    taskExecuteDate: {
                        value: '',
                        fieldDescription: {
                            inputType: 'date',
                            label: 'Date task is executed',
                            availability: true,
                            entityListService: null
                        }
                    },
                    userGotNotificationDate: {
                        value: '',
                        fieldDescription: {
                            inputType: 'date',
                            label: 'Date User got notification',
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
                    {editFieldId: 'user', fieldLength: 3}
                ],
                [
                    {editFieldId: 'taskName', fieldLength: 12}
                ],
                [
                    {
                        editFieldId: [
                            [
                                {editFieldId: 'taskRunDate', fieldLength: 4},
                                {editFieldId: 'taskExecuteDate', fieldLength: 4},
                                {editFieldId: 'userGotNotificationDate', fieldLength: 4}
                            ]
                        ],
                        fieldLength: 12
                    }
                ],
                [
                    {
                        editFieldId: [
                            [
                                {editFieldId: 'taskVariable', fieldLength: 6},
                                {editFieldId: 'taskResult', fieldLength: 6}
                            ]
                        ],
                        fieldLength: 12
                    }
                ],
                [
                    {editFieldId: 'description', fieldLength: 12}
                ]
            ]

        };

        metadataEntitySpecification_ServiceTask.entityField.entityField.user.value.representationList = function () {
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

        return metadataEntitySpecification_ServiceTask;
    }

})(window);