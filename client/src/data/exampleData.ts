import { ControlPageState } from '../types/control/types';

const exampleData: ControlPageState = {
    roomNumber: "6144호",
    devices: [
        { id: 1, name: "스마트 에너지 미터", status: "ON", control: true },
        { id: 2, name: "스마트 콘센트", status: "OFF", control: false },
        { id: 3, name: "스마트 전동 스위치", status: "ON", control: true },
        { id: 4, name: "스마트 IR 리모컨", status: "ON", control: true },
        { id: 5, name: "레이더 센서", status: "OFF", control: false },
    ]
};

export default exampleData;
