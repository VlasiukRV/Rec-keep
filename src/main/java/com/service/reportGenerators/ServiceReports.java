package com.service.reportGenerators;

import com.approom.tasklist.service.EntityPoultryCalendarService;
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
    @Autowired
    private EntityPoultryCalendarService poultryCalendarService;

    public Report getReport(String reportName) {

        freemarkerConfig.setClassForTemplateLoading(this.getClass(), "/reportBuilder");

        Report report = null;
        switch (reportName) {
            case ("RecordKeepingCalendar"): {
                ReportPDFRecordKeepingCalendar reportRecordKeepingCalendar = new ReportPDFRecordKeepingCalendar(freemarkerConfig, phantomjsConfig);
                reportRecordKeepingCalendar.setPoultryCalendarService(poultryCalendarService);

                report = reportRecordKeepingCalendar;
                break;
            }
        }

        return report;
    }
}
