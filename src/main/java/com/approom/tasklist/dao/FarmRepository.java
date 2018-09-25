package com.approom.tasklist.dao;

import com.approom.tasklist.entity.Farm;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FarmRepository extends CrudRepository<Farm, Integer>, CastomFarmRepository {
}
