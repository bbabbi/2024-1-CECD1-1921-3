import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FaPaperPlane, FaFolderOpen, FaChartBar } from 'react-icons/fa';
import Sidebar from './Sidebar';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    const [percentageData, setPercentageData] = useState<number[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        fetch('https://www.dgu1921.p-e.kr/energy-usage')
            .then(response => response.json())
            .then(data => {
                const processedData = data.map((item: any) => item.percentage * 10);
                setPercentageData(processedData);
            })
            .catch(() => {
                setPercentageData([20, 30, 50, 70, 90, 60, 80]);
            });
    }, []);

    const devices = [
        {
            name: '스마트 콘센트',
            image: 'https://github.com/CSID-DGU/2024-1-CECD1-1921-3/blob/develop/data/IoTImg/%EC%8A%A4%EB%A7%88%ED%8A%B8%EC%BD%98%EC%84%BC%ED%8A%B8.png?raw=true',
        },
        {
            name: '스마트 전등 스위치',
            image: 'https://github.com/CSID-DGU/2024-1-CECD1-1921-3/blob/develop/data/IoTImg/%EC%8A%A4%EB%A7%88%ED%8A%B8%EC%A0%84%EB%93%B1%EC%8A%A4%EC%9C%84%EC%B9%98.png?raw=true',
        },
        {
            name: '스마트 온습도 센서',
            image: 'https://github.com/CSID-DGU/2024-1-CECD1-1921-3/blob/develop/data/IoTImg/%EC%8A%A4%EB%A7%88%ED%8A%B8%EC%98%A8%EC%8A%B5%EB%8F%84%EC%84%BC%EC%84%9C.png?raw=true',
        },
        {
            name: '스마트 에너지 미터',
            image: 'https://github.com/CSID-DGU/2024-1-CECD1-1921-3/blob/develop/data/IoTImg/%EC%8A%A4%EB%A7%88%ED%8A%B8%EC%97%90%EB%84%88%EC%A7%80%EB%AF%B8%ED%84%B0.png?raw=true',
        },
        {
            name: '멀티 IR 리모컨',
            image: 'https://github.com/CSID-DGU/2024-1-CECD1-1921-3/blob/develop/data/IoTImg/%EC%8A%A4%EB%A7%88%ED%8A%B8%EB%A9%80%ED%8B%B0IR%EB%A6%AC%EB%AA%A8%EC%BB%A8.png?raw=true',
        },
        {
            name: '스마트 IoT 레이더 센서',
            image: 'https://github.com/CSID-DGU/2024-1-CECD1-1921-3/blob/develop/data/IoTImg/%EC%8A%A4%EB%A7%88%ED%8A%B8IoT%EB%A0%88%EC%9D%B4%EB%8D%94%EC%84%BC%EC%84%9C.png?raw=true',
        },
    ];

    const chartData = {
        labels: Array.from({ length: percentageData.length }, (_, i) => `Time ${i + 1}`),
        datasets: [{
            label: '전력량 (x10)',
            data: percentageData,
            fill: true,
            backgroundColor: 'rgba(72, 128, 255, 0.2)',
            borderColor: '#4880FF',
            pointBackgroundColor: '#4880FF',
            pointBorderColor: '#4880FF',
            tension: 0.1
        }]
    };

    const chartOptions = {
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    color: "rgba(200, 200, 200, 0.3)"
                }
            }
        }
    };

    return (
        <div className="dashboard-container">
            <Sidebar onToggle={setIsSidebarOpen} />
            <div className="dashboard-content" style={{ marginLeft: isSidebarOpen ? '280px' : '0' }}>
                <h1 className="dashboard-title">Dashboard</h1>
                <div className="info-section">
                <div className="room-info">
                    <div className="room-info-header">
                        <h2>
                            <FaPaperPlane className="section-icon" /> 호실별 정보
                        </h2>
                        <a href="/roominfo" className="details-link">&gt; 자세히 보기</a>
                    </div>
                    <div className="room-info-content">
                        <p className="room-info-title">신공학관 5145호</p>
                        <p>최근 강의 시간: 13:00 ~ 15:00</p>
                        <p>다음 강의 시간: 17:00 ~ 19:00</p>
                        <div className="room-info-status">
                            <div className="status-item">
                                <p className="status-title">강의 진행 여부</p>
                                <p className="status-value">O</p>
                            </div>
                            <div className="status-item">
                                <p className="status-title">재실 여부</p>
                                <p className="status-value">(강의중 측정 x)</p>
                            </div>
                            <div className="status-item">
                                <p className="status-title">낭비 전력 발생</p>
                                <p className="status-value">(강의중 측정 x)</p>
                            </div>
                        </div>
                    </div>
                </div>


                    <div className="device-info">
                        <h2>
                            <FaFolderOpen className="section-icon" /> IoT 기기 정보
                        </h2>
                        {/* <a href="/device">&gt; 자세히 보기</a> */}
                        <div className="device-list">
                            {devices.map((device, index) => (
                                <div key={index} className="device-item">
                                    <div className="device-content">
                                        <img src={device.image} alt={device.name} className="device-image" />
                                        <p className="device-name">{device.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="energy-graph">
                    <h2>
                        <FaChartBar className="section-icon" /> 전력량 그래프
                    </h2>
                    <a href="/device">&gt; 자세히 보기</a>
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
