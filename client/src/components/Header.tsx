import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>1921 동국대학교</h1>
        <p>Mobius 플랫폼 기반 전력제어 시스템</p>
      </div>
      <div className="header-right">
        <span>admin</span>
        <button>Logout</button>
      </div>
    </header>
  );
};

export default Header;
export {};
