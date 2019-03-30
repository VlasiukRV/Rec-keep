package com.service.fileGenerators;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.ElementList;
import com.itextpdf.tool.xml.html.Tags;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class FileGeneratorTextPdf implements IFileGenerator {

    public static String DEST = "E:\\Work\\eclipse-workspace\\taskList\\target\\classes\\reportBuilder\\report1.pdf";
    public static final String HTML = "E:\\Work\\eclipse-workspace\\taskList\\target\\classes\\reportBuilder\\movies.html";
    public static final String CSS = "E:\\Work\\eclipse-workspace\\taskList\\target\\classes\\reportBuilder\\style1.css";

    public static final String templatePDF = "reportBuilder/stationery.pdf";
    public FileGeneratorTextPdf() {

    }

    public FileGeneratorTextPdf(String DEST) {
        this.DEST = DEST;
    }

    private void createPdf(String result) throws IOException, DocumentException {
        FillTemplateHelper template = new FillTemplateHelper(templatePDF);
        template.setSender("Bruno Lowagie\nAdolf Baeyensstraat 121\n9040 Sint-Amandsberg\nBELGIUM");
        template.setReceiver("iText Software Corp.\nCambridge Innovation Center\n1 Broadway, 14th Floor\nCambridge, MA 02142 USA");
        // step 1
        Document document = new Document(template.getPageSize(),
                template.getmLeft(), template.getmRight(), template.getmTop(), template.getmBottom());
        // step 2
        PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(result));
        writer.setPageEvent(template);
        // step 3
        document.open();
        // step 4
        ElementList elements = FillTemplateHelper.parseHtml(HTML, CSS, Tags.getHtmlTagProcessorFactory());
        for (Element e : elements) {
            document.add(e);
        }
        // step 5
        document.close();
    }

    @Override
    public File getFile() throws IOException {
        File file = new File(DEST);
        file.getParentFile().mkdirs();

        try {
            createPdf(DEST);
        } catch (DocumentException e) {
            e.printStackTrace();
            throw new IOException(e);
        }

        return file;
    }

}
