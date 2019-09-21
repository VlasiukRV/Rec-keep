;
(function (exp) {
    if (!exp.moduleConfig) {
        exp.moduleConfig = new Object(null);
    }
    var moduleConfig = exp.moduleConfig;

    moduleConfig.metadataEntitySpecification_Task = function (MetadataEntitySpecification, Entity, metadataSet) {
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
                                return metadataSet.getEntityInstance('user');
                            },
                            entityListService: function () {
                                return metadataSet.getEntityList('user');
                            }
                        }
                    },
                    executor: {
                        value: MetadataEntitySpecification.getArrayValue(),
                        fieldDescription: {
                            inputType: 'multiselect',
                            label: 'executor',
                            availability: true,
                            entityListService: function () {
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
                                return metadataSet.getEntityInstance('project');
                            },
                            entityListService: function () {
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

        var metadataEntitySpecification = new MetadataEntitySpecification();
        metadataEntitySpecification.init(metadataEntitySpecification_Task);

        return metadataEntitySpecification;
    }


})(window);