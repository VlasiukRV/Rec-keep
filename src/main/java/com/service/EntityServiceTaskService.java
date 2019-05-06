package com.service;

import com.dao.ServiceTaskRepository;
import com.entity.ServiceTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class EntityServiceTaskService extends EntityBaseService<ServiceTask, Integer, ServiceTaskRepository> {
    @Autowired
    public EntityServiceTaskService(ServiceTaskRepository serviceTaskRepository) {
        super(ServiceTask.class, serviceTaskRepository);
    }
}
