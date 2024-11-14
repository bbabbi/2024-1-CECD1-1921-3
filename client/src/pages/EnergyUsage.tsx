import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FaChartBar, FaFolderOpen } from 'react-icons/fa';
import Sidebar from './Sidebar';
import './EnergyUsage.css';

interface EnergyData {
    sensorNumber: string;
    dateTime: string;
    percentage: number;
}

const EnergyUsage: React.FC = () => {
    const [percentageData, setPercentageData] = useState<number[]>([]);
    const [energyData, setEnergyData] = useState<EnergyData[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        fetch('https://www.dgu1921.p-e.kr/energy-usage')
            .then(response => response.json())
            .then(data => {
                const processedData = data.map((item: any) => ({
                    sensorNumber: item.sensorNumber,
                    dateTime: item.dateTime,
                    percentage: item.percentage * 10,
                }));
                setEnergyData(processedData);
                setPercentageData(processedData.map((item: EnergyData) => item.percentage));
            })
            .catch(() => {
                setPercentageData([20, 30, 50, 70, 90, 60, 80]);
                setEnergyData([
                    { sensorNumber: '12345', dateTime: '2024-10-15 11:59:00', percentage: 20 },
                    { sensorNumber: '12345', dateTime: '2024-10-15 11:59:00', percentage: 30 },
                ]);
            });
    }, []);

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
        <div className="energy-dashboard-container">
            <Sidebar onToggle={setIsSidebarOpen} />
            <div className="energy-dashboard-content" style={{ marginLeft: isSidebarOpen ? '280px' : '0' }}>
                <h1 className="dashboard-title">전력량 통계</h1>
                
                <div className="graph-section">
                    <h2><FaChartBar className="section-icon" />전력량 그래프</h2>
                    <Line data={chartData} options={chartOptions} />
                </div>

                <div className="data-section">
                    <h2><FaFolderOpen className="section-icon" /> 전력량 데이터</h2>
                    <div className="energy-data-table-wrapper">
                        <table className="energy-data-table">
                            <thead>
                                <tr>
                                    <th>기기번호</th>
                                    <th>시간</th>
                                    <th>전력량 (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {energyData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.sensorNumber}</td>
                                        <td>{item.dateTime}</td>
                                        <td>{item.percentage}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnergyUsage;