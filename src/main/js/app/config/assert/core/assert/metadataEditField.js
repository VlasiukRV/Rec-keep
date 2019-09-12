;
(function (exp) {
	if (!exp.moduleConfigSystem) {
		exp.moduleConfigSystem = new Object(null);
	}
	var moduleConfigSystem = exp.moduleConfigSystem;

	moduleConfigSystem.MetadataEditField = function(){
 
        var MetadataEditField = appUtils.Class();
        (function () {
            MetadataEditField.prototype.$_buildObject = function () {
                this.includeFd({
                    name: '',
                    inputType: 'text',
                    label: '<--label for property-->',

                    entityListService: {},

                    availability: true,

                    visibility: true,
                    availabilityInEditForm: true,
                    visibilityInEditForm: true,
                    availabilityInListForm: true,
                    visibilityInListForm: true
                });
            };
            MetadataEditField.includeMthd({
                buildEditField: function (fieldDescription, name) {
                    if (name) {
                        this.name = name;
                    } else {
                        if (fieldDescription.name) {
                            this.name = fieldDescription.name;
                        }
                    }
                    if (fieldDescription.inputType) {
                        this.inputType = fieldDescription.inputType;
                    }
                    if (fieldDescription.label) {
                        this.label = appUtils.string.toTitleCase(fieldDescription.label);
                    } else {
                        this.label = appUtils.string.toTitleCase(this.name);
                    }
                    if (fieldDescription.availability) {
                        this.availability = fieldDescription.availability;
                    }
                    if (fieldDescription.entityListService) {
                        this.entityListService = fieldDescription.entityListService;
                    }
                }
            });
        })();

        return MetadataEditField;
	}
	
})(window);