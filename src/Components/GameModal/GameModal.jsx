import React from "react";
import { Modal, Button } from "antd";
import "./gameModal.css";

const GameModal = ({ message, onRestart, onExit, isVisible }) => {
  return (
    <Modal
      title="Game Over"
      visible={isVisible}
      onCancel={onExit}
      footer={[
        <Button key="exit" onClick={onExit}>
          Exit
        </Button>,
        <Button key="restart" type="primary" onClick={onRestart}>
          Restart
        </Button>,
      ]}
    >
      <p>{message}</p>
    </Modal>
  );
};

export default GameModal;
