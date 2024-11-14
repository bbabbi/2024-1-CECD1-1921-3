import React, { useEffect, useRef, useState, useCallback } from "react";
import { FaBars, FaChartBar, FaDoorOpen, FaFolder, FaInfoCircle, FaCog, FaSignOutAlt, FaTimes } from "react-icons/fa";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  width?: number;
  children?: React.ReactNode;
  onToggle: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ width = 280, children, onToggle }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(-width);
  const side = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
      setOpen(true);
      onToggle(true); // 사이드바 열림 상태 전달
    } else {
      setX(-width);
      setOpen(false);
      onToggle(false); // 사이드바 닫힘 상태 전달
    }
  };

  const handleClose = useCallback(
    async (e: MouseEvent) => {
      const sideArea = side.current;
      const sideChildren = sideArea?.contains(e.target as Node);
      if (isOpen && (!sideArea || !sideChildren)) {
        await setX(-width);
        await setOpen(false);
        onToggle(false); // 사이드바 닫힘 상태 전달
      }
    },
    [isOpen, onToggle, width]
  );

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, [handleClose]);

  return (
    <div className={styles.container}>
      <div
        ref={side}
        className={styles.sidebar}
        style={{
          width: `${width}px`,
          height: "100%",
          transform: `translateX(${xPosition}px)`,
        }}
      >
        <button onClick={toggleMenu} className={styles.menuButton}>
          {isOpen ? <FaTimes className={styles.menuIcon} /> : <FaBars className={styles.menuIcon} />}
        </button>
        <div className={styles.sidebarContent}>
          <h2 className={styles.logo}>1921 <span>for admin</span></h2>
          <nav className={styles.nav}>
            <a href="/dashboard" className={styles.navItem}>
              <FaChartBar className={styles.icon} /> Dashboard
            </a>
            <a href="/roominfo" className={styles.navItem}>
              <FaDoorOpen className={styles.icon} /> 호실별 정보
            </a>
            <a href="/device" className={styles.navItem}>
              <FaFolder className={styles.icon} /> IoT 기기 정보
            </a>
            <a href="/energyusage" className={styles.navItem}>
              <FaChartBar className={styles.icon} /> 전력량 통계
            </a>
            <a href="/superadmin/help" className={styles.navItem}>
              <FaInfoCircle className={styles.icon} /> 1921이란?
            </a>
          </nav>
          <div className={styles.bottomMenu}>
            <a href="/settings" className={styles.bottomItem}><FaCog className={styles.icon} /> Settings</a>
            <a href="/logout" className={styles.bottomItem}><FaSignOutAlt className={styles.icon} /> Logout</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
