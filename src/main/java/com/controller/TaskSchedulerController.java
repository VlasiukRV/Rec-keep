package com.controller;

import com.approom.tasklist.service.ServiceTaskArchiveTask;
import com.approom.tasklist.service.ServiceTaskSendMailForAuthor;
import com.approom.tasklist.service.TaskService;
import com.approom.tasklist.service.report.Report;
import com.approom.tasklist.service.report.ServiceReports;
import com.service.MailSender;
import com.service.ServiceTaskCreateReport;
import com.service.taskScheduler.TaskScheduler;
import freemarker.template.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
@RequestMapping("/appTaskList/system/taskScheduler")
public class TaskSchedulerController {
    @Autowired
    private TaskService taskService;

    @Autowired
    private ServiceReports serviceReports;

    @Autowired
    private TaskScheduler taskExecutor;
    @Autowired
    private Configuration freemarkerConfig;
    @Autowired
    private TaskService entityService;
    @Autowired
    private MailSender appMailSender;

    @RequestMapping("/runCreateReport")
    @ResponseBody
    public Map<String, Object> runCreateReport(){
        Report report = serviceReports.getReport("RecordKeepingCalendar");
        taskExecutor.putTask(new ServiceTaskCreateReport(report));
        return AjaxResponse.successResponse("Done");
    }

    @RequestMapping("/stopCreateReport")
    @ResponseBody
    public Map<String, Object> stopCreateReport(){
        taskExecutor.interruptTask("CreateReport");
        return AjaxResponse.successResponse("Done");
    }

    @RequestMapping("/runArchiveService")
    @ResponseBody
    public Map<String, Object> runArchiveService(){
        taskExecutor.putTask(new ServiceTaskArchiveTask(taskService));
        return AjaxResponse.successResponse("Done");
    }

    @RequestMapping("/stopArchiveService")
    @ResponseBody
    public Map<String, Object> stopArchiveService(){
        taskExecutor.removeTask("ArchiveService");
        return AjaxResponse.successResponse("Done");
    }

    @RequestMapping("/sendMail")
    @ResponseBody
    public Map<String, Object> sendMail(){
        taskExecutor.putTask(new ServiceTaskSendMailForAuthor(entityService, appMailSender, freemarkerConfig));
        return AjaxResponse.successResponse("Done");
    }
    @RequestMapping("/stopSendMail")
    @ResponseBody
    public Map<String, Object> stopSendMail(){
        taskExecutor.removeTask("MailSendService");
        return AjaxResponse.successResponse("Done");
    }

    @RequestMapping("/interruptTaskExecutor")
    @ResponseBody
    public Map<String, Object> interruptTaskExecutor(){
        taskExecutor.interrupt();
        return AjaxResponse.successResponse("Done");
    }

}
