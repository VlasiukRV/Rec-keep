package com.approom.tasklist.service;

import com.approom.tasklist.entity.Farm;
import com.approom.tasklist.dao.FarmRepository;
import com.service.EntityBaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class EntityFarmService extends EntityBaseService<Farm, Integer, FarmRepository> {
    @Autowired
    public EntityFarmService(FarmRepository farmRepository) {
        super(Farm.class, farmRepository);
    }
}
