package com.service.fileGenerators;

import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class PhantomjsConfig {

    public static final String PHANTOMJS_CONFIG_FILE = "/reportBuilder/configFile.js";
    public static final String PATH_PHANTOMJS =  "C:\\wamp64\\apps\\phantomjs\\bin\\phantomjs";

    public PhantomjsProperties getProperties(String filePrefix, File htmlFile) {
        PhantomjsProperties phantomjsProperties =  new PhantomjsProperties(filePrefix, htmlFile);
        phantomjsProperties.phantomjsConfig = this;

        return phantomjsProperties;
    }
}
