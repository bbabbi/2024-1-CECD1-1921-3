package org.cecd.server.domain;

import jakarta.persistence.*;

public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name = "device_id")
    private Long id;

    private String deviceImg;
    private String deviceName;
    private String buildingName; // ex : 신공학관
    private String location; // ex : 5145호
    private String catalog;
}
