package com.controller;

import com.service.taskManager.TaskManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
@RequestMapping("/appTaskList/system/taskScheduler")
public class TaskManagerController {
    @Autowired
    private TaskManager taskManager;

    @RequestMapping("/createTask")
    @ResponseBody
    public Map<String, Object> createTask(String taskName, Map<String, String> taskVariable) {
        if (taskManager.createTaskEntity(taskName, taskVariable)) {
            return AjaxResponse.successResponse("Task '" + taskName + "' created");
        } else {
            return AjaxResponse.successResponse("Failed to create task '" + taskName + "' (......)");
        }
    }

    @RequestMapping("/executeTask")
    @ResponseBody
    public Map<String, Object> executeTask(Integer taskId) {
        if (taskManager.executeTaskEntity(taskId)) {
            return AjaxResponse.successResponse("Task '" + taskId + "' run on execute");
        } else {
            return AjaxResponse.successResponse("Failed task execute '" + taskId + "' (......)");
        }
    }

    @RequestMapping("/interruptTask")
    @ResponseBody
    public Map<String, Object> interruptTask(Integer taskId) {
        if (taskManager.interruptTaskEntity(taskId)) {
            return AjaxResponse.successResponse("Task '" + taskId + "' interrupted");
        } else {
            return AjaxResponse.successResponse("Failed to interrupt task '" + taskId + "' (......)");
        }
    }

    @RequestMapping("/startTasksExecute")
    @ResponseBody
    public Map<String, Object> startTasksExecute(){
        taskManager.startTasksExecute();
        return AjaxResponse.successResponse("Done");
    }

    @RequestMapping("/interruptTaskExecutor")
    @ResponseBody
    public Map<String, Object> interruptTaskExecutor(){
        taskManager.interruptTaskExecutor();
        return AjaxResponse.successResponse("Done");
    }

}
