package com.controller;

import com.dao.EntityRepositoryCastom;
import com.entity.BaseEntity;
import com.service.EntityBaseService;
import org.springframework.data.repository.CrudRepository;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public abstract class BaseEntityController<R extends CrudRepository<T, ID> & EntityRepositoryCastom<T>, ID extends Serializable, T extends BaseEntity<ID>, K extends EntityBaseService<T, ID, R>> {
    protected String entityName;
    protected K entityService;

   public Map<String, Object> getEntityById(ID id) {
        if (entityService == null) {
            return AjaxResponse.errorResponse("entity '" + entityName + "' not found");
        }

        T entity = entityService.getEntityById(id);
        if (entity == null){
            return AjaxResponse.errorResponse(entityName + " not found by id " + id);
        }
        return AjaxResponse.successResponse(entity);
   }

    public Map<String, Object> getEntity() {
        if (entityService == null) {
            return AjaxResponse.errorResponse("entity '" + entityName + "' not found");
        }

        List<T> entityList = entityService.getAll();
        return AjaxResponse.successResponse(entityList);
    }

    public Map<String, Object> findEntity(String search) {
        if (entityService == null) {
            return AjaxResponse.errorResponse("entity '" + entityName + "' not found");
        }

        return AjaxResponse.successResponse(entityService.findEntity(search));        
    }


    public Map<String, Object> deleteEntity(ID id) {
        if (entityService == null) {
            return AjaxResponse.errorResponse("entity '" + entityName + "' not found");
        }

        try {
            if (!entityService.deleteEntity(id)) {
                return AjaxResponse.errorResponse("entity '" + entityName + " id " + id + "' not deleted");
            }
        }catch (RuntimeException ex){
            return AjaxResponse.errorResponse("entity '" + entityName + " id " + id + "' not deleted");
        }

        return AjaxResponse.successResponse(true);
    }

    public Map<String, Object> createEntityStrJSON(String strJSONEntity) {
        if (entityService == null) {
            return AjaxResponse.errorResponse("entity '" + entityName + "' not found");
        }

        T entity = null;
        try {
            entity = entityService.saveEntity(strJSONEntity);
        }catch (Exception e){
            e.printStackTrace();
        }

        if (entity == null || (Integer)entity.getId() == 0){
            return AjaxResponse.errorResponse("entity '" + entityName + "' not created");
        }
        return AjaxResponse.successResponse(entity);
    }

}
