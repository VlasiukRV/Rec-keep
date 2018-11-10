package com.service.pdfBuilder;

import com.AppUtils;
import org.apache.commons.io.FileUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Paths;
import java.util.StringTokenizer;

public class ReportBuilderPhantomjs implements IReportBuilder {

    private static String RESULT = "report1";
    private static final String DATA = "/pdfBuilder/movies.html";

    private static final String PHANTOMJS_CONFIG_FILE =  "/pdfBuilder/configFile.js";
    private static final String PATH_PHANTOMJS =  "/pdfBuilder/phantomjs ";

    @Override
    public File getPDF() throws IOException {

        File report = null;
        try {
            report = createPdf(RESULT);
        } catch (URISyntaxException | InterruptedException e) {
            e.printStackTrace();
            throw new IOException(e);
        }

        return report;
    }

    private File createPdf(String result) throws IOException, URISyntaxException, InterruptedException {
        // tmp pdf file for output
        File pdfReport = File.createTempFile(result, ".pdf");

        // Get HTML Report
        URL htmlFileUrl = this.getClass().getResource(DATA);
        File htmlFile = Paths.get(htmlFileUrl.toURI()).toFile();

        File htmlReport = File.createTempFile(result, ".html");
        FileUtils.writeStringToFile(htmlReport, inlineStyles(htmlFile), "UTF-8");

        // Get JS config file
        URL configFileUrl = this.getClass().getResource(PHANTOMJS_CONFIG_FILE);
        File configFile = Paths.get(configFileUrl.toURI()).toFile();

        // Get phantomjs
/*
        URL phantomjsUrl = this.getClass().getResource(PATH_PHANTOMJS);
        File phantomjs = Paths.get(phantomjsUrl.toURI()).toFile();
*/

        ProcessBuilder renderProcess = new ProcessBuilder(
                "C:\\wamp64\\apps\\phantomjs\\bin\\phantomjs",
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

