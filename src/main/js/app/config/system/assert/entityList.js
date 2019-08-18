;
(function (exp) {
	if (!exp.moduleConfigSystem) {
		exp.moduleConfigSystem = new Object(null);
	}
	var moduleConfigSystem = exp.moduleConfigSystem;

	moduleConfigSystem.EntityList = function(resourceService){
        var EntityList = appUtils.Class();
        (function () {
            EntityList.prototype.$_buildObject = function () {
                this.includeFd(
                    {
                        metadataName: '',
                        list: [],
                        metadataObject: null
                    });
            };
            var updateEnt = function (fCallBack, data) {
                /*
                 var fCallBack = arguments[0];
                 var data = arguments[1];
                 */

                if (data.status === 200) {
                    var originalUserList = data.data;
                    if (originalUserList) {
                        originalUserList.forEach(function (item) {
                            var entity = this.metadataObject.getEntityInstance();
                            appUtils.fillValuesProperty(item, entity);
                            this.addEntity(entity);
                        }, this);
                    }
                    console.log('Update ' + this.metadataObject.metadataName);
                }

                if (fCallBack) {
                    fCallBack(this);
                }
            };

            var deleteEnt = function () {
                var id = arguments[0];
                var fCallBack = arguments[1];
                var data = arguments[2];

                if (data.status === 200) {
                    this.list.forEach(function (item, i) {
                        if (item.id === id) {
                            this.list.splice(i, 1);
                            return true;
                        }
                    }, this);
                }

                if (fCallBack) {
                    fCallBack(this);
                }
            };

            EntityList.includeMthd({
                addEntity: function (entity) {
                    var entityAdded = false;
                    for (var index = 0; index < this.list.length; ++index) {
                        var item = this.list[index];
                        if (item.id === entity.id) {
                            this.list[index] = entity;
                            entityAdded = true;
                            return;
                        }
                    }
                    if (!entityAdded) {
                        this.list.push(entity);
                    }
                },
                findEntityById: function (id) {
                    for (var index = 0; index < this.list.length; ++index) {
                        var item = this.list[index];
                        if (item.id === id) {
                            return item;
                        }
                    }
                    return undefined;
                },
                addEntityByTemplate: function (template, fCallBack) {
                    var entity = null;
                    if (template.isEmpty()) {
                        entity = this.metadataObject.getEntityInstance(this.metadataName);
                    } else {
                        entity = this.findEntityById(template.id);
                    }

                    var entityList = this;
                    appUtils.fillValuesProperty(template, entity);
                    entity.createEntity(function (data) {
                        entityList.addEntity(data);
                        fCallBack();
                    });
                },
                update: function (fCallBack) {
                    var self = this;
                    self.list = [];
                    resourceService.getEntityEditService()
                        .getEntity({entityName: this.metadataName}, {},
                        function (data) {
                            updateEnt.call(self, fCallBack, data);
                        },
                        function (httpResponse) {
                            /*resourceService.collError(httpResponse)*/
                        }
                    );
                },
                findEntity: function (searchEx, fCallBack) {
                    var self = this;
                    self.list = [];
                    resourceService.getEntityEditService()
                        .getEntity({entityName: this.metadataName, search: searchEx}, {},
                        function (data) {
                            updateEnt.call(self, fCallBack, data);
                        },
                        function (httpResponse) {
                            /*resourceService.collError(httpResponse)*/
                        }
                    );
                },
                deleteEntity: function (id, fCallBack) {
                    resourceService.getEntityEditService()
                        .deleteEntity({entityName: this.metadataName, entityId: id}, {},
                        deleteEnt.bind(this, id, fCallBack),
                        function (httpResponse) {
                            /*resourceService.collError(httpResponse)*/
                        }
                    );
                }

            });
        })();

        return EntityList;
	}
	
})(window);