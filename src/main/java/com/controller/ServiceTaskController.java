package com.controller;

import com.service.EntityServiceTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping(value = "/appTaskList/entity/serviceTask")
public class ServiceTaskController extends BaseEntityController {

    @Autowired
    public ServiceTaskController(EntityServiceTaskService entityService) {
        this.entityName = "serviceTask";
        this.entityService = entityService;
    }

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

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, produces = "application/json; charset=utf-8")
    public Map<String, Object> deleteEntity(@PathVariable("id")Integer id) {
        return super.deleteEntity(id);
    }

    @RequestMapping(value = "", method = RequestMethod.POST, consumes = "application/json; charset=utf-8", produces = "application/json; charset=utf-8")
    public Map<String, Object> createEntityStrJSON(@RequestBody String strJSONEntity) {
        strJSONEntity = strJSONEntity.replaceAll("\"\\{", "\\{").replaceAll("\\}\"", "\\}").replaceAll("\\\\", "");
        return super.createEntityStrJSON(strJSONEntity);
    }
}
