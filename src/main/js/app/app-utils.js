;
(function (exp) {
    if (!exp.appUtils) {
        exp.appUtils = new Object(null);
    }
    var appUtils = exp.appUtils;

    appUtils.Class = function (Parent) {

        // prototype есть только в функции
        var klass = function () {
            if (Parent) {
                // call object builder of parent
                Parent.prototype.$_buildObject.call(this, {});
            }
            // call object builder
            this.$_buildObject();
        };
        // object builder
        klass.prototype.$_buildObject = function () {
        };

        if (Parent) {
            // Inherit
            klass.prototype = Object.create(Parent.prototype);
            // save parent
            klass.prototype.$_parentClass = Parent;
        }

        // Add methods, fields for Klass
        klass.extend = function (obj) {
            var extended = obj.extended;
            for (var key in obj) {
                klass[key] = obj[key];
            }
            if (extended) {
                extended(klass);
            }
        };

        // Add methods for object
        klass.includeMthd = function (obj) {
            var included = obj.included;
            for (var key in obj) {
                klass.prototype[key] = obj[key];
                /*
                 // Вызов метода родителя у метода потомка
                 klass.prototype.run = function () {
                 // Вызов метода родителя внутри своего
                 Parent.prototype.run.apply(this);
                 // реализация метода
                 };
                 */
            }
            if (included) {
                included(klass);
            }
        };
        // Add fields for object
        klass.prototype.includeFd = function (obj) {
            var included = obj.included;
            for (var key in obj) {
                this[key] = obj[key];
            }
            if (included) {
                included(klass);
            }
        };
        // Add define fields for object
        klass.prototype.includeDefineFd = function (key, desc) {
            var description = {
                configurable: true,
                enumerable: true,
                get: function () {
                    return '';
                }
            };
            if (desc.enumerable) {
                description.enumerable = desc.enumerable;
            }
            if (desc.get) {
                description.get = desc.get;
            }

            Object.defineProperty(this, key, description);
        };

        return klass;
    };

    appUtils.makeDate = function (millisecond) {
        return new Date(millisecond);
    };

    appUtils.getClass = function (obj) {
        return {}.toString.call(obj).slice(8, -1);
    };

    appUtils.fillValuesProperty = function (source, receiver) {
        for (var key in source) {
            var sourceProperty = source[key];
            if (!(key in receiver)) {
                continue;
            }
            if (key.indexOf('$$') >= 0) {
                continue;
            }
            if (typeof sourceProperty === 'function') {
                continue;
            }

            if (angular.isDate(sourceProperty)) {
                receiver[key] = sourceProperty;
            } else if (angular.isArray(sourceProperty)) {
                var  isload = false;
                if(receiver[key]){
                    if (receiver[key].fillByTemplate) {
                        receiver[key].fillByTemplate(sourceProperty);
                        isload = true;
                    }
                } else {
                    receiver[key] = [];
                }
                if (sourceProperty.fillByTemplate) {
                    receiver[key].fillByTemplate = sourceProperty.fillByTemplate;
                    receiver[key].fillByTemplate(sourceProperty);
                } else {
                    if (!isload) {
                        receiver[key] = sourceProperty;
                    }
                }
                if (sourceProperty.representationList) {
                    receiver[key].representationList = sourceProperty.representationList;
                }

            } else if (sourceProperty == null) {
                receiver[key] = sourceProperty;
            } else if (typeof sourceProperty === 'object') {

                    if(typeof receiver[key] === 'string') {
                        receiver[key] = JSON.stringify(sourceProperty);
                    } else {
                        if (receiver[key]) {

                        } else {
                            receiver[key] = {};
                        }
                        appUtils.fillValuesProperty(sourceProperty, receiver[key]);
                    }

            } else {
                receiver[key] = sourceProperty;
            }
        }
        return receiver;
    };

    // ToDo
    appUtils.fillAllValuesProperty = function (source, receiver) {
        for (var key in source) {
            var sourceProperty = source[key];
            if (key.indexOf('$$') >= 0) {
                continue;
            }

            if (angular.isDate(sourceProperty)) {
                receiver[key] = sourceProperty;
            } else if (angular.isArray(sourceProperty)) {
                if (receiver[key]) {

                }else {
                    receiver[key] = [];
                }
                if (sourceProperty.fillByTemplate) {
                    receiver[key].fillByTemplate = sourceProperty.fillByTemplate;
                    receiver[key].fillByTemplate(sourceProperty);
                } else {
                    receiver[key] = sourceProperty;
                }
                if (sourceProperty.representationList) {
                    receiver[key].representationList = sourceProperty.representationList;
                }
            } else if (sourceProperty == null) {
                receiver[key] = sourceProperty;
            } else if (typeof sourceProperty === 'object') {
                if (receiver[key]) {

                } else {
                    receiver[key] = {};
                }
                appUtils.fillAllValuesProperty(sourceProperty, receiver[key]);
            } else {
                receiver[key] = sourceProperty;
            }
        }
        return receiver;
    };

    appUtils.clearProperties = function (o) {
        for (var key in o) {
            var property = o[key];
            if (typeof property === 'number') {
                property = 0;
            } else if (typeof property === 'string') {
                property = '';
            } else if (typeof property === 'boolean') {
                property = false;
            } else if (this.getClass(property) === 'Date') {
                property = new Date();
            } else if (typeof property === 'object') {
                this.clearProperties(property);
            }
        }
    };

    if ([].indexOf) {
        appUtils.find = function (array, value) {
            return array.indexOf(value);
        };
    } else {
        appUtils.find = function (array, value) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === value) {
                    return i;
                }
            }

            return -1;
        };
    }

    appUtils.ucFirst = function (str) {
        if (!str) {
            return str;
        }

        return str[0].toUpperCase() + str.slice(1);
    };

    appUtils.log = function () {
        if (typeof console == 'undefined') {
            return;
        }

        var args = jQuery.makeArray(arguments);
        args.unshift('(App:)');
        console.log.apply(console, args);
    };

    appUtils.string = {
        toTitleCase: function (str) {
            return str.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
    };

})(window);
