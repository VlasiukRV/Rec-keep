package com.approom.tasklist.entity;

import com.entity.BaseEntity;
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
public class PoultryCalendar extends BaseEntity<Integer> {

    @JsonProperty
    @Column
    @Temporal(TemporalType.DATE)
    private @Getter @Setter Date date;

    @JsonProperty
    @Column
    private @Getter @Setter int mortality;
    @JsonProperty
    @Column
    private @Getter @Setter int eggProduction;
    @JsonProperty
    @Column
    private @Getter @Setter int eggCoolerDirtyFlats;
    @JsonProperty
    @Column
    private @Getter @Setter int eggCoolerTemperatureHi;
    @JsonProperty
    @Column
    private @Getter @Setter int eggCoolerTemperatureLo;
    @JsonProperty
    @Column
    private @Getter @Setter int eggCoolerHumidity;
    @JsonProperty
    @Column
    private @Getter @Setter int barnTemperatureHi;
    @JsonProperty
    @Column
    private @Getter @Setter int barnTemperatureLo;
    @JsonProperty
    @Column
    private @Getter @Setter int waterMeterRead;
    @JsonProperty
    @Column
    private @Getter @Setter int waterCons;
    @JsonProperty
    @Column
    private @Getter @Setter int feedCons;

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
