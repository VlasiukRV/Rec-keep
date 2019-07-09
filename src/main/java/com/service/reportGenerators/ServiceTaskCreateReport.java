package com.service.reportGenerators;

import com.service.taskScheduler.AbstractServiceTask;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.util.Map;

public class ServiceTaskCreateReport extends AbstractServiceTask {

    protected Report report;

    private static final Logger logger = LoggerFactory.getLogger(AbstractServiceTask.class);

    public ServiceTaskCreateReport(Report report) {
        super();
        setTaskName("CreateReport");
        this.report = report;
    }

    @Override
    protected boolean runServiceTask() {

        File reportFile = report.getReport();
        if(reportFile.exists()) {
            Map<String, String> taskResult = getTaskResult();
            taskResult.put("fileName", report.getReportPath());
            taskResult.put("fileUrl", "http://localhost:8080/appTaskList/service/download?fileName=" + report.getReportName());
        }

        setExecute(true);
        return true;
    }

}
