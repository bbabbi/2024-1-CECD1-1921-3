import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './EnergyUsage.css';

interface EnergyData {
    sensorNumber: string;
    dateTime: string;
    result: number;
    percentage: number;
}

const EnergyUsage: React.FC = () => {
    const [data, setData] = useState<EnergyData[]>([]);
    const [isNavOpen, setIsNavOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://www.dgu1921.p-e.kr/energy-usage');
                setData(response.data);
            } catch (error) {
                console.error("Error fetching energy usage data", error);
            }
        };
        fetchData();
    }, []);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <div className="container">
            <div className={`sidebar ${isNavOpen ? 'open' : ''}`}>
                <button className="toggle-button" onClick={toggleNav}>
                    ☰
                </button>
                <nav className="nav-menu">
                    <h1>1921 for admin</h1>
                    <ul>
                        <li>Dashboard</li>
                        <li>호실별 정보</li>
                        <li>IoT 기기 정보</li>
                        <li>전력량 통계</li>
                        <li>1921이란?</li>
                    </ul>
                    <div className="nav-footer">
                        <p>Settings</p>
                        <p>Logout</p>
                    </div>
                </nav>
            </div>
            <div className="content">
                <h2 className="title">전력량 통계</h2>
                <div className="graph-section">
                    <h3>전력량 그래프</h3>
                    {/* isNavOpen 상태에 따라 width를 조정하여 불필요한 ResizeObserver 이벤트를 방지 */}
                    <ResponsiveContainer width={isNavOpen ? "90%" : "100%"} height={300}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="dateTime" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Line type="monotone" dataKey="percentage" stroke="#8884d8" dot />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="data-section">
                    <h3>전력량 데이터</h3>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>센서 번호</th>
                                    <th>시간</th>
                                    <th>전력량 (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.sensorNumber}</td>
                                        <td>{new Date(item.dateTime).toLocaleString()}</td>
                                        <td>{item.percentage.toFixed(2)}</td>
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
