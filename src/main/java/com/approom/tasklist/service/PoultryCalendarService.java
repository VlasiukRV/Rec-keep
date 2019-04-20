package com.approom.tasklist.service;

import com.approom.tasklist.dao.PoultryCalendarRepository;
import com.approom.tasklist.entity.PoultryCalendar;
import com.service.BaseEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class PoultryCalendarService extends BaseEntityService<PoultryCalendar, Integer, PoultryCalendarRepository> {
    @Autowired
    public PoultryCalendarService(PoultryCalendarRepository poultryCalendarRepository) {
        super(PoultryCalendar.class, poultryCalendarRepository);
    }

}
