package com.approom.cashaccounting.dao;

import com.approom.cashaccounting.entity.CashFlowItem;
import org.springframework.data.repository.CrudRepository;

public interface CashFlowItemRepository extends CrudRepository<CashFlowItem, Integer>, CastomCashFlowItemRepository {
}
