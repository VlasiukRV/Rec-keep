package com.approom.tasklist.dao;

import com.approom.tasklist.entity.Farm;
import com.dao.EntityRepositoryCastomImpl;
import org.springframework.stereotype.Repository;

@Repository
public class FarmRepositoryImpl extends EntityRepositoryCastomImpl<Farm> implements CastomFarmRepository{
}
