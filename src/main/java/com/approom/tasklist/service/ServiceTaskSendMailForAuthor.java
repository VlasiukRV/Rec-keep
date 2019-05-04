package com.approom.tasklist.service;

import com.approom.tasklist.entity.Task;
import com.approom.tasklist.entity.TaskState;
import com.entity.User;
import com.service.MailSender;
import com.service.taskScheduler.AbstractServiceTask;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import java.io.IOException;
import java.util.*;

@Component
public class ServiceTaskSendMailForAuthor extends AbstractServiceTask {

    private Configuration freemarkerConfig;
    private EntityTaskService entityService;
    private MailSender appMailSender;

    private Set<Task> tasksWithSendMail = new HashSet<>();

    private static final Logger logger = LoggerFactory.getLogger(ServiceTaskSendMailForAuthor.class);

    // ToDo
    @Value("#{config['mailSenderService.link_app'] ?: 'http://192.168.0.110:8080'}")
    static private String link_app = "http://192.168.0.110:8080";

    public ServiceTaskSendMailForAuthor(){

    }

    public ServiceTaskSendMailForAuthor(EntityTaskService entityService, MailSender appMailSender, Configuration freemarkerConfig) {
        super();
        this.entityService = entityService;
        this.appMailSender = appMailSender;
        this.freemarkerConfig = freemarkerConfig;
        setTaskName("MailSendService");
    }

    @Override
    protected boolean runServiceTask() {
        List<Task> taskList = entityService.getAll();
        for (Task task : taskList) {
            if (tasksWithSendMail.contains(task)) {
                continue;
            }
            if (task.getState() != TaskState.DONE) {
                continue;
            }
            User recipient = task.getAuthor();
            String mailAddress = recipient.getMailAddress();

            if (mailAddress.equals("")) {
                logger.warn("" + recipient.getUsername() + ": Have no mail address");
                continue;
            }
            try {
                appMailSender.sendMail("vlasiukfamily@gmail.com", mailAddress, "Task list", getMailTemlate(task));
            } catch (IOException e) {
                e.printStackTrace();
            } catch (TemplateException e) {
                e.printStackTrace();
            }
            tasksWithSendMail.add(task);
        }
        runYet();
        return true;
    }

    private String getMailTemlate(Task task) throws IOException, TemplateException {

        Map<String, Object> model = new HashMap();
        model.put("userName", task.getAuthor().getUsername());
        model.put("projectName", task.getProject().getName());
        model.put("taskName", task.getTitle());
        model.put("link_app", link_app.toString());

        freemarkerConfig.setClassForTemplateLoading(this.getClass(), "/mailTemplates");
        Template t = freemarkerConfig.getTemplate("messageForAuthorTaskDone.ftl");

        return FreeMarkerTemplateUtils.processTemplateIntoString(t, model);
    }
}
