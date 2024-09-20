// src/pages/Control.tsx
import React, { useState } from 'react';
import './Control.css';

const ControlPage: React.FC = () => {
  const [devices, setDevices] = useState([
    { name: '스마트 에너지 미터', status: true },
    { name: '스마트 콘센트', status: false },
    { name: '스마트 전동 스위치', status: true },
    { name: '스마트 IR 리모컨', status: true },
    { name: '레이더 센서', status: false },
  ]);

  const toggleDeviceStatus = (index: number) => {
    const newDevices = [...devices];
    newDevices[index].status = !newDevices[index].status;
    setDevices(newDevices);
  };

  return (
    <div className="control-page">
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
          <button className="active">컨트롤</button>
          <button>그래프</button>
          <button>경고기록</button>
        </div>
        <div className="filters">
          <label className="filter-label">호실 선택</label>
          <select>
            <option>6144호</option>
          </select>
        </div>
        <table className="device-table">
          <thead>
            <tr>
              <th>기기 명칭</th>
              <th>상태</th>
              <th>제어</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device, index) => (
              <tr key={index}>
                <td>{device.name}</td>
                <td>{device.status ? 'ON' : 'OFF'}</td>
                <td>
                  <button
                    className={`toggle-button ${device.status ? 'on' : 'off'}`}
                    onClick={() => toggleDeviceStatus(index)}
                  >
                    {device.status ? 'ON' : 'OFF'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ControlPage;
