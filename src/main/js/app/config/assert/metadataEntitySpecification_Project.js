;
(function (exp) {
    if (!exp.moduleConfig) {
        exp.moduleConfig = new Object(null);
    }
    var moduleConfig = exp.moduleConfig;

    moduleConfig.metadataEntitySpecification_Project = function (Entity) {
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
    }

})(window);