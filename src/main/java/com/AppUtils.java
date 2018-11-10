package com;

import com.entity.BaseEntity;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import org.hibernate.Hibernate;
import org.hibernate.proxy.HibernateProxy;
import org.yaml.snakeyaml.Yaml;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Static functions-utility for application.
 *
 * @author Roman Vlasiuk
 */
public class AppUtils {

    public static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    public static <T extends BaseEntity> T getEntityByJSON(Class<T> clazz, String strJSONEntity) {
        try {
            return OBJECT_MAPPER.readValue(strJSONEntity, clazz);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static <T> List<T> getListObgectByJSON(Class<T> clazz, String strJSONListEntity) {
        List<T> list = new ArrayList<>();

        if(!strJSONListEntity.equals("")) {
            try {
                CollectionType javaType = OBJECT_MAPPER.getTypeFactory()
                        .constructCollectionType(List.class, clazz);
                list = OBJECT_MAPPER.readValue(strJSONListEntity, javaType);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return list;
    }

    public static Object getObjectFromYaml(String filename) throws FileNotFoundException {
        if (new File(filename).exists()) {
            InputStream input = new FileInputStream(new File(filename));
            Yaml yaml = new Yaml();
            Object o = yaml.load(input);
            try {
                input.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return o;
        }
        throw new FileNotFoundException();
    }

    public static boolean saveObjectToYaml(Object data, String filename) {
        try {
            if (new File(filename).exists()) {
                Yaml yaml = new Yaml();
                FileWriter writer = new FileWriter(new File(filename));
                yaml.dump(data, writer);
                writer.flush();
                writer.close();
            }
        } catch (IOException e) {
            System.out.println(e.getMessage());
            return false;
        }
        return true;
    }

    public static <T> T initializeAndUnproxy(T entity) {
        if (entity == null) {
            throw new
                    NullPointerException("Entity passed for initialization is null");
        }

        Hibernate.initialize(entity);
        if (entity instanceof HibernateProxy) {
            entity = (T) ((HibernateProxy) entity).getHibernateLazyInitializer()
                    .getImplementation();
        }
        return entity;
    }

    public static boolean isNullOrBlank(String s)
    {
        return (s==null || s.trim().equals(""));
    }
}

