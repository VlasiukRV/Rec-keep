package com.controller;

import com.AppUtils;
import com.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import sun.security.action.GetPropertyAction;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.AccessController;
import java.util.Map;

@Controller
@RequestMapping("/appTaskList/service")
public class ServiceController {

    @Autowired
    SecurityService securityService;

    @Autowired
    private ServletContext servletContext;

    private static final File tmpdir = new File(AccessController
            .doPrivileged(new GetPropertyAction("java.io.tmpdir")));

    @RequestMapping("/authenticate")
    @ResponseBody
    public Map<String, Object> user(HttpServletRequest request) {
        return AjaxResponse.successResponse(securityService.getSessionInformation(request));
    }

    // http://localhost:8080/appTaskList/service/download?fileName=abc.zip
    // Using ResponseEntity<InputStreamResource>
    @RequestMapping("/download")
    public ResponseEntity<InputStreamResource> downloadFile1(
            @RequestParam String fileName) throws IOException {

        MediaType mediaType = AppUtils.getMediaTypeForFileName(this.servletContext, fileName);
        System.out.println("fileName: " + fileName);
        System.out.println("mediaType: " + mediaType);

        File file = new File(this.tmpdir + "/" + fileName);
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        return ResponseEntity.ok()
                // Content-Disposition
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=" + file.getName())
                // Content-Type
                .contentType(mediaType)
                // Contet-Length
                .contentLength(file.length()) //
                .body(resource);
    }

}
