// Join.tsx

import React, { useState } from 'react';
import axios from 'axios';
import './Join.css';

const Join: React.FC = () => {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isIdDuplicate, setIsIdDuplicate] = useState(false);

    // 아이디 중복 체크 함수
    const handleCheckDuplicateId = async () => {
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await axios.post('https://www.dgu1921.p-e.kr/jwt-login/check-duplicate', {
                loginId,
            });

            if (response.data === "중복된 아이디입니다.") {
                setError("아이디가 중복됩니다.");
                setIsIdDuplicate(true);
            } else {
                setSuccessMessage("사용 가능한 아이디입니다.");
                setIsIdDuplicate(false);
            }
        } catch (error) {
            setError("아이디 중복 확인에 실패했습니다.");
            console.error("아이디 중복 확인 오류", error);
        }
    };

    // 회원가입 함수
    const handleJoin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        // 비밀번호 일치 여부 확인
        if (password !== passwordCheck) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (isIdDuplicate) {
            setError("아이디 중복을 해결해 주세요.");
            return;
        }

        try {
            const response = await axios.post('https://www.dgu1921.p-e.kr/jwt-login/join', {
                loginId,
                password,
                passwordCheck,
            });

            if (response.data === "회원가입 성공") {
                setSuccessMessage("회원가입이 완료되었습니다!");
            } else {
                setError(response.data); // 서버에서 반환된 실패 메시지 표시
            }
        } catch (error) {
            setError("회원가입에 실패했습니다. 입력 정보를 확인해주세요.");
            console.error("회원가입 오류", error);
        }
    };

    return (
        <div className="join-container">
            <form onSubmit={handleJoin} className="join-form">
                <h2>회원가입</h2>
                <p>아이디, 비밀번호, 비밀번호 확인을 입력해주세요.</p>

                {error && <div className="error-message">{error}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}

                <div className="input-group">
                    <input
                        type="text"
                        placeholder="아이디(이메일 주소)"
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                    />
                    <button type="button" onClick={handleCheckDuplicateId}>중복 확인</button>
                </div>
                
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    value={passwordCheck}
                    onChange={(e) => setPasswordCheck(e.target.value)}
                />

                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default Join;
