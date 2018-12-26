package com.service.taskScheduler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Service
public class TaskScheduler extends Thread{

    private int MAX_RUNNING_TASK = 5;
    private int runningTaskCount;
    private volatile Map<String, IServiceTask> taskPool = new HashMap<>();

    private static final Logger logger = LoggerFactory.getLogger(TaskScheduler.class);

    public TaskScheduler(){

    }

    public Boolean putTask(IServiceTask serviceTask){
        String taskName = serviceTask.getTaskName();
        if(taskPool.containsKey(taskName)) {
            return false;
        }

        taskPool.put(taskName, serviceTask);

        runService();
        return true;
    }

    public IServiceTask getTaskByName(String taskName){
        if(taskPool.containsKey(taskName)) {
            return taskPool.get(taskName);
        }
        return null;
    }

    public Boolean removeTask(String serviceTaskName){
        removeTask(getTaskByName(serviceTaskName));
        return true;
    }

    public Boolean removeTask(IServiceTask serviceTask){
        String taskName = serviceTask.getTaskName();
        taskPool.remove(taskName);
        interruptTask(serviceTask);
        logger.info("Removed task: "+taskName);
        return true;
    }

    public void interruptTask(String serviceTaskName){
        interruptTask(getTaskByName(serviceTaskName));
    }

    public void interruptTask(IServiceTask serviceTask){
        if(serviceTask != null){
            serviceTask.stopTask();
        }
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
            if (Thread.interrupted())    //Проверка прерывания
            {
                interruptTasks();
                break;
            }

            Set<String> tasksName = taskPool.keySet();
            for (String taskName : tasksName) {
                handleTask(taskPool.get(taskName));
            }

            try {
                Thread.sleep(5000);        //Приостановка потока на 1 сек.
            } catch (InterruptedException e) {
                break;    //Завершение потока после прерывания
            }
        }
        while (true);
        interruptTasks();
        logger.info("Task executor stop");
    }

    private void handleTask(IServiceTask serviceTask){
        if(!serviceTask.isRun()){
            if (runningTaskCount <= MAX_RUNNING_TASK) {
                serviceTask.start();
                runningTaskCount++;
            }
        }else if (serviceTask.isExecute()){
            removeTask(serviceTask);
            runningTaskCount--;
        }
        logger.info("Tasks running:"+runningTaskCount);
    }

    private void interruptTasks() {
        Set<String> tasksName = taskPool.keySet();
        for (String taskName : tasksName) {
            interruptTask(taskName);
        }

    }
}
