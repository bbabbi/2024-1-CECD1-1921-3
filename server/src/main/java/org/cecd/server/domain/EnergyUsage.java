package org.cecd.server.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EnergyUsage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name = "usage_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "device_id", referencedColumnName = "device_id")
    private Device device;
    private LocalDateTime usageTime;
    private Double power;
    private boolean isExceeded;
}
