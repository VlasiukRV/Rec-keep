package com.dao;

import com.entity.ServiceTask;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceTaskRepository extends CrudRepository<ServiceTask, Integer>, CastomServiceTaskRepository {
}
