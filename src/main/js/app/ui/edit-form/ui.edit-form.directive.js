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
        if (
            scope.property.inputType === 'select' || 
            scope.property.inputType === 'multiselect' ||
            scope.property.inputType === 'enum'
            ) {
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

    formsDirective.directiveValueTileCount = function() {
        return {            
            restrict: 'E',
            templateUrl: '/templates/appRoom/tasklist/directive/components/app-template-component-value-tile-count.html',
            scope: {
                countValue: '='
            },
            link: function link($scope, iElement) {
            }
        };
    };

    formsDirective.directiveValueProgresCount = function() {
        return {
            restrict: 'E',
            templateUrl: '/templates/appRoom/tasklist/directive/components/app-template-component-value-progres-count.html',
            scope: {
                countValue: '='
            },
            link: function link($scope, iElement) {
                    var element = $scope.countValue;
                    element.portion = element.value*100/element.maxValue;
                    $scope.$watch('countValue', function(element, oldValue, $scope) {
                        element.portion = element.value*100/element.maxValue;
                        $('.progress-bar').progressbar();
                    }, true);
            }
        };
    };

    formsDirective.directiveValueKnobCount = function() {
        return {
            restrict: 'E',
            templateUrl: '/templates/appRoom/tasklist/directive/components/app-template-component-value-knob-count.html',
            scope: {
                countValue: '='
            },
            link: function link($scope, iElement) {
              var $element = $('.knob', iElement);
              $element.knob({
                  fgColor: '#26B99A',
                  displayPrevious: true,
                  width: 75,
                  displayInput: true,
                  width: 100,
                  height: 120,
                  min: $scope.countValue.minValue,
                  max: $scope.countValue.maxValue,
                  change: function(value) {
                    //console.log("change : " + value);
                  },
                  release: function(value) {
                    //console.log(this.$.attr('value'));
                    console.log("release : " + value);
                    $scope.countValue.value = value;
                  },
                  cancel: function() {
                    console.log("cancel : ", this);
                  },
                  /*format : function (value) {
                   return value + '%';
                   },*/
                  draw: function() {
                    // "tron" case
                    if (this.$.data('skin') == 'tron') {

                      this.cursorExt = 0.3;

                      var a = this.arc(this.cv) // Arc
                        ,
                        pa // Previous arc
                        , r = 1;

                      this.g.lineWidth = this.lineWidth;

                      if (this.o.displayPrevious) {
                        pa = this.arc(this.v);
                        this.g.beginPath();
                        this.g.strokeStyle = this.pColor;
                        this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                        this.g.stroke();
                      }

                      this.g.beginPath();
                      this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
                      this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
                      this.g.stroke();

                      this.g.lineWidth = 2;
                      this.g.beginPath();
                      this.g.strokeStyle = this.o.fgColor;
                      this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                      this.g.stroke();

                      return false;
                    }
                  }
              });

              $element.val($scope.countValue.value).trigger('change');
            }
        };
    };

    formsDirective.directiveValueCountListSparkline = function() {
        return {
            restrict: 'A',
            templateUrl: '/templates/appRoom/tasklist/directive/components/app-template-component-values-count-sparkline.html',
            require: 'ngModel',
            link: function link($scope, iElement, attrs, ngModel) {

                opts = {};
                opts.type = attrs.type || 'bar';
                opts.barColor = attrs.barColor || '#26B99A';
                opts.height = attrs.height || '125';
                opts.barWidth = attrs.barWidth || '13';
                opts.barSpacing = attrs.barSpacing || '2';
                opts.zeroAxis = attrs.zeroAxis || 'false';

                $scope.$watch(attrs.ngModel, function () {
                    render();
                }, true);

                $scope.$watch(attrs.opts, function(){
                    render();
                }, true);

                var render = function () {
                    var model;
                    if(attrs.opts) angular.extend(opts, angular.fromJson(attrs.opts));
                    angular.isString(ngModel.$viewValue) ? model = ngModel.$viewValue.replace(/(^,)|(,$)/g, "") : model = ngModel.$viewValue;

                    var arrayValue = [];
                    $.each(model, function (index, element) {
                        arrayValue.push(element.value);
                    });
                    $(".sparkline", iElement).sparkline(arrayValue, opts);
                };
            }
        };
    };

    formsDirective.directiveGraficMap = function() {
        return {
            restrict: 'E',
            templateUrl: '/templates/appRoom/tasklist/directive/components/app-template-component-grafic-map.html',
            link: function link($scope, iElement) {
              $(".jqvvmap", iElement).vectorMap({
                  map: 'canada_en',
                  backgroundColor: null,
                  color: '#ffffff',
                  hoverOpacity: 0.7,
                  selectedColor: '#666666',
                  enableZoom: true,
                  showTooltip: true,
                  scaleColors: ['#E6F2F0', '#149B7E'],
                  normalizeFunction: 'polynomial',
                  onRegionClick: function(event, code, region){
                    event.preventDefault();
                  }
                });
            }
        };
    };

    formsDirective.directiveTableValueCountEcharts = function() {
        return {
            restrict: 'A',
            templateUrl: '/templates/appRoom/tasklist/directive/components/app-template-component-table-values-count-echarts.html',
            require: 'ngModel',
            link: function link($scope, iElement, attrs, ngModel) {

                var opts = {
                  color: [
                      '#26B99A', '#34495E', '#BDC3C7', '#3498DB',
                      '#9B59B6', '#8abb6f', '#759c6a', '#bfd3b7'
                  ],

                  title: {
                      itemGap: 8,
                      textStyle: {
                          fontWeight: 'normal',
                          color: '#408829'
                      }
                  },

                  dataRange: {
                      color: ['#1f610a', '#97b58d']
                  },

                  toolbox: {
                      color: ['#408829', '#408829', '#408829', '#408829']
                  },

                  tooltip: {
                      backgroundColor: 'rgba(0,0,0,0.5)',
                      axisPointer: {
                          type: 'line',
                          lineStyle: {
                              color: '#408829',
                              type: 'dashed'
                          },
                          crossStyle: {
                              color: '#408829'
                          },
                          shadowStyle: {
                              color: 'rgba(200,200,200,0.3)'
                          }
                      }
                  },

                  dataZoom: {
                      dataBackgroundColor: '#eee',
                      fillerColor: 'rgba(64,136,41,0.2)',
                      handleColor: '#408829'
                  },
                  grid: {
                      borderWidth: 0
                  },

                  categoryAxis: {
                      axisLine: {
                          lineStyle: {
                              color: '#408829'
                          }
                      },
                      splitLine: {
                          lineStyle: {
                              color: ['#eee']
                          }
                      }
                  },

                  valueAxis: {
                      axisLine: {
                          lineStyle: {
                              color: '#408829'
                          }
                      },
                      splitArea: {
                          show: true,
                          areaStyle: {
                              color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
                          }
                      },
                      splitLine: {
                          lineStyle: {
                              color: ['#eee']
                          }
                      }
                  },
                  timeline: {
                      lineStyle: {
                          color: '#408829'
                      },
                      controlStyle: {
                          normal: {color: '#408829'},
                          emphasis: {color: '#408829'}
                      }
                  },

                  k: {
                      itemStyle: {
                          normal: {
                              color: '#68a54a',
                              color0: '#a9cba2',
                              lineStyle: {
                                  width: 1,
                                  color: '#408829',
                                  color0: '#86b379'
                              }
                          }
                      }
                  },
                  map: {
                      itemStyle: {
                          normal: {
                              areaStyle: {
                                  color: '#ddd'
                              },
                              label: {
                                  textStyle: {
                                      color: '#c12e34'
                                  }
                              }
                          },
                          emphasis: {
                              areaStyle: {
                                  color: '#99d2dd'
                              },
                              label: {
                                  textStyle: {
                                      color: '#c12e34'
                                  }
                              }
                          }
                      }
                  },
                  force: {
                      itemStyle: {
                          normal: {
                              linkStyle: {
                                  strokeColor: '#408829'
                              }
                          }
                      }
                  },
                  chord: {
                      padding: 4,
                      itemStyle: {
                          normal: {
                              lineStyle: {
                                  width: 1,
                                  color: 'rgba(128, 128, 128, 0.5)'
                              },
                              chordStyle: {
                                  lineStyle: {
                                      width: 1,
                                      color: 'rgba(128, 128, 128, 0.5)'
                                  }
                              }
                          },
                          emphasis: {
                              lineStyle: {
                                  width: 1,
                                  color: 'rgba(128, 128, 128, 0.5)'
                              },
                              chordStyle: {
                                  lineStyle: {
                                      width: 1,
                                      color: 'rgba(128, 128, 128, 0.5)'
                                  }
                              }
                          }
                      }
                  },
                  gauge: {
                      startAngle: 225,
                      endAngle: -45,
                      axisLine: {
                          show: true,
                          lineStyle: {
                              color: [[0.2, '#86b379'], [0.8, '#68a54a'], [1, '#408829']],
                              width: 8
                          }
                      },
                      axisTick: {
                          splitNumber: 10,
                          length: 12,
                          lineStyle: {
                              color: 'auto'
                          }
                      },
                      axisLabel: {
                          textStyle: {
                              color: 'auto'
                          }
                      },
                      splitLine: {
                          length: 18,
                          lineStyle: {
                              color: 'auto'
                          }
                      },
                      pointer: {
                          length: '90%',
                          color: 'auto'
                      },
                      title: {
                          textStyle: {
                              color: '#333'
                          }
                      },
                      detail: {
                          textStyle: {
                              color: 'auto'
                          }
                      }
                  },
                  textStyle: {
                      fontFamily: 'Arial, Verdana, sans-serif'
                  }
                };

                $scope.echartLine = echarts.init($(".echart", iElement)[0], opts);

                $scope.$watch(attrs.ngModel, function () {
                    render();
                }, true);

                $scope.$watch(attrs.opts, function(){
                    render();
                }, true);

                var render = function () {
                    var model;
                    if(attrs.opts) angular.extend(opts, angular.fromJson(attrs.opts));
                    angular.isString(ngModel.$viewValue) ? model = ngModel.$viewValue.replace(/(^,)|(,$)/g, "") : model = ngModel.$viewValue;

                    var seriesName = [];
                    var categoryData = model.categoryData;
                    var seriesValue = [];
                    $.each(model.seriesValue, function (index, element) {
                        var seria = {
                                name: element.valueLabel,
                                type: 'bar',
                                smooth: true,
                                itemStyle: {
                                    normal: {
                                        areaStyle: {
                                            type: 'default'
                                        }
                                    }
                                },
                                data: []
                            };
                        seriesName.push(element.valueLabel);
                        $.each(element.value, function (dataIndex, dataElement) {
                            seria.data.push(dataElement.value);
                        });
                        seriesValue.push(seria);
                    });                    
                    
                    $scope.echartLine.setOption({
                        title: {
                            text: 'Line Graph',
                            subtext: 'Subtitle'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            x: 220,
                            y: 40,
                            data: seriesName
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                magicType: {
                                show: true,
                                title: {
                                    line: 'Line',
                                    bar: 'Bar',
                                    stack: 'Stack',
                                    tiled: 'Tiled'
                                },
                                type: ['line', 'bar', 'stack', 'tiled']
                            },
                            restore: {
                                show: true,
                                title: "Restore"
                            },
                            saveAsImage: {
                                show: true,
                                title: "Save Image"
                            }
                          }
                        },
                        calculable: true,
                        xAxis: [{
                            type: 'category',
                            boundaryGap: false,
                            data: categoryData
                        }],
                        yAxis: [{
                            type: 'value'
                        }],
                        series: seriesValue
                      });

                };
            }
        };
    };

    formsDirective.draggable = function($document) {
        return {
            restrict: 'A',
            link: function link($scope, iElement, attrs) {

                return;

                var startX = 0, startY = 0, x = 0, y = 0;
                iElement.css({
                    position: 'relative',
                    cursor: 'pointer'
                });

                iElement.bind('mousedown', function(event) {
                    // Prevent default dragging of selected content
                    event.preventDefault();
                    startX = event.screenX - x;
                    startY = event.screenY - y;
                    $document.bind('mousemove', mousemove);
                    $document.bind('mouseup', mouseup);
                });
         
                function mousemove(event) {
                    y = event.screenY - startY;
                    x = event.screenX - startX;
                    iElement.css({
                        top: y + 'px',
                        left:  x + 'px'
                    });
                }
         
                function mouseup() {
                    $document.unbind('mousemove', mousemove);
                    $document.unbind('mouseup', mouseup);
                }

            }
        };
    };
})(window);

