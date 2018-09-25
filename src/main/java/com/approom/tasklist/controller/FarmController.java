package com.approom.tasklist.controller;

import com.approom.tasklist.dao.FarmRepository;
import com.approom.tasklist.entity.Farm;
import com.approom.tasklist.service.FarmService;
import com.controller.BaseEntityController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value = "/appTaskList/entity/farm")
public class FarmController extends BaseEntityController<FarmRepository, Integer, Farm, FarmService>{

    @Autowired
    public FarmController(FarmService entityService) {
        entityName = "farm";
        this.entityService = entityService;
    }

    @Override
    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    public Map<String, Object> getEntityById(@PathVariable Integer id) {
        return super.getEntityById(id);
    }

    @RequestMapping(value = "", method = RequestMethod.GET, produces = "application/json; charset=utf-8")
    public Map<String, Object> getEntity(@RequestParam(value = "search", required = false) String search) {
        if(search == null) {
            return super.getEntity();
        }else {
            return super.findEntity(search);
        }
    }

    @Override
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, produces = "application/json; charset=utf-8")
    public Map<String, Object> deleteEntity(@PathVariable("id")Integer id) {
        return super.deleteEntity(id);
    }

    @Override
    @RequestMapping(value = "", method = RequestMethod.POST, consumes = "application/json; charset=utf-8", produces = "application/json; charset=utf-8")
    public Map<String, Object> createEntityStrJSON(@RequestBody String strJSONEntity) {
        return super.createEntityStrJSON(strJSONEntity);
    }
}
