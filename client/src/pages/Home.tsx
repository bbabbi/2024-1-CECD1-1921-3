import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChartLine, faBatteryEmpty, faBatteryQuarter, faBatteryHalf, faBatteryThreeQuarters, faBatteryFull } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <header className="header">
        <div className="header-left">
          <h1>1921 동국대학교</h1>
          <p>Mobius 플랫폼 기반 전력제어 시스템</p>
        </div>
        <div className="header-right">
          <button>Login</button>
          <button className="signup">Sign up</button>
        </div>
      </header>
      <nav className="nav">
        <button>홈</button>
        <button>IoT 기기 현황</button>
        <button>데이터 관리</button>
        <button>About 1921</button>
      </nav>
      <main className="main-content">
        <h1>Mobius 플랫폼 기반 전력 세이빙 시스템</h1>
        <p>동국대학교 전력 세이빙을 위한 전력 사용량 모니터링 및 비대면 제어 프로그램</p>
        <div className="icon-row">
          <FontAwesomeIcon icon={faBatteryEmpty} className="icon" />
          <FontAwesomeIcon icon={faBatteryQuarter} className="icon" />
          <FontAwesomeIcon icon={faBatteryHalf} className="icon" />
          <FontAwesomeIcon icon={faBatteryThreeQuarters} className="icon" />
          <FontAwesomeIcon icon={faBatteryFull} className="icon" />
        </div>
        <h2>제어 및 모니터링</h2>
        <div className="buttons">
          <div className="button">
            <FontAwesomeIcon icon={faSearch} className="button-icon" />
            <p>IoT 기기 현황</p>
          </div>
          <div className="button">
            <FontAwesomeIcon icon={faChartLine} className="button-icon" />
            <p>데이터 확인</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
