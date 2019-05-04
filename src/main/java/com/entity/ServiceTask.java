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

    @Column
    @JsonProperty
    private @Getter @Setter User user;

    @Column
    @JsonProperty
    private @Getter @Setter String taskName = "";
    @Column
    @JsonProperty
    private @Getter @Setter Date taskRunDate = null;
    @Column
    @JsonProperty
    private @Getter @Setter Date taskExecuteDate = null;
    @Column
    @JsonProperty
    private @Getter @Setter Boolean userGotNotificationDate = false;

    @ElementCollection
    @MapKeyColumn(name="name")
    @Column(name="value")
    @CollectionTable(name="task_variable")
    @JsonProperty
    private @Getter @Setter Map<String, String> taskVariable = new HashMap<>();

    @ElementCollection
    @MapKeyColumn(name="name")
    @Column(name="value")
    @CollectionTable(name="task_result")
    @JsonProperty
    private @Getter @Setter Map<String, String> taskResult = new HashMap<>();

}
