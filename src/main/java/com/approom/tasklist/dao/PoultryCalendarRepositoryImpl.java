package com.approom.tasklist.dao;

import com.approom.tasklist.entity.PoultryCalendar;
import com.dao.EntityRepositoryCastomImpl;
import org.springframework.stereotype.Repository;

@Repository
public class PoultryCalendarRepositoryImpl extends EntityRepositoryCastomImpl<PoultryCalendar> implements CastomPoultryCalendarRepository{
}
