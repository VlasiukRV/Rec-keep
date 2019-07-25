angular.module('module.ui', 
	[
	'ngResource', 

	'module.config',
	'module.config.system',

	'module.ui.main-menu',
	'module.ui.edit-form',
	'module.ui.list-form'
	]
)


.directive('ngElementReady', 
	[
	moduleUI.directive.directiveElementReady
	]
)
.directive('loginPage', 
	[
	'principal', 

	moduleUI.directive.directiveLoginPage
	]
)

;