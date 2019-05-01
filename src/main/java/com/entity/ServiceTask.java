package com.entity;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Component
@Entity
@Table(name="serviceTask")

@NoArgsConstructor
public class ServiceTask extends BaseEntity<Integer>{

    @Column
    @JsonProperty
    private @Getter @Setter String taskName = "";
    @Column
    @JsonProperty
    private @Getter @Setter Boolean execute = false;
    @Column
    @JsonProperty
    private @Getter @Setter Boolean taskIsRunning = false;

    @ElementCollection
    @MapKeyColumn(name="name")
    @Column(name="value")
    @CollectionTable(name="task_variable")
    @JsonProperty
    private Map<String, String> taskVariable = new HashMap<>();

    @ElementCollection
    @MapKeyColumn(name="name")
    @Column(name="value")
    @CollectionTable(name="task_result")
    @JsonProperty
    private Map<String, String> taskResult = new HashMap<>();

    @JsonAnyGetter
    public Map<String, String> getTaskVariable() {
        return taskVariable;
    }

    @JsonAnySetter
    public void setTaskVariable(String name, String value) {
        this.taskVariable.put(name, value);
    }

    @JsonAnyGetter
    public Map<String, String> getTaskResult() {
        return taskResult;
    }

    @JsonAnySetter
    public void setTaskResult(String name, String value) {
        this.taskResult.put(name, value);
    }

}
