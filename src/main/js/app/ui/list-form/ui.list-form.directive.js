;
(function(exp) {
    if(!exp.moduleUI){
        exp.moduleUI = new Object(null);
    }
    if(!exp.moduleUI.formsDirective){
        exp.moduleUI.formsDirective = new Object(null);
    }    
    var formsDirective = exp.moduleUI.formsDirective;
    
    formsDirective.directiveEntityListForm = function () {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/entityEditDirective/app-template-entity-list-form.html ',
            scope: {
                entityListForm: '='
            },
            controller: ['$scope', function ($scope) {

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

            }]
        };
    };

    formsDirective.directiveFieldValue = function () {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/components/app-template-component-field-value.html',
            scope: {
                entity: '=',
                field: '='
            },
            link: function ($scope, element, attrs) {
                
            },
            controller: ['$scope', function ($scope) {
                
            }]
        }
    };

    formsDirective.directiveTile = function () {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/components/app-template-component-tile.html',
            scope: {
                entity: '=',
                fields: '=',
                toolboxMenu: '=?',                
                options: '='
            },
            link: function ($scope, element, attrs) {
                
            },
            controller: ['$scope', function ($scope) {
                
            }]
        }
    };

    formsDirective.directivePanel = function () {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/components/app-template-component-panel.html',
            scope: {
                entity: '=',
                fields: '=',
                toolboxMenu: '=?',                
                options: '='
            },
            link: function ($scope, element, attrs) {
                
            },
            controller: ['$scope', function ($scope) {
                
            }]
        }
    };

    formsDirective.directiveMediaCard = function () {
        return {
            restrict: 'E',
            require: '',
            templateUrl: '/templates/appRoom/tasklist/directive/components/app-template-component-media-card.html',
            scope: {
                entity: '=',
                fields: '=',
                toolboxMenu: '=?',                
                options: '='
            },
            link: function ($scope, element, attrs) {
                
            },
            controller: ['$scope', function ($scope) {
                
            }]
        }
    };

    formsDirective.directiveCalendar = function () {
        return {
            restrict: 'E',
            require: '',
            scope: {
                toolboxMenu: '=?',
                entityListForm: '='
            },
            link: function ($scope, element, attrs) {

                if (typeof ($.fn.fullCalendar) === 'undefined') {
                    return;
                }

                if (!$scope.toolboxMenu) {
                    $scope.toolboxMenu = {};
                }

                var fullCalendar_events = [];
                angular.forEach($scope.entityListForm.entitiesFiltered, function (entity) {
                    fullCalendar_events.push({
                        id: entity.id,
                        title: entity.representation,
                        start: entity.date,
                        end: entity.date + entity.plainTime,
                        allDay: false,

                        entity_scope: {
                            entityListForm: $scope.entityListForm,
                            entity: entity
                        }
                    })
                });

                var date = new Date(),
                    d = date.getDate(),
                    m = date.getMonth(),
                    y = date.getFullYear(),
                    started,
                    categoryClass;

                var calendar = $('<div> </div>').fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay,listMonth'
                    },
                    selectable: true,
                    selectHelper: true,
                    editable: true,
                    events: fullCalendar_events,
                    select: function (start, end, allDay) {
                        $scope.entityListForm.eventAddNewEntity();
                    },
                    eventClick: function(calEvent, jsEvent, view) {
                        $scope.toolboxMenu.editEntity.command(calEvent.entity_scope);
                    }
                });

                $(element).append(calendar);
                calendar.fullCalendar('today');
            },
            controller: ['$scope', function ($scope) {
            }]
        }
    }

})(window);