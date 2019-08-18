;
(function (exp) {
	if (!exp.moduleConfigSystem) {
		exp.moduleConfigSystem = new Object(null);
	}
	var moduleConfigSystem = exp.moduleConfigSystem;

	moduleConfigSystem.MetadataObject = function () {
		var MetadataObject = appUtils.Class();

		MetadataObject.prototype.$_buildObject = function () {
			this.includeFd({
				metadataName: '',

				representation: '',
				description: '',
				image: null,

				metadataEditFieldsSet: [],
				fmEditForm: {
					metadataEditFieldsSet: [],
					metadataEditFieldsPlacing: []
				},
				fmListForm: {
					metadataEditFieldsSet: [],
					metadataFilterFieldsSet: [],
				}
			});
		};

		MetadataObject.includeMthd({
			getEntityInstance: function () {
				return null;
			},
			installMetadata: function (metadataName, fnGetEntityInstance, representation, description, image) {
				this.metadataName = metadataName;
				this.getEntityInstance = fnGetEntityInstance;

				if (representation) {
					this.representation = representation;
				}
				if (description) {
					this.description = description;
				}
				if (image) {
					this.image = image;
				}

			},
			bookEntityForms: function (metadataEntitySpecification) {
				var _metadataEditFieldsSet = metadataEntitySpecification.getEntityFieldsDescription();
				var _metadataFilterFieldsSet = undefined;
				var _editFieldsPlacing = metadataEntitySpecification.getEntityFieldsPlacing();
				var _fmListForm = metadataEntitySpecification.getFmListForm();

				var i;

				if(_fmListForm) {
					if(_fmListForm.listType) {
						this.fmListForm.listType = _fmListForm.listType;
					}
				}

				if (_editFieldsPlacing) {
					this.fmEditForm.metadataEditFieldsPlacing = _editFieldsPlacing;
				}
				if (_metadataEditFieldsSet) {
					var editField;

					for (i = 0; i < _metadataEditFieldsSet.length; i++) {
						editField = _metadataEditFieldsSet[i];

						if (editField.availability) {
							this.metadataEditFieldsSet.push(editField);
						}
					}

					for (i = 0; i < this.metadataEditFieldsSet.length; i++) {
						editField = this.metadataEditFieldsSet[i];

						if (editField.availabilityInEditForm) {
							this.fmEditForm.metadataEditFieldsSet[editField.name] = editField;
						}
						if (editField.availabilityInListForm) {
							this.fmListForm.metadataEditFieldsSet.push(editField);
						}
					}
				}
				if (_metadataFilterFieldsSet) {
					for (i = 0; i < _metadataEditFieldsSet.length; i++) {
						editField = _metadataEditFieldsSet[i];
						/*if (appUtils.find(this.fmListForm.metadataEditFieldsSet, editField) > 0) {*/
							this.fmListForm.metadataFilterFieldsSet.push(editField);
							/*}*/
						}
					}
				}
			}
		);

		return MetadataObject;
	};

})(window);