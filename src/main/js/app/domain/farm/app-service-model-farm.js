;
(function (appInitialization) {

    appInitialization.initFarmModel = function () {

        var appMetadataSet = appInitialization.metadataSet;

        var Farm = appUtils.Class(appInitialization.abstractAppModel.Entity);
        var metadataEntitySpecification_Farm = {
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
                listType: appMetadataSet.system.enums.fmListForm_TYPES.tile
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

        appInitialization.metadataSpecifications.entities.push(metadataEntitySpecification_Farm);

        return appInitialization;
    };

})(appService.appInitialization);