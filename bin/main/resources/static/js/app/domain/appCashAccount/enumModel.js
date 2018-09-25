;
(function (appInitialization) {

    appInitialization.initEnumsModel = function(){
    var EnumCashFlowItemType = new appInitialization.abstractAppModel.Enum;
    var metadataEnumSpecification_CashFlowItemType = {
        enumClass: EnumCashFlowItemType,
        metadataName: "cashFlowItemType"
    };

    appInitialization.metadataSpecifications.enums.push(metadataEnumSpecification_CashFlowItemType);

    return appInitialization;
};

})(appService.appInitialization);