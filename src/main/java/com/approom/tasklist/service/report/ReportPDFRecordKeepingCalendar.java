package com.approom.tasklist.service.report;

import com.approom.tasklist.entity.PoultryCalendar;
import com.approom.tasklist.service.EntityPoultryCalendarService;
import com.service.fileGenerators.PhantomjsConfig;
import com.service.reportGenerators.ReportPDF;
import freemarker.template.Configuration;

import java.util.*;

public class ReportPDFRecordKeepingCalendar extends ReportPDF {

    private EntityPoultryCalendarService poultryCalendarService;

    public ReportPDFRecordKeepingCalendar(Configuration freemarkerConfig, PhantomjsConfig phantomjsConfig) {
        this.freemarkerConfig = freemarkerConfig;
        this.phantomjsConfig = phantomjsConfig;

        setReportName("RecordKeepingCalendar");
    }

    public EntityPoultryCalendarService getPoultryCalendarService() {
        return poultryCalendarService;
    }

    public void setPoultryCalendarService(EntityPoultryCalendarService poultryCalendarService) {
        this.poultryCalendarService = poultryCalendarService;
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
        fieldsTitle.add("Dirty Flats");
        fieldsTitle.add("Hi");
        fieldsTitle.add("Lo");
        fieldsTitle.add("Humidity");
        fieldsTitle.add("Time am/pm");
        fieldsTitle.add("Hi");
        fieldsTitle.add("Lo");
        fieldsTitle.add("Water Meter Read");
        fieldsTitle.add("Water Cons");
        fieldsTitle.add("Feed Cons");
        fieldsTitle.add("Floor");
        fieldsTitle.add("Walls/ Fans / Ceiling");
        fieldsTitle.add("Manure");
        fieldsTitle.add("Egg Conv. / Carts");
        fieldsTitle.add("Pack Room");
        fieldsTitle.add("Egg Cooler");
        fieldsTitle.add("Anti Room");
        fieldsTitle.add("Record issues observed");
        fieldsTitle.add("Initial");
        fieldsTitle.add("Record issues observed");
        fieldsTitle.add("Initial");
        model.put("fieldsTitle", fieldsTitle);

        List<List> entities = new ArrayList<>();
        List<PoultryCalendar> poultryCalendars = poultryCalendarService.getAll();
        for (PoultryCalendar poultryCalendar: poultryCalendars) {
            entities.add(Arrays.asList(
                    "1",
                    poultryCalendar.getMortality(),
                    poultryCalendar.getEggProduction(),
                    poultryCalendar.getEggCoolerDirtyFlats(),
                    poultryCalendar.getEggCoolerTemperatureHi(),
                    poultryCalendar.getEggCoolerTemperatureLo(),
                    poultryCalendar.getEggCoolerHumidity(),
                    "8 a.m.",
                    poultryCalendar.getBarnTemperatureHi(),
                    poultryCalendar.getBarnTemperatureLo(),
                    poultryCalendar.getWaterMeterRead(),
                    poultryCalendar.getWaterCons(),
                    poultryCalendar.getFeedCons(),
                    "W",    "", "C",    "W",    "W",    "W",    "W", "Normal","JS","Normal","HB"));
        }
        model.put("entities", entities);

        List<String> activityLogWeeklyTitle = new ArrayList<>();
        activityLogWeeklyTitle.add("TASK");
        activityLogWeeklyTitle.add("Freq.");
        activityLogWeeklyTitle.add("Date");
        activityLogWeeklyTitle.add("Date");
        activityLogWeeklyTitle.add("Date");
        activityLogWeeklyTitle.add("Date");
        model.put("activityLogWeeklyTitle", activityLogWeeklyTitle);

        List<List> activityLogWeeklyEntities = new ArrayList<>();
        activityLogWeeklyEntities.add(Arrays.asList("Water chlorine/peroxide treatment", "Weekly", "5-Jan", "12-Jan JS", "19-Jan JS", "26-Jan JS"));
        activityLogWeeklyEntities.add(Arrays.asList("Check air inlets for obstruction", "Weekly", "5-Jan", "12-Jan", "19-Jan", "26-Jan"));
        activityLogWeeklyEntities.add(Arrays.asList("Check and clean bait stations/traps", "Weekly", "5-Jan", "12-Jan", "19-Jan", "26-Jan"));
        activityLogWeeklyEntities.add(Arrays.asList("Trim weeds/grass around unit (seasonal)", "Weekly", "NA", "NA", "NA", "NA"));
        activityLogWeeklyEntities.add(Arrays.asList("Check garbage receptacles & misc. storage", "Weekly", "5-Jan", "12-Jan", "19-Jan", "26-Jan"));
        activityLogWeeklyEntities.add(Arrays.asList("Clean egg cooler (after egg pick-up)", "Weekly", "5-Jan", "12-Jan", "19-Jan", "26-Jan"));
        activityLogWeeklyEntities.add(Arrays.asList("Replenish handwash station", "Weekly", "5-Jan", "12-Jan", "19-Jan", "26-Jan"));
        activityLogWeeklyEntities.add(Arrays.asList("Replenish solution and clean footbath", "Weekly", "5-Jan", "12-Jan", "19-Jan", "26-Jan"));
        activityLogWeeklyEntities.add(Arrays.asList("Egg Pick-up", "01-Jan", "08-Jan", "15-Jan", "22-Jan", "28-Jan"));
        activityLogWeeklyEntities.add(Arrays.asList("Feed Delivery", "04-Jan", "12-Jan", "17-Jan", "23-Jan", "31-Jan"));
        activityLogWeeklyEntities.add(Arrays.asList("Take feed samples from each load", "04-Jan", "12-Jan", "17-Jan", "23-Jan", "31-Jan"));

        model.put("activityLogWeeklyEntities", activityLogWeeklyEntities);

        List<String> activityLogMonthlyTitle = new ArrayList<>();
        activityLogMonthlyTitle.add("TASK");
        activityLogMonthlyTitle.add("Freq.");
        activityLogMonthlyTitle.add("Date");
        model.put("activityLogMonthlyTitle", activityLogMonthlyTitle);

        List<List> activityLogMonthlyEntities = new ArrayList<>();
        activityLogMonthlyEntities.add(Arrays.asList("Water chlorine/peroxide treatment", "Monthly", "15-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Test water chlorine/peroxide residual if applicable", "Monthly", "15-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Inspect water filters & change as required, waterlines cleaned & flushed", "Monthly", "15-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Check facility lighting equipment", "Monthly", "01-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Check feed bins", "Monthly", "20-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Check floor drains", "Monthly", "20-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Facility and perimeter inspection", "Monthly", "20-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Check stand-by generator, date and initial", "Monthly", "15-Jan JS"));
        activityLogMonthlyEntities.add(Arrays.asList("Test alarms, date and initial", "Monthly", "20-Jan JS"));
        activityLogMonthlyEntities.add(Arrays.asList("Ammonia test (October - March)", "Monthly", "Reading: 10 ppm20-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Salmonella test by MEF", "2/flock", "15-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Calibrate thermomerter", "2/year", "15-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Calibrate medicator or water proportioner", "1/year", "15-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Calibrate scales & metering devices (on-farm feed mill)", "1/year", "20-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Inspect & repair restricted/unrestricted zone", "1/year", "20-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Water test", "1/year", "01-Jan"));
        model.put("activityLogMonthlyEntities", activityLogMonthlyEntities);

        setModel(model);
    }

