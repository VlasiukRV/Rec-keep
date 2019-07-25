;
(function (exp) {
	// Abstract model of application interface
	if (!exp.varInterfaceUtill) {
		exp.varInterfaceUtill = new Object(null);
	}
	var varInterfaceUtill = exp.varInterfaceUtill;

    var ErrorDescription = appUtils.Class();
    (function () {
        ErrorDescription.prototype.$_buildObject = function () {
            this.includeFd({
                error: false,
                status: 0,
                statusText: '',
                type: 'success'
            });
        };
        ErrorDescription.includeMthd({
            SetHTTPError: function (statusText, status) {
                this.error = true;
                this.status = status;
                this.statusText = 'HTTP error: ' + statusText;
            },
            SetNoError: function () {
                this.error = false;
                this.status = 200;
                this.statusText = '';
            },
            SetAppError: function (statusText) {
                this.error = true;
                this.status = 0;
                this.statusText = 'App error: ' + statusText;
            }
        });
    })();

    var ErrorDescriptions = appUtils.Class();
    (function () {
        ErrorDescriptions.prototype.$_buildObject = function () {
            this.includeFd({
                errorDescriptions: [],
                show: false
            });
        };
        ErrorDescriptions.includeMthd({
            handleResponse: function (response) {
                var errorDescription = new ErrorDescription();
                errorDescription.SetNoError();
                if ((response.status === 200) ||
                    (response.status === 404) ||
                    (response.status === 403)
                    ) {
                    var objectResponse = response.data;
                if (objectResponse instanceof Object) {
                            if ('message' in objectResponse && 'status' in objectResponse) { //ToDo
                                if (response.data.status !== 200) {
                                    errorDescription.SetAppError(objectResponse.message);
                                }
                            }
                        } else if (response.status !== 200) {
                            objectResponse = eval('(' + response.data + ')');
                            errorDescription.SetAppError(objectResponse.message);
                        }
                    } else {
                        errorDescription.SetHTTPError(response.statusText, response.status);
                    }
                    if (errorDescription.error) {
                        this.addErrorDescription(errorDescription);
                        this.show = true;
                    }
                },
                addErrorDescription: function (_data) {
                    this.errorDescriptions.push(_data);
                },
                delErrorDescription: function (index) {
                    this.errorDescriptions.splice(index, 1);
                },
                getErrorDescriptions: function () {
                    return this.errorDescriptions;
                },
                errorsCount: function () {
                    return this.errorDescriptions.length;
                }
            });
    })();

    var MenuCommand = appUtils.Class();
    (function () {
    	MenuCommand.prototype.$_buildObject = function () {
    		this.includeFd({
    			commandName: '',

                isGroupMenu: false,
    			isDropdownMenu: false,
                icon:'',
    			text: '',
    			command: null,
    			commandList: []
    		});
    	};
    	MenuCommand.includeMthd({
    		addCommand: function (command) {
    			this.commandList.push(command);
    			return this;
    		},
    		getSubMenu: function (commandName) {
                if (this.commandName === commandName) {
                    return this;
                }
    			for (var i = 0; i < this.commandList.length; i++) {
                    var command = this.commandList[i].getSubMenu(commandName);
                    if(command) {
                        return command;
                    }
    			}
    			return undefined;
    		}
    	});

    }());

    var UserInterface = appUtils.Class();
    (function () {
    	UserInterface.prototype.$_buildObject = function () {
    		this.includeFd({
    			security: {
    				principal: null
    			},
    			commandBar: {
                    commandBar: new MenuCommand()
    			},
    			appMetadataSet: null
    		});
    	};
    	UserInterface.includeMthd({
    		commandBarAddCommand: function (command) {
    			this.commandBar.commandList.push(command);
    			return this;
    		},
    		editFormGetEntityEditForm: function () {
    			return new EntityEditForm();
    		},
    		editFormGetEntityListForm: function () {
    			return new EntityListForm();
    		}
    	});
    }());

    varInterfaceUtill.ErrorDescriptions = ErrorDescriptions;
    varInterfaceUtill.UserInterface = UserInterface;

    varInterfaceUtill.getNewGroupCommand = function (commandName, text) {
        var command = new MenuCommand();        
        command.commandName = commandName;
        command.text = text;
        command.command = commandName;
        command.isGroupMenu = true;
        
        return command;
    };    
    varInterfaceUtill.getNewEntityCommand = function (commandName, entitySpecification) {
    	var command = new MenuCommand();
    	command.commandName = commandName;
    	command.text = entitySpecification.metadataRepresentation;
        command.icon = 'fa fa-folder-o';
    	command.command = commandName;

    	return command;
    };
    varInterfaceUtill.getNewDropdownCommand = function (commandName, text) {
    	var command = new MenuCommand();    	
    	command.commandName = commandName;
    	command.text = text;
        command.isDropdownMenu = true;
    	return command;
    };
    varInterfaceUtill.getNewCommand = function (commandName, text, functionCommand) {
    	var command = new MenuCommand();
    	command.commandName = commandName;
    	command.text = text;
    	command.command = functionCommand;

    	return command;
    };

    varInterfaceUtill.ExecuteSystemCommand = function (resourceService, command) {
        var systemService = resourceService.getSystemService();
        systemService.executeCommand({command: command}, {});
    };

    varInterfaceUtill.ExecuteServiceCommand = function (resourceService, command) {
        var operationService = resourceService.getOperationService();
        operationService.executeCommand({command: command}, {});
    };

    varInterfaceUtill.securityService = function (resource, appHttp) {
        return resource(
            appHttp.getAppHttpUrl('/system/security/:command'),
            {
                sessionID: '@sessionID'
            },
            {
                getAllPrincipals: {
                    method: 'GET',
                    params: {
                        command: 'getAllPrincipals'
                    }
                },
                getSessionInformation: {
                    method: 'GET',
                    params: {
                        command: 'getSessionInformation'
                    }
                },
                getAllSessionsInformation: {
                    method: 'GET',
                    params: {
                        command: 'getAllSessionsInformation'
                    }
                },

            }
        );
    };

    varInterfaceUtill.operationService = function (resource, appHttp) {
        return resource(
            appHttp.getAppHttpUrl('/service/:command'),
            {
                command: '@command'
            },
            {
                executeCommand: {
                    method: 'GET'
                }
            }
        );
    };

    varInterfaceUtill.systemService = function (resource, appHttp) {
        return resource(
            appHttp.getAppHttpUrl('/system/:command'),
            {
                command: '@command'
            },
            {
                executeCommand: {
                    method: 'GET'
                }
            }
        );
    };

    varInterfaceUtill.resourceService = function (_entityEditService, _systemService, _securityService, _operationService) {

        var entityEditService = _entityEditService;
        var systemService = _systemService;
        var securityService = _securityService;
        var operationService = _operationService;

        return {
            getEntityEditService: function () {
                return entityEditService;
            },
            getSystemService: function () {
                return systemService;
            },
            getSecurityService: function () {
                return securityService;
            },
            getOperationService: function () {
                return operationService;
            }
        };
    };

})(window);