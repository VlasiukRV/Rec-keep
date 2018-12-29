;
(function (exp) {
    if (!exp.moduleUI) {
        exp.moduleUI = new Object(null);
    }
    var moduleUI = exp.moduleUI;

    moduleUI.securityService = function (resource, appEnvironment) {
        return resource(
            appEnvironment.getAppHttpUrl('/system/security/:command'),
            {
                sessionID: "@sessionID"
            },
            {
                getAllPrincipals: {
                    method: "GET",
                    params: {
                        command: "getAllPrincipals"
                    }
                },
                getSessionInformation: {
                    method: "GET",
                    params: {
                        command: "getSessionInformation"
                    }
                },
                getAllSessionsInformation: {
                    method: "GET",
                    params: {
                        command: "getAllSessionsInformation"
                    }
                },

            }
        );
    };

    moduleUI.operationService = function (resource, appEnvironment) {
        return resource(
            appEnvironment.getAppHttpUrl('/service/:command'),
            {
                command: "@command"
            },
            {
                executeCommand: {
                    method: "GET"
                }
            }
        );
    };

    moduleUI.systemService = function (resource, appEnvironment) {
        return resource(
            appEnvironment.getAppHttpUrl('/system/:command'),
            {
                command: "@command"
            },
            {
                executeCommand: {
                    method: "GET"
                }
            }
        );
    };


})(window);