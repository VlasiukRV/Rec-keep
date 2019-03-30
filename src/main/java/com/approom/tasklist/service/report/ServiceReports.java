package com.approom.tasklist.service.report;

import freemarker.template.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceReports {

    @Autowired
    private Configuration freemarkerConfig;

    public Report getReport(String reportName) {

        freemarkerConfig.setClassForTemplateLoading(this.getClass(), "/mailTemplates");

        Report report = new ReportPDFRecordKeepingCalendar(freemarkerConfig);

        return report;
    }
}
