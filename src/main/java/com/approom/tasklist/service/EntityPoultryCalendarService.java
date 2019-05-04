package com.approom.tasklist.service;

import com.approom.tasklist.dao.PoultryCalendarRepository;
import com.approom.tasklist.entity.PoultryCalendar;
import com.service.EntityBaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class EntityPoultryCalendarService extends EntityBaseService<PoultryCalendar, Integer, PoultryCalendarRepository> {
    @Autowired
    public EntityPoultryCalendarService(PoultryCalendarRepository poultryCalendarRepository) {
        super(PoultryCalendar.class, poultryCalendarRepository);
    }

}
