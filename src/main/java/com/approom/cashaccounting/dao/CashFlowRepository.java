package com.approom.cashaccounting.dao;

import com.approom.cashaccounting.entity.CashFlow;
import org.springframework.data.repository.CrudRepository;

public interface CashFlowRepository extends CrudRepository<CashFlow, Integer>, CastomCashFlowRepository {
}
