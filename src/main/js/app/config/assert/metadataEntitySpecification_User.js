;
(function (exp) {
    if (!exp.moduleConfig) {
        exp.moduleConfig = new Object(null);
    }
    var moduleConfig = exp.moduleConfig;

    moduleConfig.metadataEntitySpecification_User = function (MetadataEntitySpecification, Entity, metadataSet, fmListForm_TYPES) {

        var User = appUtils.Class(Entity);

        var metadataEntitySpecification = new MetadataEntitySpecification();
        metadataEntitySpecification.init({
            entityClass: User,
            fnGetEntityInstance: function () {
                return new User();
            },
            metadataSet: metadataSet,
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

        });

        return metadataEntitySpecification
    }

})(window);