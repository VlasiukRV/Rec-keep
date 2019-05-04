package com.approom.tasklist.service;

import com.approom.tasklist.dao.TaskRepository;
import com.approom.tasklist.entity.Task;
import com.service.EntityBaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class EntityTaskService extends EntityBaseService<Task, Integer, TaskRepository> {
    @Autowired
    public EntityTaskService(TaskRepository taskRepository) {
        super(Task.class, taskRepository);
    }

    // Test
    public List<Task> getAll(){
        List<Task> tasks = super.getAll();
        tasks.forEach(Task::getExecutor);
        return tasks;
    }
}
