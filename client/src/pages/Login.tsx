// Login.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login: React.FC = () => {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://www.dgu1921.p-e.kr/jwt-login/login', {
                loginId,
                password,
            });

            if (response.status === 200) {
                // JWT 토큰 저장
                localStorage.setItem('jwtToken', response.data);
                // 대시보드 페이지로 이동
                navigate('/dashboard');
            } else {
                alert("로그인에 실패했습니다. 아이디 또는 비밀번호를 확인하세요.");
            }
        } catch (error) {
            console.error("로그인 오류", error);
            alert("로그인에 실패했습니다.");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>DGU Testbed 관리자 시스템</h2>
                <p>아이디(이메일주소)와 패스워드를 통해 로그인할 수 있습니다.</p>

                <input 
                    type="text" 
                    placeholder="아이디(이메일 주소)" 
                    value={loginId} 
                    onChange={(e) => setLoginId(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="비밀번호" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />

                <button type="submit">로그인하기</button>
                <div className="login-options">
                    <a href="/join">계정 생성하기</a>
                    <span> OR </span>
                    <a href="/request-access">접근권한 요청하기</a>
                </div>
            </form>
        </div>
    );
};

export default Login;
export {};