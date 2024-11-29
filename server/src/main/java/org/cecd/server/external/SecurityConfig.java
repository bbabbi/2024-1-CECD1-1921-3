package org.cecd.server.external;

import lombok.RequiredArgsConstructor;
import org.cecd.server.auth.JwtTokenFilter;
import org.cecd.server.auth.JwtTokenUtil; // JwtTokenUtil 추가
import org.cecd.server.domain.MemberRole;
import org.cecd.server.service.MemberService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.cors.CorsConfiguration;

import java.io.IOException;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final MemberService memberService;
    private final JwtTokenUtil jwtTokenUtil;

    @Value("${jwt.secret}")
    private String secretKey;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration configuration = new CorsConfiguration();
                    // 명시적으로 허용할 Origin 설정
                    configuration.setAllowedOrigins(List.of(
                            "http://localhost:3000",
                            "https://www.dgu1921.p-e.kr",
                            "https://dgutestbed.netlify.app"
                    ));
                    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    configuration.setAllowedHeaders(List.of("*"));
                    configuration.setAllowCredentials(true); // Credentials 허용
                    return configuration;
                }))
                .csrf(csrf -> csrf.disable()) // CSRF 비활성화
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 상태 없는 세션 관리
                .addFilterBefore(new JwtTokenFilter(memberService, jwtTokenUtil), UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/jwt-login/info").authenticated()
                        .requestMatchers("/jwt-login/admin/**").hasAuthority(MemberRole.ADMIN.name())
                        .requestMatchers("/ws/**").permitAll() // WebSocket 엔드포인트 허용
                        .anyRequest().permitAll() // 추후 수정 예정
                )
                .exceptionHandling(exceptionHandling ->
                        exceptionHandling
                                .authenticationEntryPoint(new AuthenticationEntryPoint() {
                                    @Override
                                    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
                                        if (!request.getRequestURI().contains("api")) {
                                            response.sendRedirect("/jwt-login/authentication-fail");
                                        } else {
                                            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "인증 실패");
                                        }
                                    }
                                })
                                .accessDeniedHandler(new AccessDeniedHandler() {
                                    @Override
                                    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
                                        if (!request.getRequestURI().contains("api")) {
                                            response.sendRedirect("/jwt-login/authorization-fail");
                                        } else {
                                            response.sendError(HttpServletResponse.SC_FORBIDDEN, "접근 거부");
                                        }
                                    }
                                })
                );

        return httpSecurity.build();
    }
}

