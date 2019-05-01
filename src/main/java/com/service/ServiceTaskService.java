package com.service;

import com.dao.ServiceTaskRepository;
import com.entity.ServiceTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceTaskService extends BaseEntityService<ServiceTask, Integer, ServiceTaskRepository> {
    @Autowired
    public ServiceTaskService(ServiceTaskRepository serviceTaskRepository) {
        super(ServiceTask.class, serviceTaskRepository);
    }
}
