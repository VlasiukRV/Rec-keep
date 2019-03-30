package com.service;

import com.approom.tasklist.service.report.Report;
import com.service.taskScheduler.AbstractServiceTask;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;

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
            logger.info("Created report: " + report.getReportPath());
        }

        setExecute(true);
        return true;
    }

}