    //@Override
    public void buildModel_01() {

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
        fieldsTitle.add("Dirty Flats");
        fieldsTitle.add("Hi");
        fieldsTitle.add("Lo");
        fieldsTitle.add("Humidity");
        fieldsTitle.add("Time am/pm");
        fieldsTitle.add("Hi");
        fieldsTitle.add("Lo");
        fieldsTitle.add("Water Meter Read");
        fieldsTitle.add("Water Cons");
        fieldsTitle.add("Feed Cons");
        fieldsTitle.add("Floor");
        fieldsTitle.add("Walls/ Fans / Ceiling");
        fieldsTitle.add("Manure");
        fieldsTitle.add("Egg Conv. / Carts");
        fieldsTitle.add("Pack Room");
        fieldsTitle.add("Egg Cooler");
        fieldsTitle.add("Anti Room");
        fieldsTitle.add("Record issues observed");
        fieldsTitle.add("Initial");
        fieldsTitle.add("Record issues observed");
        fieldsTitle.add("Initial");
        model.put("fieldsTitle", fieldsTitle);

        List<List> entities = new ArrayList<>();
        entities.add(Arrays.asList("1",     1,  4107,   0,  12, 11, 75, "8 a.m.",   23, 21, 8000,   1295,   3610,   "W",    "", "C",    "W",    "W",    "W",    "W", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("2",     1,  4280,   0,  12, 11, 73, "8 a.m.",   22, 21, 9200,   1200,   4120,   "",    "B", "",    "B",    "G",    "",    "", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("3",     0,  4254,   0,  13, 10, 70, "8 a.m.",   22, 21, 10500,  1300,   4640,   "",    "", "",    "",    "",    "",    "", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("4",     0,  4185,   1,  11, 11, 72, "8 a.m.",   22, 21, 11750,  1250,   4940,   "S",    "", "C",    "",    "S",    "C",    "C", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("5",     2,  4065,   0,  13, 12, 72, "8 a.m.",   21, 20, 13150,  1400,   5240,   "",    "", "",    "",    "",    "",    "", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("6",     0,  4152,   0,  13, 12, 73, "9 a.m.",   21, 20, 10500,  1300,   4640,   "",    "", "",    "",    "",    "",    "", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("7",     1,  4285,   1,  12, 11, 74, "9 a.m.",   22, 21, 14450,  1350,   6150,   "W",    "", "C",    "",    "W",    "W",    "W", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("8",     0,  4107,   0,  12, 11, 71, "8 a.m.",   22, 21, 15800,  1275,   6670,   "",    "", "",    "",    "",    "",    "", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("9",     1,  4280,   1,  12, 11, 72, "8 a.m.",   22, 21, 17075,  1312,   7180,   "",    "B", "C",    "B",    "G",    "",    "", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("10",    0,  4254,   0,  13, 11, 74, "8 a.m.",   22, 21, 18387,  1283,   7710,   "S",    "", "",    "",    "S",    "",    "S", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("11",    0,  4185,   0,  12, 11, 75, "8 a.m.",   23, 21, 19670,  1295,   8240,   "",    "", "",    "",    "",    "C",    "", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("12",    2,  4065,   1,  12, 11, 75, "8 a.m.",   23, 21, 10500,  1310,   8770,   "",    "", "C",    "",    "",    "",    "", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("13",    0,  4152,   0,  13, 11, 75, "9 a.m.",   22, 21, 20965,  1350,   9290,   "W",    "", "",    "",    "W",    "",    "W", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("14",    1,  4285,   0,  12, 11, 76, "9 a.m.",   22, 21, 22275,  1375,   9790,   "",    "", "",    "",    "",    "",    "", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("15",    0,  4107,   0,  12, 12, 77, "8 a.m.",   22, 21, 23625,  1425,   10300,   "",    "", "C",    "",    "",    "W",    "", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("16",    1,  4280,   1,  13, 11, 75, "8 a.m.",   22, 21, 25000,  1400,   10810,   "",    "B", "",    "B",    "G",    "",    "", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("17",    0,  4254,   0,  13, 11, 75, "8 a.m.",   21, 20, 26425,  1395,   11360,   "",    "", "",    "",    "",    "",    "", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("18",    0,  4185,   0,  12, 11, 74, "8 a.m.",   21, 20, 27825,  1350,   11860,   "S",    "", "C",    "",    "S",    "",    "S", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("19",    2,  4065,   0,  12, 11, 73, "8 a.m.",   22, 21, 29220,  1300,   12350,   "W",    "", "",    "",    "W",    "C",    "", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("20",    0,  4152,   2,  12, 11, 73, "9 a.m.",   22, 21, 30570,  1325,   12840,   "",    "", "",    "",    "",    "",    "", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("21",    1,  4285,   0,  12, 11, 72, "9 a.m.",   22, 21, 31870,  1325,   13320,   "",    "", "C",    "",    "",    "",    "", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("22",    0,  4107,   0,  12, 11, 74, "8 a.m.",   22, 21, 33195,  1000,   13920,   "W",    "", "",    "",    "W",    "",    "", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("23",    1,  4280,   0,  13, 11, 74, "8 a.m.",   22, 21, 34520,  1595,   14330,   "",    "B", "",    "B",    "G",    "W",    "W", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("24",    0,  4254,   0,  13, 11, 75, "8 a.m.",   22, 21, 35520,  1295,   14905,   "S",    "", "C",    "",    "",    "",    "", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("25",    0,  4185,   0,  12, 10, 76, "8 a.m.",   21, 20, 37115,  1305,   15380,   "",    "", "",    "",    "",    "",    "", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("26",    2,  4065,   0,  12, 11, 74, "9 a.m.",   21, 20, 38410,  1325,   15890,   "W",    "", "C",    "",    "W",    "",    "W", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("27",    0,  4152,   0,  13, 11, 74, "9 a.m.",   22, 21, 39715,  1365,   16465,   "",    "", "",    "",    "",    "C",    "", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("28",    1,  4285,   0,  12, 11, 75, "8 a.m.",   23, 21, 41040,  785,    17040,   "",    "", "",    "",    "",    "",    "", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("29",    0,  4185,   1,  13, 11, 76, "8 a.m.",   23, 21, 42405,  1950,   17580,   "",    "", "C",    "",    "",    "",    "", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("30",    2,  4065,   0,  12, 11, 75, "8 a.m.",   22, 21, 43190,  1325,   18090,   "S",    "", "",    "",    "S",    "",    "S", "Normal","JS","Normal","HB"));
        entities.add(Arrays.asList("31",    0,  4152,   0,  13, 11, 74, "8 a.m.",   23, 21, 45140,  1300,   18600,   "",    "B", "",    "B",    "G",    "W",    "", "Normal","JS","Normal","HB"));
        model.put("entities", entities);

        List<String> activityLogWeeklyTitle = new ArrayList<>();
        activityLogWeeklyTitle.add("TASK");
        activityLogWeeklyTitle.add("Freq.");
        activityLogWeeklyTitle.add("Date");
        activityLogWeeklyTitle.add("Date");
        activityLogWeeklyTitle.add("Date");
        activityLogWeeklyTitle.add("Date");
        model.put("activityLogWeeklyTitle", activityLogWeeklyTitle);

        List<List> activityLogWeeklyEntities = new ArrayList<>();
        activityLogWeeklyEntities.add(Arrays.asList("Water chlorine/peroxide treatment", "Weekly", "5-Jan", "12-Jan JS", "19-Jan JS", "26-Jan JS"));
        activityLogWeeklyEntities.add(Arrays.asList("Check air inlets for obstruction", "Weekly", "5-Jan", "12-Jan", "19-Jan", "26-Jan"));
        activityLogWeeklyEntities.add(Arrays.asList("Check and clean bait stations/traps", "Weekly", "5-Jan", "12-Jan", "19-Jan", "26-Jan"));
        activityLogWeeklyEntities.add(Arrays.asList("Trim weeds/grass around unit (seasonal)", "Weekly", "NA", "NA", "NA", "NA"));
        activityLogWeeklyEntities.add(Arrays.asList("Check garbage receptacles & misc. storage", "Weekly", "5-Jan", "12-Jan", "19-Jan", "26-Jan"));
        activityLogWeeklyEntities.add(Arrays.asList("Clean egg cooler (after egg pick-up)", "Weekly", "5-Jan", "12-Jan", "19-Jan", "26-Jan"));
        activityLogWeeklyEntities.add(Arrays.asList("Replenish handwash station", "Weekly", "5-Jan", "12-Jan", "19-Jan", "26-Jan"));
        activityLogWeeklyEntities.add(Arrays.asList("Replenish solution and clean footbath", "Weekly", "5-Jan", "12-Jan", "19-Jan", "26-Jan"));
        activityLogWeeklyEntities.add(Arrays.asList("Egg Pick-up", "01-Jan", "08-Jan", "15-Jan", "22-Jan", "28-Jan"));
        activityLogWeeklyEntities.add(Arrays.asList("Feed Delivery", "04-Jan", "12-Jan", "17-Jan", "23-Jan", "31-Jan"));
        activityLogWeeklyEntities.add(Arrays.asList("Take feed samples from each load", "04-Jan", "12-Jan", "17-Jan", "23-Jan", "31-Jan"));

        model.put("activityLogWeeklyEntities", activityLogWeeklyEntities);

        List<String> activityLogMonthlyTitle = new ArrayList<>();
        activityLogMonthlyTitle.add("TASK");
        activityLogMonthlyTitle.add("Freq.");
        activityLogMonthlyTitle.add("Date");
        model.put("activityLogMonthlyTitle", activityLogMonthlyTitle);

        List<List> activityLogMonthlyEntities = new ArrayList<>();
        activityLogMonthlyEntities.add(Arrays.asList("Water chlorine/peroxide treatment", "Monthly", "15-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Test water chlorine/peroxide residual if applicable", "Monthly", "15-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Inspect water filters & change as required, waterlines cleaned & flushed", "Monthly", "15-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Check facility lighting equipment", "Monthly", "01-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Check feed bins", "Monthly", "20-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Check floor drains", "Monthly", "20-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Facility and perimeter inspection", "Monthly", "20-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Check stand-by generator, date and initial", "Monthly", "15-Jan JS"));
        activityLogMonthlyEntities.add(Arrays.asList("Test alarms, date and initial", "Monthly", "20-Jan JS"));
        activityLogMonthlyEntities.add(Arrays.asList("Ammonia test (October - March)", "Monthly", "Reading: 10 ppm20-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Salmonella test by MEF", "2/flock", "15-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Calibrate thermomerter", "2/year", "15-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Calibrate medicator or water proportioner", "1/year", "15-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Calibrate scales & metering devices (on-farm feed mill)", "1/year", "20-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Inspect & repair restricted/unrestricted zone", "1/year", "20-Jan"));
        activityLogMonthlyEntities.add(Arrays.asList("Water test", "1/year", "01-Jan"));
        model.put("activityLogMonthlyEntities", activityLogMonthlyEntities);

        setModel(model);
    }
}
