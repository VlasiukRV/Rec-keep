package com.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@Entity
@Table(name="serviceTask")

@NoArgsConstructor
public class ServiceTask extends BaseEntity<Integer>{

    @JsonProperty
    @ManyToOne(cascade={CascadeType.DETACH}, fetch = FetchType.EAGER)
    private @Getter @Setter User user;

    @JsonProperty
    @Column
    private @Getter @Setter String taskName = "";

    @JsonProperty
    @Column
    private @Getter @Setter Date taskRunDate = null;

    @JsonProperty
    @Column
    private @Getter @Setter Date taskExecuteDate = null;

    @JsonProperty
    @Column
    private @Getter @Setter Boolean userGotNotificationDate = false;

    @JsonProperty
    @ElementCollection(fetch = FetchType.EAGER)
    @MapKeyColumn(name="name")
    @Column(name="value")
    @CollectionTable(name="service_task_variable")
    private @Getter @Setter Map<String, String> taskVariable = new HashMap<>();

    @JsonProperty
    @ElementCollection(fetch = FetchType.EAGER)
    @MapKeyColumn(name="name")
    @Column(name="value")
    @CollectionTable(name="service_task_result")
    private @Getter @Setter Map<String, String> taskResult = new HashMap<>();

}
