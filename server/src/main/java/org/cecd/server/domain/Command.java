package org.cecd.server.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.cecd.server.common.BaseTimeEntity;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Command extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "command_id")
    private Long commandId;

    @Column(nullable = false)
    private String sensorId;

    @Column(nullable = false)
    private boolean command; // true : ON, false : OFF

}
