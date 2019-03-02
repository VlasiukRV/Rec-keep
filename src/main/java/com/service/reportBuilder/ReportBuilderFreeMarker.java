package com.service.reportBuilder;

import com.AppUtils;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.apache.commons.io.FileUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.io.File;
import java.io.IOException;
import java.util.*;

public class ReportBuilderFreeMarker implements IReportBuilder {

    private Map<String, Object> model;
    private Configuration freemarkerConfig;

    private static final Logger logger = LoggerFactory.getLogger(ReportBuilderFreeMarker.class);

    public ReportBuilderFreeMarker(Map<String, Object> model) {
        this.model = model;
    }

    @Override
    public File getReport() throws IOException {

        Map<String, Object> model = new HashMap();
        model.put("userName", "sfsdf");
        model.put("projectName", "asdfasf");
        model.put("taskName", "afwasfs");
        model.put("link_app", "#");

        File htmlReport = File.createTempFile("html_report", ".html");
        System.out.println("create " + htmlReport.getAbsolutePath());
        FileUtils.writeStringToFile(htmlReport, "sfasefqewfqewfwe", "UTF-8");

        try {
            freemarkerConfig.setClassForTemplateLoading(this.getClass(), "/mailTemplates");
            Template t = freemarkerConfig.getTemplate("messageForAuthorTaskDone.ftl");
            System.out.println(t.getName());
            FileUtils.writeStringToFile(htmlReport, FreeMarkerTemplateUtils.processTemplateIntoString(t, model), "UTF-8");
            /*FileUtils.writeStringToFile(htmlReport, inlineStyles(htmlReport), "UTF-8");*/
        }catch (IOException | TemplateException e) {
            e.printStackTrace();
        }


        return htmlReport;
    }

    private String inlineStyles(File htmlFile) throws IOException {
        return inlineStyles(FileUtils.readFileToString(htmlFile, "UTF-8")).outerHtml();
    }

    private Document inlineStyles(String html) throws IOException {
        // Document doc = Jsoup.connect("http://mypage.com/inlineme.php").get();
        Document doc = Jsoup.parse(html);
        String style = "style";
        Elements els = doc.select(style);// to get all the style elements
        for (Element e : els) {
            String styleRules = e.getAllElements().get(0).data().replaceAll("\n", "").trim(), delims =
                    "{}";
            StringTokenizer st = new StringTokenizer(styleRules, delims);
            while (st.countTokens() > 1) {
                String selector = st.nextToken(), properties = st.nextToken();
                // Process selectors such as "a:hover"
                if (selector.indexOf(":") > 0) {
                    selector = selector.substring(0, selector.indexOf(":"));
                }
                if (AppUtils.isNullOrBlank(selector)) {
                    continue;
                }
                Elements selectedElements = doc.select(selector);
                for (Element selElem : selectedElements) {
                    String oldProperties = selElem.attr(style);
                    selElem.attr(
                            style,
                            oldProperties.length() > 0 ? concatenateProperties(oldProperties,
                                    properties) : properties);
                }
            }
            e.remove();
        }
        return doc;
    }

    private String concatenateProperties(String oldProp, String newProp) {
        oldProp = oldProp.trim();
        if (!newProp.endsWith(";")) {
            newProp += ";";
        }
        return newProp + oldProp; // The existing (old) properties should take precedence.
    }

}
