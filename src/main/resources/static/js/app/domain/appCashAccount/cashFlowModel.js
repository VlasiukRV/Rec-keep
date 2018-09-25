;
(function (appInitialization) {

    appInitialization.initCashFlow = function () {

        var appMetadataSet = appInitialization.metadataSet;

        var CashFlow = appUtils.Class(appInitialization.abstractAppModel.Entity);
        var metadataEntitySpecification_CashFlow = {
            entityClass: CashFlow,
            fnGetEntityInstance: function () {
                return new CashFlow()
            },
            metadataName: "cashFlow",
            metadataRepresentation: "Cash flow",
            metadataDescription: "Cash flow",
            entityField: {
                objectField: {},
                entityField: {

                    sum: {
                        value: 0,
                        fieldDescription: {
                            inputType: "number",
                            label: "sum",
                            availability: true,
                            entityListService: null
                        }
                    },

                    date: {
                        value: "",
                        fieldDescription: {
                            inputType: "date",
                            label: "date",
                            availability: true,
                            entityListService: null
                        }
                    },

                    cashFlowItem: {
                        value: {},
                        fieldDescription: {
                            inputType: "select",
                            label: "cash flow item",
                            availability: true,
                            getInstance: function () {
                                return appMetadataSet.getEntityInstance("cashFlowItem");
                            },
                            entityListService: function () {
                                return appMetadataSet.getEntityList("cashFlowItem")
                            }
                        }
                    },

                    author: {
                        value: {},
                        fieldDescription: {
                            inputType: "select",
                            label: "author",
                            availability: true,
                            getInstance: function () {
                                return appMetadataSet.getEntityInstance("user");
                            },
                            entityListService: function () {
                                return appMetadataSet.getEntityList("user");
                            }
                        }
                    }

                },
                defineField: {

                    representation: {
                        enumerable: true,
                        get: function () {
                            return "" + this.date + " /" + this.cashFlowItem.representation() + "/ (" + this.description + ") ";
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
                                {editFieldId: "date", fieldLength: 4},
                                {editFieldId: "cashFlowItem", fieldLength: 4}
                            ],
                            [{editFieldId: "sum", fieldLength: 12}],
                        ],
                        fieldLength: 9
                    }
                ],
                [
                    {editFieldId: "description", fieldLength: 12}
                ],
                [
                    {editFieldId: "author", fieldLength: 3}
                ]
            ]

        };

        appInitialization.metadataSpecifications.entities.push(metadataEntitySpecification_CashFlow);

        return appInitialization;
    };

})(appService.appInitialization);