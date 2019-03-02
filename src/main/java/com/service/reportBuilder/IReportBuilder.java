package com.service.reportBuilder;

import java.io.File;
import java.io.IOException;

public interface IReportBuilder {
    File getReport() throws IOException;
}
