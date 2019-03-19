package com.approom.tasklist.service;

import com.entity.Field;
import com.service.UserService;
import com.service.reportBuilder.IReportBuilder;
import com.service.reportBuilder.ReportBuilderFreeMarker;
import com.service.reportBuilder.ReportBuilderPhantomjs;
import com.service.taskScheduler.AbstractServiceTask;
import freemarker.template.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ServiceTaskCreateReport extends AbstractServiceTask {

    @Autowired
    protected UserService entityService;
    @Autowired
    private Configuration freemarkerConfig;

    private static final Logger logger = LoggerFactory.getLogger(AbstractServiceTask.class);

    public ServiceTaskCreateReport(Configuration freemarkerConfig) {
        super();
        setTaskName("CreateReport");
        this.freemarkerConfig = freemarkerConfig;
    }

    @Override
    protected boolean runServiceTask() {

        Map<String, Object> model = getModel();

        try {
            ReportBuilderFreeMarker htmlReportBuilder = new ReportBuilderFreeMarker(model, freemarkerConfig);
            File htmlReport = htmlReportBuilder.getReport();
            IReportBuilder reportBuilder = new ReportBuilderPhantomjs(htmlReport);

            File reportPDF = reportBuilder.getReport();
            if (reportPDF.exists()) {
                logger.info("Created repot: " + reportPDF.getPath() + reportPDF.getName());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        setExecute(true);
        return true;
    }

    private Map<String, Object> getModel() {

        List<Field> fields = new ArrayList<>();
        fields.add(new Field("username", "User Name"));
        fields.add(new Field("mailAddress", "Mail Address"));

        List<Map<String, Object>> entities = new ArrayList<>();

        Map<String, Object> user1 = new HashMap<>();
        user1.put("name", "Roma");
        user1.put("mailAddress", "Roma@gmail.com\"");
        entities.add(user1);

        Map<String, Object> model = new HashMap();
        model.put("fields", fields);
        model.put("entities", entities);

        return model;
    }

}
