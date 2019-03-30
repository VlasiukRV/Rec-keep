package com.approom.tasklist.service.report;

import com.service.reportBuilder.IReportBuilder;
import com.service.reportBuilder.ReportBuilderFreeMarker;
import com.service.reportBuilder.ReportBuilderPhantomjs;
import freemarker.template.Configuration;
import freemarker.template.Template;

import java.io.File;
import java.io.IOException;
import java.util.Map;

public abstract class ReportPDF implements Report{
    private String reportName = "";
    private String reportPath;

    protected Configuration freemarkerConfig;
    protected Map<String, Object> model;

    @Override
    public void setReportName(String reportName){
        this.reportName = reportName;
    }

    @Override
    public String getReportName() {
        return reportName;
    }

    @Override
    public Map<String, Object> getModel() {
        return model;
    }

    @Override
    public void setModel(Map<String, Object> model) {
        this.model = model;
    }

    @Override
    public String getReportPath() {
        return reportPath;
    }

    @Override
    public void setReportPath(String reportPath) {
        this.reportPath = reportPath;
    }

    @Override
    public File getReport() {
        buildModel();

        File reportPDF = null;

        try {

            Template freemarkerTemplate = freemarkerConfig.getTemplate(getReportName()+".ftl");
            System.out.println(freemarkerTemplate.getName());

            ReportBuilderFreeMarker htmlReportBuilder = new ReportBuilderFreeMarker(this, freemarkerTemplate);
            File htmlReport = htmlReportBuilder.getReport();

            IReportBuilder reportBuilder = new ReportBuilderPhantomjs(htmlReport);
            reportPDF = reportBuilder.getReport();

            if(reportPDF.exists()) {
                setReportPath(reportPDF.getPath());
            }

        } catch (IOException e) {

            e.printStackTrace();

        }

        return reportPDF;
    }

    abstract public void buildModel();

}
