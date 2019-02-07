;
(function(exp) {
    if(!exp.moduleUI){
        exp.moduleUI = new Object(null);
    }
    if(!exp.moduleUI.formsDirective){
        exp.moduleUI.formsDirective = new Object(null);
    }    
    var formsDirective = exp.moduleUI.formsDirective;

    formsDirective.directiveButton = function () {
        return {
            restrict: 'E',
            compile: function (element, attrs) {
                element.addClass('btn');
                if (attrs.type === 'submit') {
                    element.addClass('btn-primary');
                } else {
                    element.addClass('btn-default');
                }
                if (attrs.size) {
                    element.addClass('btn-' + attrs.size);
                }
            }
        };
    };

    formsDirective.directiveDatePicker = function () {

        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {

                //model -> view
                ngModelCtrl.$formatters.push(function (date) {
                        date = new Date(date);
                        if (angular.isDefined(date) &&
                            date !== null && !angular.isDate(date)) {
                            throw new Error('ng-Model value must be a Date object');
                        }
                        return date;
                    }
                );

                //view -> model
                ngModelCtrl.$parsers.push(function (viewValue) {
                        return viewValue.getTime();
                    }
                );
            }
        };
    };

    function refreshSelectList (scope) {
        if (!scope.property) {
            return;
        }
        if (scope.property.inputType === 'enum') {
            if (scope.property.entityListService()) {
                scope.selectList = scope.property.entityListService().list;
            }
        } else if (scope.property.inputType === 'select' || scope.property.inputType === 'multiselect') {
            if (scope.property.entityListService()) {
                scope.selectList = scope.property.entityListService().list;
            }
        }
    }

    formsDirective.directiveEntityProperty = function () {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/entityEditDirective/app-template-entity-property.html ',
            scope: {
                entity: '=',
                property: '='
            },
            link: function (scope) {
                refreshSelectList(scope);
            },
            controller: ['$scope', function ($scope) {
                $scope.refreshSelectList = refreshSelectList($scope);
                $scope.propertyChanged = function () {
                };
            }]
        };
    };

    formsDirective.directiveEntityEditForm = function () {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/entityEditDirective/app-template-entity-edit-form.html ',
            scope: {
                entityEditForm: '='
            },
            controller: ['$scope', function ($scope) {
                $scope.closeForm = function () {
                    $scope.entityEditForm.eventCloseForm();
                };
                $scope.updateForm = function () {
                    $scope.entityEditForm.eventUpdateForm();
                };
                $scope.createEntity = function () {
                    $scope.entityEditForm.eventCreateEntity($scope.entityEditForm.currentEntity);
                };
            }]
        };
    };

    formsDirective.directiveEntityEditFormRow = function () {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/entityEditDirective/app-template-entity-edit-form-row.html ',
            scope: {
                entityfieldsrow: '=',
                entityeditform: '='
            }
        };
    };

    formsDirective.directiveEntityEditFormCol = function ($compile) {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/entityEditDirective/app-template-entity-edit-form-col.html ',
            scope: {
                fieldplacing: '=',
                entityeditform: '='
            },
            link: function (scope, element) {
                if (angular.isArray(scope.fieldplacing.editFieldId)) {
                    var e = $compile("" +
                        '<div ng-repeat="entityfieldsrow in fieldplacing.editFieldId track by $index">' +
                        '<entity-edit-form-row entityfieldsrow="entityfieldsrow" entityeditform="entityeditform">' +
                        '</entity-edit-form-row>' +
                        '</div>'
                    )(scope);
                    element.replaceWith(e);
                }
            }
        };
    };

    formsDirective.directiveFormToolbox = function () {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/form/app-template-form-toolbox.html',
            scope: {
                toolboxMenu: '=?'
            },
            link: function link($scope, iElement) {
                $scope.selfScope = $scope.$parent;
                if (!$scope.toolboxMenu) {
                    $scope.toolboxMenu = {};
                }

                init_panel_toolbox(iElement);
            }
        };
    };
    
    formsDirective.directiveTextValue = function () {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/app-template-text-value.html',
            scope: {
                textValue: '=',
                limitLength: '=?'
            },
            controller: ['$scope', function ($scope) {
                if(!$scope.limitLength) {
                    $scope.limitLength = Number.MAX_VALUE;
                }
            }]
        };
    };
    
    formsDirective.directiveUpdatableText = function ($interval) {
        return {
            restrict: 'E',
            scope: {
                fCallBack: '&'
            },
            link: function link(scope, element, attrs) {
                var timeoutId;

                var updateText = function updateText() {
                    element.text(scope.fCallBack());
                };

                scope.$watch(attrs.smCurrentTime, function () {
                    updateText();
                });

                element.on('$destroy', function () {
                    $interval.cancel(timeoutId);
                });

                // start the UI update process; save the timeoutId for canceling
                timeoutId = $interval(function () {
                    updateText(); // update DOM
                }, 1000);
            }

        };
    };

})(window);