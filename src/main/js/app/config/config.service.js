;
(function (exp) {
    if (!exp.moduleConfig) {
        exp.moduleConfig = new Object(null);
    }
    var moduleConfig = exp.moduleConfig;

    moduleConfig.appEnvironment = function ($location, appConfig) {
        var location = $location;
        return {
            getAppHttpUrl: function getAppHttpUrl(urlSuffix) {
                var appAddress = "http://" + location.$$host + ":" + location.$$port;

                return appAddress + "/" + appConfig.appName + urlSuffix;
            }
        };
    };

})(window);