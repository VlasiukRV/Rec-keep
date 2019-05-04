package com.service;

import com.controller.AjaxResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Service for manage users
 *
 * @author Roman Vlasiuk
 */
@Service
public class SecurityService implements HttpSessionListener {
    private static int totalActiveSessions;
    @Autowired
    private SessionRegistry sessionRegistry;
    @Autowired
    EntityUserService userService;

    public static int getTotalActiveSession() {
        return totalActiveSessions;
    }

    @Override
    public void sessionCreated(HttpSessionEvent httpSessionEvent) {
        totalActiveSessions++;
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent httpSessionEvent) {
        totalActiveSessions--;
    }

    public Map<String, Object> getSessionInformation(HttpServletRequest request) {
        return getPrincipalInformation(sessionRegistry.getSessionInformation(request.getSession().getId()));
    }

    public Map<String, Object> getAllSessionsInformation(HttpServletRequest request) {
        Map<String, Object> allSessionsInformation = new HashMap<>();

        List<SessionInformation>sessions = sessionRegistry.getAllSessions(request.getSession().getId(), false);
        for (SessionInformation session : sessions) {
            allSessionsInformation.put(session.getSessionId(), getPrincipalInformation(session));
        }

        return allSessionsInformation;
    }

    public Map<String, Object> getAllPrincipals() {
        List<Object> principals = sessionRegistry.getAllPrincipals();

        return AjaxResponse.successResponse(principals);
    }

    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public User getUser() {
        return (User) getAuthentication().getPrincipal();
    }

    public User getPrincipal(SessionInformation sessionInformation) {
        User principal = (User) sessionInformation.getPrincipal();
        return principal;
    }

    private Map<String, Object> getPrincipalInformation(SessionInformation sessionInformation) {
        User principal = getPrincipal(sessionInformation);
        com.entity.User currentUser = userService.getUserByName(principal.getUsername());

        Map<String, Object> principalInformation = new HashMap<>();
        principalInformation.put("sessionId", sessionInformation.getSessionId());
        principalInformation.put("userName", principal.getUsername());
        principalInformation.put("authorities", principal.getAuthorities());
        principalInformation.put("currentUserId", currentUser.getId());

        return principalInformation;
    }
}
