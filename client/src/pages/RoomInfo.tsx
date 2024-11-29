import React, { useEffect, useState } from "react";
import { FaBuilding } from "react-icons/fa";
import Sidebar from "./Sidebar";
import "./RoomInfo.css";

interface OccupancyData {
  location: string;
  isLecturing: boolean;
  occupancyStatus: boolean;
  wasteStatus: boolean;
}

const RoomInfo: React.FC = () => {
  const [building, setBuilding] = useState("신공학관");
  const [room, setRoom] = useState("5145호");
  const [occupancyData, setOccupancyData] = useState<OccupancyData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCommandModalOpen, setIsCommandModalOpen] = useState(false);

  // 데이터 가져오기
  useEffect(() => {
    fetch(`https://www.dgu1921.p-e.kr/occupancy/${room}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setOccupancyData(data))
      .catch((error) => console.error("Error fetching occupancy data:", error));
  }, [room]);

  const closeCommandModal = () => setIsCommandModalOpen(false);

  const openCommandModal = () => setIsCommandModalOpen(true);

  return (
    <div className="dashboard-container">
      <Sidebar onToggle={setIsSidebarOpen} />
      <div
        className="dashboard-content"
        style={{ marginLeft: isSidebarOpen ? "280px" : "0" }}
      >
        <h1 className="dashboard-title">호실별 정보</h1>
        <div className="device-header">
          <div className="location-select">
            <label>
              <span>건물 선택</span>
              <select value={building} onChange={(e) => setBuilding(e.target.value)}>
                <option value="신공학관">신공학관</option>
              </select>
            </label>
            <label>
              <span>호수 선택</span>
              <select value={room} onChange={(e) => setRoom(e.target.value)}>
                <option value="5141호">5141호</option>
                <option value="5143호">5143호</option>
                <option value="5145호">5145호</option>
                <option value="5147호">5147호</option>
              </select>
            </label>
          </div>
        </div>
        {occupancyData && (
          <div className="device-section">
            <FaBuilding className="location-icon" />
            <span className="room-title">{occupancyData.location}</span>
            <br></br><br></br><br></br>
            <table className="device-table">
            <thead>
              <tr>
                <th>기준</th>
                <th>판단 내용</th>
              </tr>
            </thead>
              <tbody>
                <tr>
                  <th>강의 진행 여부</th>
                  <td>
                    {occupancyData.isLecturing ? "현재 해당 강의실에서 강의가 진행중입니다." : "강의 진행 여부 X"}
                  </td>
                </tr>
                <tr>
                  <th>재실 여부</th>
                  <td>
                    {occupancyData.occupancyStatus
                      ? "X, 현재 재실중인 인원이 없습니다."
                      : "강의 중에는 재실여부를 측정하지 않습니다."}
                  </td>
                </tr>
                <tr>
                  <th>낭비 전력 발생</th>
                  <td>
                    {occupancyData.wasteStatus ? (
                      <>
                        <p className="control-content">O, 현재 낭비 전력이 발생중인 것으로 예측됩니다. 제어가 필요합니다.</p>
                        <button
                          className="control-button"
                          onClick={() => (window.location.href = "/admin/device")}
                        >
                          제어 명령 전송하기
                        </button>
                      </>
                    ) : (
                      "강의 중에는 낭비 전력 발생 여부를 측정하지 않습니다."
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {isCommandModalOpen && (
          <div className="modal-overlay" onClick={closeCommandModal}>
            <div
              className="modal-content command-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <p>명령을 전송하시겠습니까?</p>
              <div className="command-toggle">
                <label>
                  <input type="radio" value="true" /> ON
                </label>
                <label>
                  <input type="radio" value="false" /> OFF
                </label>
              </div>
              <button className="control-button">전송</button>
              <button className="modal-close" onClick={closeCommandModal}>
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomInfo;
