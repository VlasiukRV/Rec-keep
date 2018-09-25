;
(function (appInitialization) {

    appInitialization.initCashFlowItem = function(){

    var appMetadataSet = appInitialization.metadataSet;

    var CashFlowItem = appUtils.Class(appInitialization.abstractAppModel.Entity);
    var metadataEntitySpecification_CashFlowItem = {
        entityClass: CashFlowItem,
        fnGetEntityInstance: function () {
            return new CashFlowItem()
        },
        metadataName: "cashFlowItem",
        metadataRepresentation: "Cash flow item",
        metadataDescription: "Cash flow item",
        entityField: {
            objectField: {},
            entityField: {

                title: {
                    value: "",
                    fieldDescription: {
                        inputType: "text",
                        label: "title",
                        availability: true,
                        entityListService: null
                    }
                },

                type: {
                    value: "TODO",
                    fieldDescription: {
                        inputType: "enum",
                        label: "type",
                        availability: true,
                        entityListService: function(){
                            return appMetadataSet.getEntityList("cashFlowItemType")
                        }
                    }
                }

            },
            defineField: {

                representation: {
                    enumerable: true,
                    get: function () {
                        return "" + this.title + "/ (" + this.state + ") ";
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
                            {editFieldId: "type", fieldLength: 4}
                        ],
                        [{editFieldId: "title", fieldLength: 12}]
                    ],
                    fieldLength: 9
                }
            ],
            [
                {editFieldId: "description", fieldLength: 12}
            ]
        ]

    };

    appInitialization.metadataSpecifications.entities.push(metadataEntitySpecification_CashFlowItem);

    return appInitialization;
};

})(appService.appInitialization);