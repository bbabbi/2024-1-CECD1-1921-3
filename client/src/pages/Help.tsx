import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Sidebar from './Sidebar';
import './Help.css';

const markdownContent = `
# 🚀 안녕하세요! 동국대학교 TEstBEd 관리자 시스템입니다  

## 🩵 주요 기능

### 1️⃣ IoT 기기제어

- 동국대학교 TEstBEd에서 관리하는 IoT기기의 정보를 확인할 수 있습니다.
- 동국대학교 TEstBEd에서 관리하는 IoT기기를 원격 제어할 수 있습니다.  


### 2️⃣ 전력량 통계 확인

- 전체 전력량 데이터를 조회할 수 있습니다.
- 계산된 전력량 데이터를 그래프를 통해 가시적으로 확인할 수 있습니다.  

### 3️⃣ 호실별 정보

- 강의실 별 강의 진행 여부 / 재실 여부 / 낭비 전력 발생 여부에 기반한 호실별 정보를 확인할 수 있습니다.  

**💌 서비스 관련 문의는 ‘2021112037@dgu.ac.kr’로 연락해주시길 바랍니다.**
`;

const Help: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="markdown-page-container">
        <Sidebar onToggle={setIsSidebarOpen} />
        <div className="markdown-content" style={{ marginLeft: isSidebarOpen ? '280px' : '0' }}>
          <h1 className="markdown-title">동국대학교 TEstBEd 관리자 시스템 사용법</h1>
          <div className="content-box">
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          </div>
        </div>
    </div>
  );
}

export default Help;
