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
import java.util.Map;

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

    private User getUser() {
        return entityUserService.getUserByName(securityService.getUser().getUsername());
    }

    public Boolean createTask(String taskName, Map<String, String> taskVariable) {
        ServiceTask serviceTask = new ServiceTask();

        serviceTask.setTaskName(taskName);
        serviceTask.setTaskVariable(taskVariable);
        serviceTask.setUser(this.getUser());

        return this.saveTask(serviceTask);
    }

    public Boolean executeTask(ServiceTask serviceTask) {
        serviceTask.setTaskRunDate(new Date());
        this.saveTask(serviceTask);
        return putTaskToSchedulerQueue(serviceTask);
    }

    private Boolean putTaskToSchedulerQueue(ServiceTask serviceTask) {
        IServiceTask task = getTask (serviceTask);

        return taskExecutor.putTask(task);
    }

    private IServiceTask getTask (ServiceTask serviceTask) {
        switch (serviceTask.getTaskName()) {
            case ("CreateReport"): {
                Report report = serviceReports.getReport("RecordKeepingCalendar");
                return new ServiceTaskCreateReport(report);
            }
            case ("ArchiveService"): {
                return new ServiceTaskArchiveTask(taskService);
            }
            case ("MailSendService"): {
                return new ServiceTaskSendMailForAuthor(entityService, appMailSender, freemarkerConfig);
            }
            default:
                return null;
        }
    }

    private  Boolean saveTask(ServiceTask serviceTask) {
        try {
            entityServiceTaskService.saveEntity(serviceTask);
        }catch (Exception e){
            return  false;
        }
        return true;
    }

}
