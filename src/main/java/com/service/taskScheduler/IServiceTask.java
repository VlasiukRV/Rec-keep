package com.service.taskScheduler;

import java.util.Map;

public interface IServiceTask{
    String getTaskName();
    Boolean isExecute();
    Boolean isRun();
    void start();
    void stopTask();

    Map<String, String> getTaskResult();
    void setTaskResult(Map<String, String> taskResult);
}
