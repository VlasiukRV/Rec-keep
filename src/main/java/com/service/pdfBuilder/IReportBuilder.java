package com.service.pdfBuilder;

import java.io.File;
import java.io.IOException;

public interface IReportBuilder {
    File getPDF() throws IOException;
}
