;
(function (exp) {
    if (!exp.moduleConfig) {
        exp.moduleConfig = new Object(null);
    }
    var moduleConfig = exp.moduleConfig;

    moduleConfig.metadataEntitySpecification_PoultryCalendar = function (MetadataEntitySpecification, Entity, fmListForm_TYPES) {

        var PoultryCalendar = appUtils.Class(Entity);

        var metadataEntitySpecification = new MetadataEntitySpecification();
        metadataEntitySpecification.init( {
            entityClass: PoultryCalendar,
            fnGetEntityInstance: function () {
                return new PoultryCalendar();
            },
            metadataName: 'poultryCalendar',
            metadataRepresentation: 'poultryCalendar',
            metadataDescription: 'Poultry calendar',
            entityField: {
                objectField: {},
                entityField: {

                    // entity field
                    date: {
                        value: '',
                        fieldDescription: {
                            inputType: 'date',
                            label: 'Date',
                            availability: true,
                            entityListService: null
                        }
                    },
                    mortality: {
                        value: 0,
                        fieldDescription: {
                            inputType: 'number',
                            label: 'Mortality',
                            availability: true,
                            entityListService: null
                        }
                    },
                    eggProduction: {
                        value: 0,
                        fieldDescription: {
                            inputType: 'number',
                            label: 'Egg Production',
                            availability: true,
                            entityListService: null
                        }
                    },
                    eggCoolerDirtyFlats: {
                        value: 0,
                        fieldDescription: {
                            inputType: 'number',
                            label: 'Dirty Flats',
                            availability: true,
                            entityListService: null
                        }
                    },
                    eggCoolerTemperatureHi: {
                        value: 0,
                        fieldDescription: {
                            inputType: 'number',
                            label: 'Egg Cooler temperature Hi',
                            availability: true,
                            entityListService: null
                        }
                    },
                    eggCoolerTemperatureLo: {
                        value: 0,
                        fieldDescription: {
                            inputType: 'number',
                            label: 'Egg Cooler temperature Lo',
                            availability: true,
                            entityListService: null
                        }
                    },
                    eggCoolerHumidity: {
                        value: 0,
                        fieldDescription: {
                            inputType: 'number',
                            label: 'Egg Cooler humidity',
                            availability: true,
                            entityListService: null
                        }
                    },
                    barnTemperatureHi: {
                        value: 0,
                        fieldDescription: {
                            inputType: 'number',
                            label: 'Barn temperature Hi',
                            availability: true,
                            entityListService: null
                        }
                    },
                    barnTemperatureLo: {
                        value: 0,
                        fieldDescription: {
                            inputType: 'number',
                            label: 'Barn temperature Lo',
                            availability: true,
                            entityListService: null
                        }
                    },
                    waterMeterRead: {
                        value: 0,
                        fieldDescription: {
                            inputType: 'number',
                            label: 'Water Meter Read',
                            availability: true,
                            entityListService: null
                        }
                    },
                    waterCons: {
                        value: 0,
                        fieldDescription: {
                            inputType: 'number',
                            label: 'Water Cons',
                            availability: true,
                            entityListService: null
                        }
                    },
                    feedCons: {
                        value: 0,
                        fieldDescription: {
                            inputType: 'number',
                            label: 'Feed Cons',
                            availability: true,
                            entityListService: null
                        }
                    }

                },
                defineField: {

                    representation: {
                        enumerable: true,
                        get: function () {
                            return '' + this.date;
                        }
                    }

                }
            },

            fmListForm: {
                listType: fmListForm_TYPES.table
            },
            entityFieldsPlacing: [
                [
                    {editFieldId: 'id', fieldLength: 3},
                    {
                        editFieldId: [
                            [{editFieldId: 'date', fieldLength: 12}]
                        ],
                        fieldLength: 5
                    }
                ],
                [
                    {editFieldId: 'mortality', fieldLength: 3},
                    {editFieldId: 'eggProduction', fieldLength: 3},
                ],
                [
                    {editFieldId: 'eggCoolerDirtyFlats', fieldLength: 3},
                    {editFieldId: 'eggCoolerTemperatureHi', fieldLength: 3},
                    {editFieldId: 'eggCoolerTemperatureLo', fieldLength: 3},
                    {editFieldId: 'eggCoolerHumidity', fieldLength: 3},
                ],
                [
                    {editFieldId: 'barnTemperatureHi', fieldLength: 3},
                    {editFieldId: 'barnTemperatureLo', fieldLength: 3},
                ],
                [
                    {editFieldId: 'waterMeterRead', fieldLength: 3},
                    {editFieldId: 'waterCons', fieldLength: 3},
                    {editFieldId: 'feedCons', fieldLength: 3},
                ],
                [
                    {editFieldId: 'description', fieldLength: 12}
                ]
            ]
        });

        return metadataEntitySpecification;
    };

})(window);