package com.approom.tasklist.service;

import com.itextpdf.text.DocumentException;
import com.service.pdfBuilder.ReportPDFBuilder;
import com.service.taskScheduler.AbstractServiceTask;

import java.io.IOException;

public class ServiceTaskCreateReport extends AbstractServiceTask {

    public ServiceTaskCreateReport() {
        super();
        setTaskName("CreateReport");
    }

    @Override
    protected boolean runServiceTask() {

        ReportPDFBuilder pdfBuilder = new ReportPDFBuilder();

        try {
            pdfBuilder.getPDF();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (DocumentException e) {
            e.printStackTrace();
        }

        return true;
    }

}
