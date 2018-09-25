package com.approom.tasklist.service;

import com.approom.tasklist.entity.Farm;
import com.approom.tasklist.dao.FarmRepository;
import com.service.BaseEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class FarmService extends BaseEntityService<Farm, Integer, FarmRepository> {
    @Autowired
    public FarmService(FarmRepository farmRepository) {
        super(Farm.class, farmRepository);
    }
}
