package com.approom.cashaccounting.entity;

import com.entity.BaseEntity;
import com.entity.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.Date;

@Component
@Entity
@Table

@NoArgsConstructor
public class CashFlow extends BaseEntity<Integer> {
    @JsonProperty
    @Column
    @Temporal(TemporalType.DATE)
    private @Getter @Setter Date date;

    @JsonProperty
    @ManyToOne(cascade={CascadeType.DETACH}, fetch = FetchType.EAGER)
    private @Getter @Setter
    User author;

    @JsonProperty
    @ManyToOne(cascade={CascadeType.DETACH})
    @JoinColumn
    private @Getter @Setter CashFlowItem cashFlowItem;

    @JsonProperty
    @Column
    private @Getter @Setter float sum;

    @Override
    public boolean equals(Object other) {
        if (this==other) return true;
        if (id==null) return false;
        if ( !(other instanceof CashFlow) ) return false;
        final CashFlow that = (CashFlow) other;
        return this.id.equals( that.getId() );
    }

    @Override
    public int hashCode() {
        return id==null ? System.identityHashCode(this) : id.hashCode();
    }

}
