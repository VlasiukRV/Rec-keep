;
(function (exp) {
	if (!exp.moduleConfigSystem) {
		exp.moduleConfigSystem = new Object(null);
	}
	var moduleConfigSystem = exp.moduleConfigSystem;


	moduleConfigSystem.MetadataEntitySpecification = function (fmListForm_TYPES, MetadataEditField) {

		var MetadataEntitySpecification = appUtils.Class();

		MetadataEntitySpecification.prototype.$_buildObject = function () {
			this.includeFd({
				metadataName: '',
				metadataRepresentation: '',
				metadataDescription: '',
				entityField: {
					objectField: {},
					entityField: {},
					defineField: {}
				},

				fmListForm: {
					listType: fmListForm_TYPES.table
				},
				entityFieldsPlacing: []
			});
		};

		MetadataEntitySpecification.includeMthd({
			getObjectFields: function () {
				var objectFields = this.entityField.objectField;
				objectFields.metadataName = this.metadataName;
				return objectFields;
			},
			getEntityFields: function () {
				var source = this.entityField.entityField;
				var entityFields = {};
				for (var key in source) {
					if (angular.isArray(source[key].value)) {
						entityFields[key] = [];
                            // ToDo
                            if (source[key].value.fillByTemplate) {
                            	entityFields[key].fillByTemplate = source[key].value.fillByTemplate;
                            }
                            if (source[key].value.representationList) {
                            	entityFields[key].representationList = source[key].value.representationList;
                            	/*entityFields[key].representationList = source[key].representationList;*/
                            }
                        } else if (typeof source[key].value === 'object') {
                        	if (source[key].fieldDescription && source[key].fieldDescription.getInstance) {
                        		entityFields[key] = source[key].fieldDescription.getInstance();
                        	} else {
                        		entityFields[key] = {};
                        	}
                        }
                        else {
                        	entityFields[key] = source[key].value;
                        }
                    }
                    return entityFields;
                },

			getEntityFieldsDescription: function () {
                	var source = this.entityField.entityField;
                	var entityFieldsDescription = [];
                	for (var key in source) {
                		var metadataEditField = new MetadataEditField();
                		metadataEditField.buildEditField(source[key].fieldDescription, key);
                		entityFieldsDescription.push(metadataEditField);
                	}
                	return entityFieldsDescription;
                },

			getFmListForm: function () {
                	return this.fmListForm;
                },

			getEntityFieldsPlacing: function () {
                	return this.entityFieldsPlacing;
			}
		});

		return MetadataEntitySpecification;
	};

})(window);