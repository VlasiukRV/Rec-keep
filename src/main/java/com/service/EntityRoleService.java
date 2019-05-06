package com.service;

import com.dao.RoleRepository;
import com.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class EntityRoleService extends EntityBaseService<Role, Integer, RoleRepository> {
    @Autowired
    public EntityRoleService(RoleRepository roleRepository) {
        super(Role.class, roleRepository);
    }
}
