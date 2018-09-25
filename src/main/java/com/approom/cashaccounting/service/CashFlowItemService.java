package com.approom.cashaccounting.service;

import com.approom.cashaccounting.dao.CashFlowItemRepository;
import com.approom.cashaccounting.entity.CashFlowItem;
import com.service.BaseEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class CashFlowItemService extends BaseEntityService<CashFlowItem, Integer, CashFlowItemRepository> {
    @Autowired
    public CashFlowItemService(CashFlowItemRepository cashFlowItemRepository) {
        super(CashFlowItem.class, cashFlowItemRepository);
    }
}
