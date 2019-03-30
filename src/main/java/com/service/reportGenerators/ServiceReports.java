package com.service.reportGenerators;

import com.approom.tasklist.service.report.ReportPDFRecordKeepingCalendar;
import com.service.fileGenerators.PhantomjsConfig;
import freemarker.template.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceReports {

    @Autowired
    private Configuration freemarkerConfig;
    @Autowired
    private PhantomjsConfig phantomjsConfig;

    public Report getReport(String reportName) {

        freemarkerConfig.setClassForTemplateLoading(this.getClass(), "/reportBuilder");

        Report report = new ReportPDFRecordKeepingCalendar(freemarkerConfig, phantomjsConfig);

        return report;
    }
}
