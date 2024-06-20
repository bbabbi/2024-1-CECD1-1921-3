import React from 'react';
import './WarningLog.css';

const WarningLogPage: React.FC = () => {
  const warnings = [
    {
      date: '2024.05.12',
      time: '10:30:24',
      code: 'OffAllRequest',
      message: '현재 6144호 강의실에 재실 인원이 없는 것으로 확인됩니다. 모든 기기의 전원을 종료하시겠습니까?'
    },
    {
      date: '2024.05.12',
      time: '10:30:24',
      code: 'OffSwitchRequest',
      message: '현재 6144호 강의실에 강의가 종료되었습니다. 일부 스위치의 전원을 종료하시겠습니까?'
    },
    {
      date: '2024.05.10 10:30:00',
      code: 'OffSwitchRequest',
      message: '현재 6144호 강의실에 강의가 종료되었습니다. 일부 스위치의 전원을 종료하시겠습니까?'
    },
  ];

  return (
    <div className="warning-log-page">
      <header className="header">
        <div className="header-left">
          <h1 className="title">
            <span className="bold highlight">1</span>
            <span className="bold">9</span>
            <span className="bold">2</span>
            <span className="bold highlight">1</span> 동국대학교
          </h1>
          <p>Mobius 플랫폼 기반 전력제어 시스템</p>
        </div>
        <div className="header-right">
          <span>admin</span>
          <button>Logout</button>
        </div>
      </header>
      <nav className="nav">
        <button>홈</button>
        <button>IoT 기기 현황</button>
        <button>데이터 관리</button>
        <button className="active">전력 제어</button>
      </nav>
      <main className="main-content">
        <div className="controls">
          <button>컨트롤</button>
          <button>그래프</button>
          <button className="active">경고기록</button>
        </div>
        <div className="filters">
          <label>호실</label>
          <select>
            <option>6144호</option>
          </select>
          <label>기간</label>
          <select>
            <option>2024.05 (1개월)</option>
          </select>
        </div>
        <table className="warning-table">
          <thead>
            <tr>
              <th>일시</th>
              <th>경고 코드</th>
              <th>경고 메시지</th>
            </tr>
          </thead>
          <tbody>
            {warnings.map((warning, index) => (
              <tr key={index}>
                <td>{warning.date} {warning.time}</td>
                <td>{warning.code}</td>
                <td>{warning.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default WarningLogPage;
