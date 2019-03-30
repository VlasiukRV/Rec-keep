package com.approom.tasklist.service.report;

import java.io.File;
import java.util.Map;

public interface Report {
    String getReportName();
    Map<String, Object> getModel();
    void setModel(Map<String, Object> model);
    void setReportName(String reportName);
    File getReport();
    String getReportPath();
    void setReportPath(String reportPath);
}
