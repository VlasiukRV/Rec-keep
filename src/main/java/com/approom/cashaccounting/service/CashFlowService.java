package com.approom.cashaccounting.service;

import com.approom.cashaccounting.dao.CashFlowRepository;
import com.approom.cashaccounting.entity.CashFlow;
import com.service.BaseEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class CashFlowService extends BaseEntityService<CashFlow, Integer, CashFlowRepository> {
    @Autowired
    public CashFlowService(CashFlowRepository cashFlowRepository) {
        super(CashFlow.class, cashFlowRepository);
    }
}
