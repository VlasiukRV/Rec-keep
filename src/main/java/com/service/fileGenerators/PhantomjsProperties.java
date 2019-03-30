package com.service.fileGenerators;

import java.io.File;

public class PhantomjsProperties {

    public PhantomjsConfig phantomjsConfig;
    private String filePrefix;
    private File htmlFile;

    public PhantomjsProperties(String filePrefix, File htmlFile) {
        this.filePrefix = filePrefix;
        this.htmlFile = htmlFile;
    }

    public String getFilePrefix() {
        return filePrefix;
    }

    public File getHtmlFile() {
        return htmlFile;
    }

}
