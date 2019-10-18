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
                metadataSet: {},
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
		MetadataEntitySpecification.prototype.getArrayValue = function (metadataSet, metadataEntityName) {

			var arrayValue = [];

			arrayValue.representationList = function () {
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
			arrayValue.fillByTemplate = function (template) {
				this.length = 0;
				var k = 0;
				while (true) {
					if (k === template.length) {
						break;
					}
					var entity = metadataSet.getEntityInstance(metadataEntityName);
					appUtils.fillValuesProperty(template[k], entity);
					this.push(entity);
					k = k + 1;
				}
			};

			return arrayValue
		};

		MetadataEntitySpecification.includeMthd({
			getObjectFields: function () {
				var objectFields = this.entityField.objectField;
				objectFields.metadataName = this.metadataName;
				return objectFields;
			},
			getEntityFields: function () {
				var self = this;

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
                        }
                    } else if (typeof source[key].value === 'object') {
                        if (source[key].fieldDescription && source[key].fieldDescription.metadataEntityName) {
                            entityFields[key] = self.metadataSet.getEntityInstance(source[key].fieldDescription.metadataEntityName);
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
                		metadataEditField.buildEditField(source[key], key, this.metadataSet);
                		entityFieldsDescription.push(metadataEditField);
                	}
                	return entityFieldsDescription;
                },

			getFmListForm: function () {
                	return this.fmListForm;
                },

			getEntityFieldsPlacing: function () {
                	return this.entityFieldsPlacing;
			},

			getEntityInstance: function () {
				return null;
			},

			init: function (entitySpecification) {
				var self= this;
				var EntityClass = entitySpecification.entityClass;

				self.metadataSet = entitySpecification.metadataSet;

				self.metadataName = entitySpecification.metadataName;
				self.metadataRepresentation = entitySpecification.metadataRepresentation;
				self.metadataDescription = entitySpecification.metadataDescription;
				self.fnGetEntityInstance = entitySpecification.fnGetEntityInstance;

				appUtils.fillAllValuesProperty(entitySpecification.entityField.entityField, self.entityField.entityField);
				appUtils.fillAllValuesProperty(entitySpecification.entityField.objectField, self.entityField.objectField);
				self.entityField.defineField = entitySpecification.entityField.defineField;

				self.addCommonFields();

				self.entityFieldsPlacing = entitySpecification.entityFieldsPlacing;
				if(entitySpecification.fmListForm) {
					if(entitySpecification.fmListForm.listType) {
						self.fmListForm.listType = entitySpecification.fmListForm.listType;
					}
				}

				(function () {
					// field
					EntityClass.prototype.$_buildObject = function () {
						this.includeEntityFd(
							self.getObjectFields(),
							self.getEntityFields(),
							self.entityField.defineField
						);
					};
				})();

			},

			addCommonFields: function () {
				this.entityField.entityField.id = {
					value: '',
					fieldDescription: {
						inputType: 'text',
						label: 'id',
						availability: true,
						entityListService: null
					}
				};
				this.entityField.entityField.description = {
					value: '',
					fieldDescription: {
						inputType: 'textarea',
						label: 'description',
						availability: true,
						entityListService: null
					}
				};
			}

		});

		return MetadataEntitySpecification;
	};

})(window);