package com.approom.cashaccounting.controller;

import com.approom.cashaccounting.entity.CashFlowItemType;
import com.controller.AjaxResponse;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(value = "/appCashAccounting/entity/enum")
public class EnumsCashFlowController {
    @RequestMapping(value = "/{entityId}")
    public Map<String, Object> getEnumValues(@PathVariable("entityId")String enumName){

        Enum[] enumValues = null;
        if(enumName.equals("cashFlowItemType")){
            enumValues = CashFlowItemType.values();
        }

        return AjaxResponse.successResponse(enumValues);
    }

}
