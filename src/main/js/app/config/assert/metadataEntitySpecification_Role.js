;
(function (exp) {
    if (!exp.moduleConfig) {
        exp.moduleConfig = new Object(null);
    }
    var moduleConfig = exp.moduleConfig;

    moduleConfig.metadataEntitySpecification_Role = function (MetadataEntitySpecification, Entity, metadataSet) {

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

        var metadataEntitySpecification = new MetadataEntitySpecification();
        metadataEntitySpecification.init(metadataEntitySpecification_Role);

        return metadataEntitySpecification;
    }


})(window);