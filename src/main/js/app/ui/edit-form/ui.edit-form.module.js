angular.module('module.ui.edit-form', [
	'module.ui.form'
	])

.service('EntityEditForm', ['EditForm',function(EditForm){
	
	var EntityEditForm = appUtils.Class(EditForm);
	(function () {
		EntityEditForm.prototype.$_buildObject = function () {
			this.includeFd({
				currentEntity: {},
				formPropertiesPlacing: {},

				eventCreateEntity: function () {
				}
			});
		};
	})();

	return EntityEditForm;
}])


.service('entityEditService', ['$resource', 'appHttp', function ($resource, appHttp) {
	return appService.forms.entityEditService($resource, appHttp);
}])


.directive('formToolbox', function () {
	return moduleUI.formsDirective.directiveFormToolbox();
})

.directive('button', function () {
	return moduleUI.formsDirective.directiveButton();
})
.directive('smDatepicker', function () {
	return moduleUI.formsDirective.directiveDatePicker();
})
.directive('entityProperty', function () {
	return moduleUI.formsDirective.directiveEntityProperty();
})
.directive('entityEditForm', function () {
	return moduleUI.formsDirective.directiveEntityEditForm();
})
.directive('entityEditFormCol', ['$compile', function ($compile) {
	return moduleUI.formsDirective.directiveEntityEditFormCol($compile);
}])
.directive('entityEditFormRow', function () {
	return moduleUI.formsDirective.directiveEntityEditFormRow();
})

.directive('updatableText', ['$interval', function ($interval) {
	return moduleUI.formsDirective.directiveUpdatableText($interval);
}])
.directive('valueTileCount', function() {
	return moduleUI.formsDirective.directiveValueTileCount();
})
.directive('valueProgresCount', function() {
	return moduleUI.formsDirective.directiveValueProgresCount();
})
.directive('valueKnobCount', function() {
	return moduleUI.formsDirective.directiveValueKnobCount();
})
.directive('valueCountListSparkline', function() {
	return moduleUI.formsDirective.directiveValueCountListSparkline();
})
.directive('tableValueCountEcharts', function() {
	return moduleUI.formsDirective.directiveTableValueCountEcharts();
})
.directive('graficMap', function() {
	return moduleUI.formsDirective.directiveGraficMap();
})
.directive('draggable', ['$document', function($document) {
	return moduleUI.formsDirective.draggable($document);
}])
.directive('textValue', [function () {
	return moduleUI.formsDirective.directiveTextValue();
}])

;