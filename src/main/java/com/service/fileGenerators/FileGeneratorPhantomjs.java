package com.service.fileGenerators;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Paths;

public class FileGeneratorPhantomjs implements IFileGenerator {

    PhantomjsProperties phantomjsProperties;

    public FileGeneratorPhantomjs(PhantomjsProperties phantomjsProperties) {
        this.phantomjsProperties = phantomjsProperties;
    }

    @Override
    public File getFile() throws IOException {

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
        File pdfReport = File.createTempFile(phantomjsProperties.getFilePrefix(), ".pdf");

        // Get JS config file
        URL configFileUrl = this.getClass().getResource(phantomjsProperties.phantomjsConfig.PHANTOMJS_CONFIG_FILE);
        File configFile = Paths.get(configFileUrl.toURI()).toFile();

        ProcessBuilder renderProcess = new ProcessBuilder(
                phantomjsProperties.phantomjsConfig.PATH_PHANTOMJS,
                configFile.getAbsolutePath(),
                phantomjsProperties.getHtmlFile().getAbsolutePath(),
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

