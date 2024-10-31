package org.cecd.server.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.cecd.server.auth.JwtTokenUtil;
import org.cecd.server.domain.Member;
import org.cecd.server.dto.JoinRequest;
import org.cecd.server.dto.LoginRequest;
import org.cecd.server.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

@RestController
@RequiredArgsConstructor
@RequestMapping("/jwt-login")
public class JwtLoginController {

    private final MemberService memberService;
    private final JwtTokenUtil jwtTokenUtil;

    @PostMapping("/join")
    public String join(@RequestBody @Valid JoinRequest joinRequest, BindingResult bindingResult) {
        // loginId 중복 체크
        if (memberService.checkLoginIdDuplicate(joinRequest.getLoginId())) {
            bindingResult.addError(new FieldError("joinRequest", "loginId", "로그인 아이디가 중복됩니다."));
        } else {
            return "사용 가능한 아이디입니다.";
        }

        // password와 passwordCheck가 같은지 체크
        if (!joinRequest.getPassword().equals(joinRequest.getPasswordCheck())) {
            bindingResult.addError(new FieldError("joinRequest", "passwordCheck", "비밀번호가 일치하지 않습니다."));
        }

        if (bindingResult.hasErrors()) {
            return "회원가입 실패"; // 에러가 있는 경우 적절한 메시지 반환
        }

        memberService.join2(joinRequest);
        return "회원가입 성공";
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid LoginRequest loginRequest, BindingResult bindingResult,
                                        HttpServletResponse response) {
        Member member = memberService.login(loginRequest);

        if (member == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 아이디 또는 비밀번호가 틀렸습니다.");
        }

        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("로그인 실패: 입력 값에 오류가 있습니다.");
        }

        long expireTimeMs = 1000 * 60 * 60; // Token 유효 시간 = 60분
        String jwtToken = jwtTokenUtil.createToken(member.getLoginId(), expireTimeMs); // 인스턴스 메소드로 호출

        Cookie cookie = new Cookie("jwtToken", jwtToken);
        cookie.setMaxAge(60 * 60);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);

        return ResponseEntity.ok("로그인 성공");
    }


    @GetMapping("/logout")
    public String logout(HttpServletResponse response) {
        // 쿠키 파기
        Cookie cookie = new Cookie("jwtToken", null);
        cookie.setMaxAge(0); // 쿠키 만료 설정
        cookie.setPath("/"); // 쿠키 경로 설정
        response.addCookie(cookie);

        return "redirect:/jwt-login"; // 로그아웃 후 리다이렉트
    }

    @GetMapping("/info")
    public String userInfo(Authentication auth) {
        Member loginMember = memberService.getLoginUserByLoginId(auth.getName());
        return String.format("loginId : %s\nrole : %s", loginMember.getLoginId(), loginMember.getRole().name());
    }

    @GetMapping("/admin")
    public String adminPage() {
        return "관리자 페이지 접근 성공";
    }

    @GetMapping("/authentication-fail")
    public String authenticationFail(Model model) {
        model.addAttribute("error", "인증 실패");
        return "errorPage/authenticationFail";
    }

    @GetMapping("/authorization-fail")
    public String authorizationFail(Model model) {
        model.addAttribute("error", "권한 실패");
        return "errorPage/authorizationFail";
    }
}
