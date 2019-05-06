package com.service.taskManager;

import com.approom.tasklist.service.EntityTaskService;
import com.approom.tasklist.service.ServiceTaskArchiveTask;
import com.approom.tasklist.service.ServiceTaskSendMailForAuthor;
import com.entity.ServiceTask;
import com.entity.User;
import com.service.EntityServiceTaskService;
import com.service.EntityUserService;
import com.service.MailSender;
import com.service.SecurityService;
import com.service.reportGenerators.Report;
import com.service.reportGenerators.ServiceReports;
import com.service.reportGenerators.ServiceTaskCreateReport;
import com.service.taskScheduler.IServiceTask;
import com.service.taskScheduler.TaskScheduler;
import freemarker.template.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.Objects.nonNull;

@Service
public class TaskManager {

    @Autowired
    private SecurityService securityService;

    @Autowired
    private EntityServiceTaskService entityServiceTaskService;

    @Autowired
    private EntityUserService entityUserService;

    @Autowired
    private TaskScheduler taskExecutor;

    @Autowired
    private ServiceReports serviceReports;
    @Autowired
    private EntityTaskService taskService;
    @Autowired
    private Configuration freemarkerConfig;
    @Autowired
    private EntityTaskService entityService;
    @Autowired
    private MailSender appMailSender;

    public Boolean createTaskEntity(String taskName, Map<String, String> taskVariable) {
        ServiceTask serviceTask = new ServiceTask();

        return setTaskCreateProperties(serviceTask, taskName, taskVariable);
    }

    public Boolean executeTaskEntity(Integer taskId) {
        return this.executeTaskEntity(getTaskEntity(taskId));
    }

    public Boolean interruptTaskEntity(Integer taskId) {
        ServiceTask taskEntity = getTaskEntity(taskId);
        setTaskNotExecuteProperties(taskEntity);
        return taskExecutor.interruptTask(taskId);
    }

    public void interruptTaskExecutor() {
        taskExecutor.interrupt();
    }


    public void startTasksExecute() {
        List<ServiceTask> taskEntities = entityServiceTaskService.getAll();
        for (ServiceTask taskEntity : taskEntities) {
            if(taskEntity.getTaskRunDate() == null) {
                executeTaskEntity(taskEntity.getId());
            }
        }
    }

    public ServiceTask getTaskEntity(Integer taskId) {
        ServiceTask taskEntity = entityServiceTaskService.getEntityById(taskId);
        return taskEntity;
    }

    public Boolean executeTaskEntity(ServiceTask taskEntity) {
        return taskExecutor.putTaskToSchedulerQueue(taskEntity);
    }

    public IServiceTask getNewTask(Integer taskId) {
        ServiceTask taskEntity = getTaskEntity(taskId);
        return getNewTask(taskEntity);
    }

    public IServiceTask getNewTask(ServiceTask serviceTask) {
        IServiceTask task = null;
        switch (serviceTask.getTaskName()) {
            case ("CreateReport"): {
                String reportName = serviceTask.getTaskVariable().get("reportName");

                Report report = serviceReports.getReport(reportName);
                task = new ServiceTaskCreateReport(report);
                break;
            }
            case ("ArchiveService"): {
                task = new ServiceTaskArchiveTask(taskService);
                break;
            }
            case ("MailSendService"): {
                task = new ServiceTaskSendMailForAuthor(entityService, appMailSender, freemarkerConfig);
            }
        }
        if(nonNull(task)) {
            task.setTaskResult(serviceTask.getTaskResult());
        }
        return task;
    }

    public Boolean setTaskCreateProperties(ServiceTask taskEntity, String taskName, Map<String, String> taskVariable) {
        taskEntity.setTaskName(taskName);
        taskEntity.setTaskVariable(taskVariable);
        taskEntity.setUser(this.getUser());

        return this.saveTaskEntity(taskEntity);
    }

    public Boolean setTaskRunProperties(ServiceTask taskEntity) {
        taskEntity.setTaskRunDate(new Date());
        return this.saveTaskEntity(taskEntity);
    }

    public Boolean setTaskExecuteProperties(ServiceTask taskEntity) {
        taskEntity.setTaskExecuteDate(new Date());
        return this.saveTaskEntity(taskEntity);
    }

    public Boolean setTaskNotExecuteProperties(ServiceTask taskEntity) {
        taskEntity.setTaskExecuteDate(null);
        taskEntity.setTaskResult(new HashMap<>());
        taskEntity.setUserGotNotificationDate(false);
        return this.saveTaskEntity(taskEntity);
    }

    private Boolean saveTaskEntity(ServiceTask serviceTask) {
        try {
            entityServiceTaskService.saveEntity(serviceTask);
        }catch (Exception e){
            return  false;
        }
        return true;
    }

    private User getUser() {
        return entityUserService.getUserByName(securityService.getUser().getUsername());
    }

}
