import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const WebSocketModal = () => {
  const [isCommandModalOpen, setIsCommandModalOpen] = useState(false);
  const [currentDeviceName, setCurrentDeviceName] = useState("");
  const [command, setCommand] = useState<boolean | null>(null);

  useEffect(() => {
    const stompClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      onConnect: () => {
        stompClient.subscribe("/topic/commands", (message) => {
          const data = JSON.parse(message.body);
          setCurrentDeviceName(data.deviceName);
          setCommand(data.command);
          setIsCommandModalOpen(true); // 알림 표시
        });
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const closeCommandModal = () => {
    setIsCommandModalOpen(false);
  };

  return (
    <>
      {isCommandModalOpen && (
        <div className="modal-overlay" onClick={closeCommandModal}>
          <div
            className="modal-content command-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <p>
              현재 '<strong className="device-name">{currentDeviceName}</strong>'는{" "}
              {command ? "ON" : "OFF"} 상태입니다. 제어 명령을 전송하시겠습니까?
            </p>
            <button className="control-button" onClick={closeCommandModal}>
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WebSocketModal;
