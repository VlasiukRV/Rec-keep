// A directive that wraps json-editor.

angular.module('angular-json-editor', [])

    .directive('jsonEditor', function () {
        return {
            restrict: 'E',
            scope: {'json': '='},
            template: '' +
                '            <div>\n' +
                '                <pre>{{pretty(json)}}</pre>\n' +
                '            </div>\n' +

                '            <div>\n' +
                '                <angular-json-editor ng-model="json" options="options" style="width: 100%; height: 400px;"></angular-json-editor>\n' +
                '            </div>\n' +
                '\n',
            link: function link($scope) {
                $scope.options = {mode: 'tree'};
                $scope.pretty = function (obj) {
                    return obj;
                };
            }
        }
    })

    .directive('angularJsonEditor', function () {

            return {
                restrict: 'E',
                require: 'ngModel',
                scope: {'options': '='},
                link: function link($scope, element, attrs, ngModel) {
                    var editor;

                    function createEditor() {
                        var settings = angular.extend({}, {}, $scope.options);
                        settings.onChange = function()
                        {
                            var isValid = false;
                            try {
                                ngModel.$setViewValue(editor.get());
                                isValid = true;
                            } catch (err) {
                                throw err;
                            } finally {
                                // Update field validation
                                ngModel.$setValidity('json', isValid);
                                ngModel.$setTouched();
                                $scope.$apply();
                                // If the user specified a onChange callback, trigger it
                                if ($scope.options.onChange && typeof $scope.options.onChange === 'function') {
                                    $scope.options.onChange();
                                }
                            }
                        };
                        element.html('');
                        return new JSONEditor(element[0], settings);
                    };

                    editor = createEditor();

                    $scope.$watch('options', function (newValue, oldValue) {
                        for (var k in newValue) {
                            if (newValue.hasOwnProperty(k)) {
                                var v = newValue[k];
                                if (newValue[k] !== oldValue[k]) {
                                    if (k === 'mode') {
                                        editor.setMode(v);
                                    } else if (k === 'name') {
                                        editor.setName(v);
                                    } else {
                                        // other settings cannot be changed without re-creating the JsonEditor
                                        editor = createEditor(newValue);
                                        $scope.updateJsonEditor();
                                        return;
                                    }
                                }
                            }
                        }
                    }, true);

                    $scope.$on('$destroy', function () {
                        editor = null;
                    });

                    $scope.updateJsonEditor = function () {
                        editor.set(ngModel.$viewValue || {});
                    };

                    ngModel.$render = $scope.updateJsonEditor;

                    $scope.$watch(function () {
                        return ngModel.$modelValue
                    }, function (newValue) {
                        // Do not update 2 times
                        if (!angular.equals(newValue, editor.get())) {
                            $scope.updateJsonEditor();
                        }
                    }, true);
                }
            };
        }
    );