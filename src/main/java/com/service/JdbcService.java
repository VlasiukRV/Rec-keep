package com.service;

import com.approom.tasklist.entity.Project;
import com.approom.tasklist.service.ProjectService;
import com.approom.tasklist.service.TaskService;
import com.config.AppStartupRunner;
import com.entity.Role;
import com.entity.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import javax.transaction.Transactional;


@Service
public class JdbcService {
    private static final Logger logger = LoggerFactory.getLogger(AppStartupRunner.class);

    @Autowired
    private JdbcTemplate jdbc;
    @Autowired
    private SessionFactory sessionFactory;

    @Autowired
    TaskService taskService;
    @Autowired
    UserService userService;
    @Autowired
    RoleService roleService;
    @Autowired
    ProjectService projectService;

    public JdbcService(){

    }

    public DataSource getDataSource() {
        return jdbc.getDataSource();
    }

    public Session getORMSession(){
        return sessionFactory.getCurrentSession();
    }

    public Boolean dropDataBase() {
        jdbc.execute("drop taskList");
        return true;
    }

    @Transactional
    public Boolean initDataBase() {

        logger.info("Init data base");
        System.out.println("		---- Load user's: admin password admin; user password user");

        User userAdmin = new User();
        userAdmin.setUsername("admin");
        userAdmin.setPassword("admin");
        userAdmin.setMailAddress("vlasiukrv@gmail.com");
        userService.saveEntity(userAdmin);

        User userUser = new User();
        userUser.setUsername("user");
        userUser.setPassword("user");
        userUser.setMailAddress("alyona.lisitsyna@gmail.com");
        userService.saveEntity(userUser);

        Role roleAdmin = new Role();
        roleAdmin.setRole("ROLE_ADMIN");
        roleAdmin.addUser(userAdmin);
        roleService.saveEntity(roleAdmin);
        Role roleUser = new Role();
        roleUser.setRole("ROLE_USER");
        roleUser.addUser(userAdmin);
        roleUser.addUser(userUser);
        roleService.saveEntity(roleUser);

        Project project1 = new Project();
        project1.setName("Work");
        projectService.saveEntity(project1);

        return true;
    }

}
