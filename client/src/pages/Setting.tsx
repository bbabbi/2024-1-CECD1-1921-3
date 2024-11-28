import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Sidebar from './Sidebar';
import './Help.css';

const markdownContent = `
## 동국대학교 TEstBEd 관리자 시스템에 대한 권한 관리 페이지입니다.   

**💌 서비스 권한 관련 문의는 ‘2021112037@dgu.ac.kr’로 연락해주시길 바랍니다.**
`;

const Help: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="markdown-page-container">
        <Sidebar onToggle={setIsSidebarOpen} />
        <div className="markdown-content" style={{ marginLeft: isSidebarOpen ? '280px' : '0' }}>
          <h1 className="markdown-title">동국대학교 TEstBEd 관리자 시스템 권한 관리 페이지</h1>
          <div className="content-box">
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
          </div>
        </div>
    </div>
  );
}

export default Help;
