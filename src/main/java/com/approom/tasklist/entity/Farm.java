package com.approom.tasklist.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

import com.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Component
@Entity
@Table
@JsonIgnoreProperties(value = { "tasks" })

@NoArgsConstructor
public class Farm extends BaseEntity<Integer> {

    @Column
    @JsonProperty
    private @Getter @Setter String name;

    public Farm(String name) {
        super();

        this.name = name;
    }
    
    @Override
    public boolean equals(Object other) {
        if (this==other) return true;
        if (id==null) return false;
        if ( !(other instanceof Farm) ) return false;
        final Farm that = (Farm) other;
        return this.id.equals( that.getId() );
    }

    @Override
    public int hashCode() {
        return id==null ? System.identityHashCode(this) : id.hashCode();
    }
    
}
