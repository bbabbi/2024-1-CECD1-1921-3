// 각 기기의 상태를 나타내는 인터페이스
export interface DeviceStatus {
  id: number;
  name: string;
  status: 'ON' | 'OFF';
  control: boolean;
}

// 전체 페이지의 상태를 나타내는 인터페이스
export interface ControlPageState {
  roomNumber: string;
  devices: DeviceStatus[];
};
