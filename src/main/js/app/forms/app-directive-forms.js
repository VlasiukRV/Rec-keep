;
(function(exp) {
    if(!exp.appDirective){
        exp.appDirective = new Object(null);
    }
    var formsDirective = new Object(null);
    exp.appDirective.formsDirective = formsDirective;

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
        }
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
                scope.selectList = scope.property.entityListService().list
            }
        } else if (scope.property.inputType === 'select' || scope.property.inputType === 'multiselect') {
            if (scope.property.entityListService()) {
                scope.selectList = scope.property.entityListService().list
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
                }
            }]
        }
    };

    formsDirective.directiveEntityEditForm = function () {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/entityEditDirective/app-template-entity-edit-form.html ',
            scope: {
                entityEditForm: '='
            },
            link: function (scope, element, attrs) {

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
        }
    };

    formsDirective.directiveEntityEditFormRow = function () {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/entityEditDirective/app-template-entity-edit-form-row.html ',
            scope: {
                entityfieldsrow: '=',
                entityeditform: '='
            },
            link: function (scope, element, attrs) {
            }
        }
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
        }
    };

    formsDirective.directiveEntityListForm = function () {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/entityEditDirective/app-template-entity-list-form.html ',
            scope: {
                entityListForm: '='
            },
            link: function (scope, element, attrs) {

            },
            controller: ['$scope', function ($scope) {
                var listType = $scope.entityListForm.metadataSpecification.metadataObject.fmListForm.type.name;
                var listConfig = {
                    'panel': {
                        quantityProperties: 5,
                        limitCellLength: 20
                    }
                };
                $scope.quantity = Number.MAX_VALUE;
                if(listConfig[listType] && listConfig[listType].quantityProperties) {
                    $scope.quantityProperties = listConfig[listType].quantityProperties;
                }
                $scope.limitCellLength = Number.MAX_VALUE;
                if(listConfig[listType] && listConfig[listType].limitCellLength) {
                    $scope.limitCellLength = listConfig[listType].limitCellLength;
                }

                $scope.closeForm = function () {
                    $scope.entityListForm.eventCloseForm();
                };
                $scope.updateForm = function () {
                    $scope.entityListForm.eventUpdateForm();
                    $scope.entityListForm.entities = $scope.entityListForm.appMetadataSet.getEntityList($scope.entityListForm.metadataName).list;
                };
                $scope.findEntity = function (searchEx) {
                    $scope.entityListForm.eventFindEntity(searchEx);
                    $scope.entityListForm.entities = $scope.entityListForm.appMetadataSet.getEntityList($scope.entityListForm.metadataName).list;
                };
                $scope.addNewEntity = function () {
                    $scope.entityListForm.eventAddNewEntity();
                };
                $scope.deleteEntity = function (id) {
                    $scope.entityListForm.eventDeleteEntity(id);
                };
                $scope.editEntity = function (id) {
                    $scope.entityListForm.eventEditEntity(id);
                };

                $scope.toolboxMenu = {
                    editEntity: {
                        command: function (selfScope) {
                            $scope.editEntity(selfScope.entity.id);
                        },
                        text:'Edit',
                        ico: 'glyphicon glyphicon-pencil'
                    },
                    deleteEntity: {
                        command:function (selfScope) {
                            $scope.deleteEntity(selfScope.entity.id);
                        },
                        text:'Delete',
                        ico: 'glyphicon glyphicon-trash'
                    }
                };

            }]
        }
    };

    formsDirective.directiveFormToolbox = function () {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/form/app-template-form-toolbox.html',
            scope: true,
            link: function link(scope, element) {
                init_panel_toolbox(element);
            },
            controller: ['$scope', function ($scope) {
                $scope.selfScope = $scope;
                if (!$scope.toolboxMenu) {
                    $scope.toolboxMenu = {};
                }
            }]
        }
    };

})(window);