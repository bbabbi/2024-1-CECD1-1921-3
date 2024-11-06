package org.cecd.server.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Device {
    @Id
    @Column(name = "device_id")
    private String id;

    private String deviceImg;
    private String deviceName;
    private String buildingName; // ex : 신공학관
    private String location; // ex : 5145호
    private String catalog;
    private String layoutImg;
}
