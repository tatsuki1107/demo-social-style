import React from "react";
import './index.css'

const StartButton = ({ onClick }) => {
  return (
    <button
      className="button"
      onClick={onClick}>
      <p className="button_txt">今すぐ診断する</p>
    </button>
  );
};

export default StartButton;
