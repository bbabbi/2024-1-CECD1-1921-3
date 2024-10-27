package org.cecd.server.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.cecd.server.domain.Member;
import org.cecd.server.dto.JoinRequest;
import org.cecd.server.dto.LoginRequest;
import org.cecd.server.service.MemberService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/security-login")
public class SecurityLoginController {

    private final MemberService memberService;

    @GetMapping(value = {"", "/"})
    public String home(Model model, Authentication auth) {
        model.addAttribute("loginType", "security-login");
        model.addAttribute("pageName", "Security 로그인");

        if(auth != null) {
            Member loginMember = memberService.getLoginUserByLoginId(auth.getName());
            if (loginMember != null) {
                model.addAttribute("loginId", loginMember.getLoginId());
            }
        }

        return "home";
    }

    @GetMapping("/join")
    public String joinPage(Model model) {
        model.addAttribute("loginType", "security-login");
        model.addAttribute("pageName", "Security 로그인");

        model.addAttribute("joinRequest", new JoinRequest());
        return "join";
    }

    @PostMapping("/join")
    public String join(@Valid @ModelAttribute JoinRequest joinRequest, BindingResult bindingResult, Model model) {
        model.addAttribute("loginType", "security-login");
        model.addAttribute("pageName", "Security 로그인");

        // loginId 중복 체크
        if(memberService.checkLoginIdDuplicate(joinRequest.getLoginId())) {
            bindingResult.addError(new FieldError("joinRequest", "loginId", "로그인 아이디가 중복됩니다."));
        }
        // password와 passwordCheck가 같은지 체크
        if(!joinRequest.getPassword().equals(joinRequest.getPasswordCheck())) {
            bindingResult.addError(new FieldError("joinRequest", "passwordCheck", "바밀번호가 일치하지 않습니다."));
        }

        if(bindingResult.hasErrors()) {
            return "join";
        }

        memberService.join2(joinRequest);
        return "redirect:/security-login";
    }

    @GetMapping("/login")
    public String loginPage(Model model) {
        model.addAttribute("loginType", "security-login");
        model.addAttribute("pageName", "Security 로그인");

        model.addAttribute("loginRequest", new LoginRequest());
        return "login";
    }

    @GetMapping("/info")
    public String userInfo(Model model, Authentication auth) {
        model.addAttribute("loginType", "security-login");
        model.addAttribute("pageName", "Security 로그인");

        Member loginMember = memberService.getLoginUserByLoginId(auth.getName());

        if(loginMember == null) {
            return "redirect:/security-login/login";
        }

        model.addAttribute("user", loginMember);
        return "info";
    }

    @GetMapping("/admin")
    public String adminPage( Model model) {
        model.addAttribute("loginType", "security-login");
        model.addAttribute("pageName", "Security 로그인");

        return "admin";
    }
}
