package com.approom.tasklist.dao;

import com.approom.tasklist.entity.PoultryCalendar;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoultryCalendarRepository extends CrudRepository<PoultryCalendar, Integer>, CastomPoultryCalendarRepository {
}
