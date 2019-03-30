package com.service.reportGenerators;

import com.service.fileGenerators.*;
import freemarker.template.Configuration;
import freemarker.template.Template;

import java.io.File;
import java.io.IOException;
import java.util.Map;

public abstract class ReportPDF implements Report{
    private String reportName = "";
    private String reportPath;

    protected Configuration freemarkerConfig;
    protected PhantomjsConfig phantomjsConfig;
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

        File pdfFile = null;

        try {

            Template freemarkerTemplate = freemarkerConfig.getTemplate(getReportName()+".ftl");
            System.out.println(freemarkerTemplate.getName());

            IFileGenerator htmlFileGenerator = new FileGeneratorFreeMarker(this, freemarkerTemplate);
            File htmlFile = htmlFileGenerator.getFile();

            PhantomjsProperties phantomjsProperties = phantomjsConfig.getProperties(getReportName(), htmlFile);
            IFileGenerator pdfFileGenerator = new FileGeneratorPhantomjs(phantomjsProperties);
            pdfFile = pdfFileGenerator.getFile();

            if(pdfFile.exists()) {
                setReportPath(pdfFile.getPath());
            }

        } catch (IOException e) {

            e.printStackTrace();

        }

        return pdfFile;
    }

    abstract public void buildModel();

}
