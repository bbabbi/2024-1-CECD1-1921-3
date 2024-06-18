import React, { useState } from 'react';
import { DeviceStatus } from '../types/control/types';

interface ControlPanelProps {
    roomNumber: string;
    devices: DeviceStatus[];
}

const ControlPanel: React.FC<ControlPanelProps> = ({ roomNumber, devices }) => {
    const [deviceList, setDeviceList] = useState(devices);

    const toggleDeviceStatus = (id: number) => {
        setDeviceList(prevDevices =>
            prevDevices.map(device =>
                device.id === id ? { ...device, status: device.status === 'ON' ? 'OFF' : 'ON' } : device
            )
        );
    };

    return (
        <div>
            <h1>호실: {roomNumber}</h1>
            <table>
                <thead>
                    <tr>
                        <th>기기 명칭</th>
                        <th>상태</th>
                        <th>제어</th>
                    </tr>
                </thead>
                <tbody>
                    {deviceList.map(device => (
                        <tr key={device.id}>
                            <td>{device.name}</td>
                            <td>{device.status}</td>
                            <td>
                                <button onClick={() => toggleDeviceStatus(device.id)} disabled={!device.control}>
                                    {device.control ? (device.status === 'ON' ? 'OFF' : 'ON') : '제어 불가'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ControlPanel;
