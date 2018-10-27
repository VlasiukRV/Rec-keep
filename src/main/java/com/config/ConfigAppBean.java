package com.config;

import com.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

import javax.servlet.http.HttpSessionListener;

/**
 * Init bean for application {@link org.springframework.context.annotation.Bean}.
 *
 * @author Roman Vlasiuk
 */
@Configuration
public class ConfigAppBean {

    @Bean
    @Autowired
    public HttpSessionListener httpSessionListener(SecurityService securityService){
        return securityService;
    }

    @Bean
    public static PropertySourcesPlaceholderConfigurer propertyConfigIn() {
        return new PropertySourcesPlaceholderConfigurer();
    }
}
