;
(function (exp) {
    if (!exp.moduleConfig) {
        exp.moduleConfig = new Object(null);
    }
    var moduleConfig = exp.moduleConfig;

    moduleConfig.metadataEntitySpecification_Role = function (Entity, metadataSet) {

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
    }


})(window);