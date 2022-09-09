import React from "react";
import './index.css'

const StartButton = ({ onClick }) => {
  return (
    <button
      className="button"
      onClick={onClick}>今すぐ診断する</button>
  );
};

export default StartButton;
