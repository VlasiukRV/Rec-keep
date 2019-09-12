;
(function (exp) {
	if (!exp.moduleConfigSystem) {
		exp.moduleConfigSystem = new Object(null);
	}
	var moduleConfigSystem = exp.moduleConfigSystem;
	
	moduleConfigSystem.Entity = function(resourceService){
        var Entity = appUtils.Class();
        (function () {
            Entity.prototype.includeEntityFd = function (fd, entityFd, defineFd) {
                var strEntityFd = '';
                this.includeFd({entityFd: ''});
                if (fd) {
                    this.includeFd(fd);
                }
                if (entityFd) {
                    this.includeFd(entityFd);
                    for (var key in entityFd) {
                        strEntityFd = '' + strEntityFd + ', ' + key;
                    }
                    if (strEntityFd.length > 0) {
                        strEntityFd = strEntityFd.slice(2);
                    }
                    this.includeFd({entityFd: strEntityFd});
                }
                if (defineFd) {
                    for (var key in defineFd) {
                        this.includeDefineFd(key, defineFd[key]);
                    }
                }
            };

            Entity.prototype.$_buildObject = function () {
                this.includeEntityFd(
                    {
                        // object field
                        metadataName: '',
                        icon: 'fa-folder-o',
                    }, {
                        // entity field
                        id: null,
                        description: ''
                    }, {
                        // define field
                        representation: {
                            enumerable: true,
                            get: function () {
                                if (this.name) {
                                    return '' + this.name;
                                } else {
                                    return 'entity [' + this.metadataName + '] id: ' + this.id + '';
                                }
                            }
                        }
                    }
                );

            };

            var baseCreateEntity = function () {
                var fCallBack = arguments[0];
                var data = arguments[1];

                if (data.status === 200) {
                    var originalEntity = data.data;
                    if (originalEntity) {
                        appUtils.fillValuesProperty(originalEntity, this);
                        fCallBack(this);
                    }
                }
            };

            Entity.includeMthd({
                isEmpty: function () {
                    // ToDo write what attribute of empty entity
                    return this.id === 0 || this.id == null || this.id === '';
                },

                translateToEntityJSON: function () {
                    var replacer = this.entityFd.split(', ');
                    return JSON.stringify(this, replacer);
                },

                createEntity: function (fCallBack) {
                    if (!this.metadataName) {

                    }
                    var entityJSON = this.translateToEntityJSON();
                    resourceService.getEntityEditService().createEntity(
                        {entityName: this.metadataName}, entityJSON,
                        baseCreateEntity.bind(this, fCallBack),
                        function (httpResponse) {
                            /*resourceService.collError(httpResponse)*/
                        }
                    );
                }

            });
        })();

        return Entity;
	}

})(window);