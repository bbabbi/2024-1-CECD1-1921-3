import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './Graph.css';

const GraphPage: React.FC = () => {
  const data = {
    labels: ['13:55:50', '13:55:55', '13:56:00', '13:56:05'],
    datasets: [
      {
        label: '장치1',
        data: [5, 6, 7, 8],
        borderColor: 'red',
        fill: false,
      },
      {
        label: '장치2',
        data: [10, 10, 10, 10],
        borderColor: 'blue',
        fill: false,
      },
      {
        label: '장치3',
        data: [20, 15, 15, 15],
        borderColor: 'orange',
        fill: false,
      },
      {
        label: '장치4',
        data: [0, 2, 4, 6],
        borderColor: 'green',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="graph-page">
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
          <button className="active">그래프</button>
          <button>경고기록</button>
        </div>
        <div className="filters">
        <label className="filter-label">호실</label>
          <select>
            <option>6144호</option>
          </select>
        <label className="filter-label">기기</label>
          <select>
            <option>전체</option>
          </select>
        <label className="filter-label">기간</label>
          <select>
            <option>2024.05 (1개월)</option>
          </select>
        </div>
        <div className="graph-container">
          <h2>그래프</h2>
          <Line data={data} options={options} />
        </div>
        <div className="analysis">
          <h2>수치 분석</h2>
          {/* 수치 분석 내용 추가 */}
        </div>
      </main>
    </div>
  );
};

export default GraphPage;
