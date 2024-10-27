package org.cecd.server.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.cecd.server.domain.Member;
import org.cecd.server.domain.MemberRole;

@Getter
@Setter
@NoArgsConstructor
public class JoinRequest {

    @NotBlank(message = "로그인 아이디가 비어있습니다.")
    private String loginId;

    @NotBlank(message = "비밀번호가 비어있습니다.")
    private String password;
    private String passwordCheck;

    @NotBlank(message = "닉네임이 비어있습니다.")
    private String nickname;

    // 비밀번호 암호화 X
    public Member toEntity() {
        return Member.builder()
                .loginId(this.loginId)
                .password(this.password)
                .role(MemberRole.USER)
                .build();
    }

    // 비밀번호 암호화
    public Member toEntity(String encodedPassword) {
        return Member.builder()
                .loginId(this.loginId)
                .password(encodedPassword)
                .role(MemberRole.USER)
                .build();
    }
}