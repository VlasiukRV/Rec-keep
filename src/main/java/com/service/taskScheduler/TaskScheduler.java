package com.service.taskScheduler;

import com.entity.ServiceTask;
import com.service.taskManager.TaskManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Service
public class TaskScheduler extends Thread{

    @Autowired
    private TaskManager taskManager;

    private int MAX_RUNNING_TASK = 5;
    private int runningTaskCount;
    private volatile Map<Integer, IServiceTask> taskPool = new HashMap<>();

    private static final Logger logger = LoggerFactory.getLogger(TaskScheduler.class);

    public TaskScheduler(){

    }

    public Boolean putTaskToSchedulerQueue(ServiceTask taskEntity) {
        if(taskPool.containsKey(taskEntity.getId())) {
            return false;
        }

        taskPool.put(taskEntity.getId(), null);

        runService();
        return true;
    }

    public IServiceTask getTaskById (Integer serviceTaskId){
        if(taskPool.containsKey(serviceTaskId)) {
            return taskPool.get(serviceTaskId);
        }
        return null;
    }

    public Boolean removeTask(Integer serviceTaskId){
        taskPool.remove(serviceTaskId);
        interruptTask(serviceTaskId);
        return true;
    }

    public Boolean interruptTask(Integer serviceTaskId){
        return interruptTask(getTaskById(serviceTaskId));
    }

    public Boolean interruptTask(IServiceTask serviceTask){
        if(serviceTask != null){
            serviceTask.stopTask();
            return true;
        }
        return false;
    }

    public void runService(){
        if (!isAlive()){
            start();
        }
    }

    @Override
    public void run() {
        logger.info("Task executor run");
        do {
            if (Thread.interrupted())
            {
                interruptTasks();
                break;
            }

            Set<Integer> tasksId = taskPool.keySet();
            for (Integer taskId : tasksId) {
                IServiceTask task = taskPool.get(taskId);
                if(task == null) {
                    task = taskManager.getNewTask(taskId);
                    taskPool.put(taskId, task);
                }
                if (task != null) {
                    handleTask(taskId);
                }
            }

            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                break;
            }
        }
        while (true);
        interruptTasks();
        logger.info("Task executor stop");
    }

    private void handleTask(Integer taskId){
        IServiceTask task = taskPool.get(taskId);
        ServiceTask taskEntity = taskManager.getTaskEntity(taskId);

        if(!task.isRun()){
            if (runningTaskCount <= MAX_RUNNING_TASK) {
                task.start();
                taskManager.setTaskRunProperties(taskEntity);
                runningTaskCount++;
            }
        }else if (task.isExecute()){
            removeTask(taskId);
            taskEntity.setTaskResult(task.getTaskResult());
            taskManager.setTaskExecuteProperties(taskEntity);
            runningTaskCount--;
        }
        logger.info("Tasks running:"+runningTaskCount);
    }

    private void interruptTasks() {
        Set<Integer> tasksId = taskPool.keySet();
        for (Integer taskId : tasksId) {
            interruptTask(taskId);
        }

    }
}
