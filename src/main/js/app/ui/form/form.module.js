angular.module('module.ui.form', 
    [
	]
)

.service('EditForm', 
    [
    function () {
        var EditForm = appUtils.Class();
        (function () {
            EditForm.prototype.$_buildObject = function () {
                this.includeFd({
                    editFormName: '<--label for form-->',
                    formProperties: {},

                    eventCloseForm: function () {
                    },
                    eventUpdateForm: function () {
                    }
                });
            };
        })();

	return EditForm;
    }
])

;