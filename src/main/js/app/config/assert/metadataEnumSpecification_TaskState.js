;
(function (exp) {
    if (!exp.moduleConfig) {
        exp.moduleConfig = new Object(null);
    }
    var moduleConfig = exp.moduleConfig;

    moduleConfig.metadataEnumSpecification_TaskState = function (Enum) {
        var EnumTaskState = new Enum();

        return {
            enumClass: EnumTaskState,
            metadataName: 'taskState'
        };
    }

})(window);