package com.approom.cashaccounting.entity;

import com.entity.BaseEntity;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;

@Component
@Entity
@Table

@NoArgsConstructor
public class CashFlowItem extends BaseEntity<Integer> {
    @JsonProperty
    @Column
    private @Getter @Setter String title;
    @JsonProperty
    @Column
    @Enumerated(EnumType.ORDINAL)
    protected @Getter @Setter CashFlowItemType type;

    @Override
    public boolean equals(Object other) {
        if (this==other) return true;
        if (id==null) return false;
        if ( !(other instanceof CashFlowItem) ) return false;
        final CashFlowItem that = (CashFlowItem) other;
        return this.id.equals( that.getId() );
    }

    @Override
    public int hashCode() {
        return id==null ? System.identityHashCode(this) : id.hashCode();
    }
}
