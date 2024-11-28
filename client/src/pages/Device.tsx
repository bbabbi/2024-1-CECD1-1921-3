import React, { useEffect, useState } from "react";
import { FaImages, FaBuilding } from "react-icons/fa";
import Sidebar from "./Sidebar";
import "./Device.css";

interface Device {
  deviceImg: string;
  deviceName: string;
  buildingName: string;
  location: string;
  catalog: string;
}

const Device: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLayoutModalOpen, setIsLayoutModalOpen] = useState(false);
  const [isCommandModalOpen, setIsCommandModalOpen] = useState(false);
  const [currentDeviceName, setCurrentDeviceName] = useState<string>(""); // 현재 기기 이름
  const [command, setCommand] = useState<boolean>(true); // ON이 기본값

  // 이미지 URL
  const layoutImage =
    "https://github.com/CSID-DGU/2024-1-CECD1-1921-3/blob/develop/data/IoTImg/%EB%B0%B0%EC%B9%98%EB%8F%84-%EC%8B%A0%EA%B3%B5%ED%95%99%EA%B4%805145%ED%98%B8.png?raw=true";

  const [building, setBuilding] = useState<string>("신공학관");
  const [room, setRoom] = useState<string>("5145호");

  useEffect(() => {
    fetch(
      `https://www.dgu1921.p-e.kr/devices/filter?buildingName=${building}&location=${room}`
    )
      .then((response) => response.json())
      .then((data) => setDevices(data))
      .catch((error) => console.error("Error fetching device data:", error));
  }, [building, room]);

  const openLayoutModal = () => {
    setIsLayoutModalOpen(true);
  };

  const closeLayoutModal = () => {
    setIsLayoutModalOpen(false);
  };

  const openCommandModal = (deviceName: string) => {
    setCurrentDeviceName(deviceName);
    setIsCommandModalOpen(true);
  };

  const closeCommandModal = () => {
    setIsCommandModalOpen(false);
  };

  const sendCommand = () => {
    const payload = {
      sensorId: "000100010000000093",
      command: command, // ON/OFF에 따라 true/false 전송
    };

    fetch("https://www.dgu1921.p-e.kr/command", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Command response:", data);
        closeCommandModal();
      })
      .catch((error) => console.error("Error sending command:", error));
  };

  return (
    <div className="dashboard-container">
      <Sidebar onToggle={setIsSidebarOpen} />
      <div
        className="dashboard-content"
        style={{ marginLeft: isSidebarOpen ? "280px" : "0" }}
      >
        <h1 className="dashboard-title">IoT 기기 정보</h1>
        <div className="device-section">
          <div className="device-header">
            <div className="location-select">
              <label>
                <FaBuilding className="location-icon" />
                <span>건물 선택</span>
                <select value={building} onChange={(e) => setBuilding(e.target.value)}>
                  <option value="신공학관">신공학관</option>
                </select>
              </label>
              <label>
                <span>호수 선택</span>
                <select value={room} onChange={(e) => setRoom(e.target.value)}>
                  <option value="5145호">5145호</option>
                </select>
              </label>
            </div>
            <button className="layout-button" onClick={openLayoutModal}>
              <FaImages className="button-icon" /> IoT 기기 배치도 조회
            </button>
          </div>
          <div className="device-table-container">
            <table className="device-table">
              <thead>
                <tr>
                  <th>이미지</th>
                  <th>기기 명칭</th>
                  <th>강의실</th>
                  <th>카탈로그</th>
                  <th>제어</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={device.deviceImg}
                        alt={device.deviceName}
                        className="device-image"
                      />
                    </td>
                    <td>{device.deviceName}</td>
                    <td>{`${device.buildingName} ${device.location}`}</td>
                    <td>
                      <button
                        onClick={() =>
                          window.open(device.catalog, "_blank", "noopener noreferrer")
                        }
                        className="catalog-button"
                      >
                        기기 상세 정보
                      </button>
                    </td>
                    <td>
                      <button
                        className="control-button"
                        onClick={() => openCommandModal(device.deviceName)}
                      >
                        제어 명령 전송
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isLayoutModalOpen && (
          <div className="modal-overlay" onClick={closeLayoutModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <img
                src={layoutImage}
                alt="IoT 기기 배치도"
                className="layout-image"
              />
              <button className="modal-close" onClick={closeLayoutModal}>
                X
              </button>
            </div>
          </div>
        )}

        {isCommandModalOpen && (
          <div className="modal-overlay" onClick={closeCommandModal}>
            <div
              className="modal-content command-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <p>
                현재 '<strong className="device-name">{currentDeviceName}</strong>
                ' 는 ON 상태입니다. 제어 명령을 전송하시겠습니까?
              </p>
              <div className="command-toggle">
                <label>
                  <input
                    type="radio"
                    value="true"
                    checked={command === true}
                    onChange={() => setCommand(true)}
                  />
                  ON
                </label>
                <label>
                  <input
                    type="radio"
                    value="false"
                    checked={command === false}
                    onChange={() => setCommand(false)}
                  />
                  OFF
                </label>
              </div>
              <button className="control-button" onClick={sendCommand}>
                제어 명령 전송
              </button>
              <button className="modal-close" onClick={closeCommandModal}>
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Device;
