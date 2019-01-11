angular.module('module.ui.list-form', [
	'module.ui.form'
	])

.constant('fmListForm_TYPES', {
	table: {
		name: 'table',
		quantityProperties: 5,
		limitCellLength: 20,
	},
	tile: {
		name: 'tile'
	},
	panel: {
		name: 'panel',
		quantityProperties: 5,
		limitCellLength: 20,
	}
})

.service('EntityListForm', ['EditForm', 'fmListForm_TYPES',function(EditForm, fmListForm_TYPES){
	
	var EntityListForm = appUtils.Class(EditForm);
	(function () {
		EntityListForm.prototype.$_buildObject = function () {
			this.includeFd({
				entities: [],

				toolboxMenu: {
					swichPanel: {
						command:function (selfScope) {
							selfScope.entityListForm.setListType(fmListForm_TYPES.panel);
						},
						text:'swich Panel',
						ico: 'glyphicon glyphicon-list-alt'
					},
					swichTable: {
						command:function (selfScope) {
							selfScope.entityListForm.setListType(fmListForm_TYPES.table);
						},
						text:'swich Table',
						ico: 'glyphicon glyphicon-align-justify'
					},
					swichTile: {
						command:function (selfScope) {
							selfScope.entityListForm.setListType(fmListForm_TYPES.tile);
						},
						text:'swich Tile',
						ico: 'glyphicon glyphicon-th'
					}

				},
				entityToolboxMenu: {
					editEntity: {
						command: function (selfScope) {
							selfScope.entityListForm.eventEditEntity(selfScope.entity.id);
						},
						text:'Edit',
						ico: 'glyphicon glyphicon-pencil'
					},
					deleteEntity: {
						command:function (selfScope) {
							selfScope.entityListForm.eventDeleteEntity(selfScope.entity.id);
						},
						text:'Delete',
						ico: 'glyphicon glyphicon-trash'
					}

				},

				listConfig: {
					'panel': {
						quantityProperties: 5,
						limitCellLength: 20
					}
				},
				listType: fmListForm_TYPES.table,
				setListType: function (listType) {
					this.listType = listType;
				},

				eventAddNewEntity: function () {
				},
				eventDeleteEntity: function (id) {
				},
				eventEditEntity: function (id) {
				},
				eventFindEntity: function () {

				}
			});
		};
	})();


	return EntityListForm;
}])

.directive('entityListForm', function () {
	return moduleUI.formsDirective.directiveEntityListForm();
})

;