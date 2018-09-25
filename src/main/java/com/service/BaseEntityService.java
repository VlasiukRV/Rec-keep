package com.service;

import com.AppUtils;
import com.dao.EntityRepositoryCastom;
import com.dao.SearchCriteria;
import com.entity.BaseEntity;
import org.springframework.data.repository.CrudRepository;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public abstract class BaseEntityService<T extends BaseEntity<ID>, ID extends Serializable, R extends CrudRepository<T, ID> & EntityRepositoryCastom> {

    protected R entityRepository;

    protected Class<T> baseEntityClass;

    protected BaseEntityService(Class<T> baseEntityClass, R entityRepository) {
        this.baseEntityClass = baseEntityClass;
        this.entityRepository = entityRepository;
    }

    public R getEntityRepository(){
        return entityRepository;
    }

    public T getEntityById(ID id){
        return entityRepository.findOne(id);
    }

    public List<T> getAll(){
        return (List<T>)entityRepository.findAll();
    }

    public List<T> search(List<SearchCriteria> params){
        return (List<T>)entityRepository.search(baseEntityClass, params);
    }

    public List<T> findEntity(String search){
	
        List<T> entityList;
        List<SearchCriteria> params = new ArrayList<SearchCriteria>();
        if (search != null) {
            Pattern pattern = Pattern.compile("(\\w+?)(:|<|>|=|>=|<=)(\\w+?)");
            Matcher matcher = pattern.matcher(search + ",");
            while (matcher.find()) {
                params.add(new SearchCriteria(matcher.group(1), matcher.group(2), matcher.group(3)));
            }
        }
        if (params.isEmpty()){
            entityList = this.getAll();
        }else {
            entityList = this.search(params);
        }
        return entityList;
	
    }
    
    public boolean deleteEntity(T entity){
        entityRepository.delete(entity);
        return entityRepository.exists(entity.getId());
    }

    public boolean deleteEntity(ID id){
        try {
            entityRepository.delete(id);
        }catch (Exception ex){
            return false;
        }
        return !entityRepository.exists(id);
    }

    public T saveEntity(T entity){
        return entityRepository.save(entity);
    }

    public T getEntityByJSON(String strJSONEntity){
        T entity = AppUtils.getEntityByJSON(this.baseEntityClass, strJSONEntity);
        if (entity == null){
            return null;
        }

        return entity;
    }

    public T saveEntity(String strJSONEntity){
        T entity = getEntityByJSON(strJSONEntity);
        if (entity == null){
            return null;
        }
        return saveEntity(entity);
    }

}
