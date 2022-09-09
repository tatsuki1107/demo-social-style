import React from "react";
import styled from "styled-components";

const Backtotop = styled.div`
  position: relative;
  top: 2350px;
  left: 1400px;
  width: 200px;
  height: 200px;
  onClick: ${({ onClick }) => onClick}
`;

const Maru = styled.div`
  position: absolute;
  background: #DF7919;
  width: 100%;
  height: 100%;
  border-radius: 100px;
`;

const Sannkaku = styled.div`
  position: absolute;
  left: 23.53%;
  right: 24.26%;
  top: 23.53%;
  bottom: 22.79%;
  clip-path: polygon(0 100%, 50% 0, 100% 100%);
  background: #FFFFFF;
`;

const BackToTop = ({ onClick }) => {
  return (
    <Backtotop onClick={onClick}>
      <Maru><Sannkaku></Sannkaku></Maru>
    </Backtotop>
  );
};

export default BackToTop;
