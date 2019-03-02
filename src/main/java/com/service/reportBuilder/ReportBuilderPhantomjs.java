package com.service.reportBuilder;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Paths;

public class ReportBuilderPhantomjs implements IReportBuilder {

    private File htmlReport;

    private static final String PDF_REPORT_PREF = "pdfReport";

    private static final String PHANTOMJS_CONFIG_FILE = "/reportBuilder/configFile.js";
    private static final String PATH_PHANTOMJS =  "C:\\wamp64\\apps\\phantomjs\\bin\\phantomjs";

    public ReportBuilderPhantomjs(File htmlReport) {
        this.htmlReport = htmlReport;
    }

    @Override
    public File getReport() throws IOException {

        File report = null;
        try {
            report = createPdf();
        } catch (URISyntaxException | InterruptedException e) {
            e.printStackTrace();
            throw new IOException(e);
        }

        return report;
    }

    private File createPdf() throws IOException, URISyntaxException, InterruptedException {

        // tmp pdf file for output
        File pdfReport = File.createTempFile(PDF_REPORT_PREF, ".pdf");

        // Get JS config file
        URL configFileUrl = this.getClass().getResource(PHANTOMJS_CONFIG_FILE);
        File configFile = Paths.get(configFileUrl.toURI()).toFile();

        ProcessBuilder renderProcess = new ProcessBuilder(
                PATH_PHANTOMJS,
                configFile.getAbsolutePath(),
                htmlReport.getAbsolutePath(),
                pdfReport.getAbsolutePath()
        );

        Process phantom = renderProcess.start();

        // you need to read phantom.getInputStream() and phantom.getErrorStream()
        // otherwise if they output something the process won't end

        int exitCode = phantom.waitFor();

        if(exitCode != 0){
            // report generation failed
        }
        return pdfReport;
    }

}

