package com.approom.tasklist.service;

import com.service.pdfBuilder.IReportBuilder;
import com.service.pdfBuilder.ReportBuilderPhantomjs;
import com.service.taskScheduler.AbstractServiceTask;

import java.io.IOException;

public class ServiceTaskCreateReport extends AbstractServiceTask {

    public ServiceTaskCreateReport() {
        super();
        setTaskName("CreateReport");
    }

    @Override
    protected boolean runServiceTask() {

        IReportBuilder report = new ReportBuilderPhantomjs();

        try {
            report.getPDF();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return true;
    }

}
