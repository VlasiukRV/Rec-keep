package com.service.fileGenerators;

import java.io.File;
import java.io.IOException;

public interface IFileGenerator {
    File getFile() throws IOException;
}
