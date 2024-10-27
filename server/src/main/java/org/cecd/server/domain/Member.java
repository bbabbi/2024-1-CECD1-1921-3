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
public class Member {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) @Column(name = "member_id")
    private Long id;

    private String loginId;
    private String password;
    @Enumerated(EnumType.STRING)
    private MemberRole role;
}