;
(function (exp) {
    if (!exp.moduleConfig) {
        exp.moduleConfig = new Object(null);
    }
    var moduleConfig = exp.moduleConfig;

    moduleConfig.metadataEntitySpecification_Farm = function (Entity, fmListForm_TYPES) {

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
    }

})(window);