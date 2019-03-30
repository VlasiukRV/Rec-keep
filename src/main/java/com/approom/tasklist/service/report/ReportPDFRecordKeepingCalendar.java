package com.approom.tasklist.service.report;

import com.service.fileGenerators.PhantomjsConfig;
import com.service.reportGenerators.ReportPDF;
import freemarker.template.Configuration;

import java.util.*;

public class ReportPDFRecordKeepingCalendar extends ReportPDF {

    public ReportPDFRecordKeepingCalendar(Configuration freemarkerConfig, PhantomjsConfig phantomjsConfig) {
        this.freemarkerConfig = freemarkerConfig;
        this.phantomjsConfig = phantomjsConfig;

        setReportName("RecordKeepingCalendar");
    }

    @Override
    public void buildModel() {

/*
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
*/

        Map<String, Object> model = new HashMap();

        model.put("date", "31-Jan");

        List<String> fieldsTitle = new ArrayList<>();
        fieldsTitle.add("DATE");
        fieldsTitle.add("Mortality");
        fieldsTitle.add("Egg Production");
        model.put("fieldsTitle", fieldsTitle);
        List<List> entities = new ArrayList<>();
        entities.add(Arrays.asList("1", "0", 4107));
        entities.add(Arrays.asList("2", "1", 4280));
        entities.add(Arrays.asList("3", "0", 4254));
        entities.add(Arrays.asList("4", "0", 4185));
        entities.add(Arrays.asList("5", "2", 4065));
        entities.add(Arrays.asList("6", "0", 4152));
        entities.add(Arrays.asList("7", "1", 4285));
        entities.add(Arrays.asList("8", "0", 4107));
        entities.add(Arrays.asList("9", "1", 4280));
        entities.add(Arrays.asList("10", "0", 4254));
        entities.add(Arrays.asList("11", "0", 4185));
        entities.add(Arrays.asList("12", "2", 4065));
        entities.add(Arrays.asList("13", "0", 4152));
        entities.add(Arrays.asList("14", "1", 4285));
        entities.add(Arrays.asList("15", "0", 4107));
        entities.add(Arrays.asList("16", "1", 4280));
        entities.add(Arrays.asList("17", "0", 4254));
        entities.add(Arrays.asList("18", "0", 4185));
        entities.add(Arrays.asList("19", "2", 4065));
        entities.add(Arrays.asList("20", "0", 4152));
        entities.add(Arrays.asList("21", "1", 4285));
        entities.add(Arrays.asList("22", "0", 4107));
        entities.add(Arrays.asList("23", "1", 4280));
        entities.add(Arrays.asList("24", "0", 4254));
        entities.add(Arrays.asList("25", "0", 4185));
        entities.add(Arrays.asList("26", "2", 4065));
        entities.add(Arrays.asList("27", "0", 4152));
        entities.add(Arrays.asList("28", "1", 4285));
        entities.add(Arrays.asList("29", "0", 4185));
        entities.add(Arrays.asList("30", "2", 4065));
        entities.add(Arrays.asList("21", "0", 4152));

        model.put("entities", entities);
        setModel(model);
    }
}
