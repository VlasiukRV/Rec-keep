package com.approom.tasklist.service;

import com.service.pdfBuilder.IReportBuilder;
import com.service.pdfBuilder.ReportBuilderPhantomjs;
import com.service.taskScheduler.AbstractServiceTask;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;

public class ServiceTaskCreateReport extends AbstractServiceTask {

    private static final Logger logger = LoggerFactory.getLogger(ServiceTaskCreateReport.class);

    public ServiceTaskCreateReport() {
        super();
        setTaskName("CreateReport");
    }

    @Override
    protected boolean runServiceTask() {

        IReportBuilder report = new ReportBuilderPhantomjs();

        try {
            File reportPDF= report.getPDF();
            if(reportPDF.exists()) {
                logger.info("Created repot: " + reportPDF.getPath()+reportPDF.getName());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        setExecute(true);
        return true;
    }

}
