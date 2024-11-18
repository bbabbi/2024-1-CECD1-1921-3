import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { FaImages } from 'react-icons/fa';
import './Device.css';

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
    const [isLayoutModalOpen, setIsLayoutModalOpen] = useState(false); // 기본값을 false로 설정
    const [layoutImage, setLayoutImage] = useState<string | null>(null);

    useEffect(() => {
        fetch('https://www.dgu1921.p-e.kr/devices/filter?buildingName=신공학관&location=5145호')
            .then(response => response.json())
            .then(data => setDevices(data))
            .catch(error => console.error('Error fetching device data:', error));
    }, []);

    const openLayoutModal = () => {
        // 배치도 이미지 가져오기
        fetch('https://www.dgu1921.p-e.kr/devices/신공학관/5145호/layout')
            .then(response => response.json())
            .then(data => {
                setLayoutImage(data.layoutImg);
                setIsLayoutModalOpen(true);
            })
            .catch(error => {
                console.error('Error fetching layout image:', error);
                setIsLayoutModalOpen(true);
            });
    };

    const closeLayoutModal = () => {
        setIsLayoutModalOpen(false);
    };

    return (
        <div className="device-container">
            <Sidebar onToggle={setIsSidebarOpen} />
            <div className="device-content" style={{ marginLeft: isSidebarOpen ? '280px' : '0' }}>
                <h1 className="device-title">IoT 기기 정보</h1>
                <div className="device-header">
                    <h2>신공학관 5145호</h2>
                    <button className="layout-button" onClick={openLayoutModal}>
                        <FaImages className="button-icon" /> IoT 기기 배치도 조회
                    </button>
                </div>
                <div className="device-table">
                    <table>
                        <thead>
                            <tr>
                                <th>이미지</th>
                                <th>기기 명칭</th>
                                <th>강의실</th>
                                <th>카탈로그</th>
                                <th>제어 명령</th>
                            </tr>
                        </thead>
                        <tbody>
                            {devices.map((device, index) => (
                                <tr key={index}>
                                    <td>
                                        <img src={device.deviceImg} alt={device.deviceName} className="device-image" />
                                    </td>
                                    <td>{device.deviceName}</td>
                                    <td>{`${device.buildingName} ${device.location}`}</td>
                                    <td>
                                        <a href={device.catalog} target="_blank" rel="noopener noreferrer" className="catalog-link">
                                            기기 상세 정보
                                        </a>
                                    </td>
                                    <td>
                                        <button className="control-button">제어 명령 전송</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {isLayoutModalOpen && (
                    <div className="modal-overlay" onClick={closeLayoutModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            {layoutImage ? (
                                <img src={layoutImage} alt="기기 배치도" className="layout-image" />
                            ) : (
                                <p>이미지를 불러올 수 없습니다.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Device;
