import React from "react";
import styled from "styled-components";
// components
import Typography from "../Typography";

const BorderArea = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 20px;
  margin-top: 24px;
`;

const Border = styled.div`
  position: absolute;
  width: 100%;
  top: 40%;
  border: 2px solid #DF7919;
`;

const Left = styled.div`
  position: absolute;
  left: -9px;
  top: 2%;
  display: inline-block;
  width: 18px;
  height: 18px;
  margin: 0 10px;
  border-left: 4px solid #DF7919;
  border-bottom: 4px solid #DF7919;
  transform: rotate(45deg);
`;

const Right = styled.div`
  position: absolute;
  right: -13px;
  display: inline-block;
  width: 18px;
  height: 18px;
  margin: 0 10px;
  border-top: 4px solid #DF7919;
  border-right: 4px solid #DF7919;
  transform: rotate(45deg);
`;

const Answer = styled.div`
  display: flex;
  justify-content: space-between;
  @media all and (max-width: 500px) {
    font-size: 0.8em;
  }
  @media all and (max-width: 400px) {
    font-size: 0.75em;
  }
`;

const AnswerBorder = () => {
  return (
    <>
      <BorderArea>
        <Left /><Border /><Right />
      </BorderArea>
      <Answer>
        <Typography type="text" margin={0}>思わない</Typography>
        <Typography type="text" margin={0}>比較的思わない</Typography>
        <Typography type="text" margin={0}>比較的思う</Typography>
        <Typography type="text" margin={0}>思う</Typography>
      </Answer>
    </>
  );
};

export default AnswerBorder;
