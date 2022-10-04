import React, { useState } from "react";
import styled, { css } from "styled-components";

// components
import Typography from "../../Atoms/Typography";
import Button from "../../Atoms/Button";

const Root = styled.div`
  width: 100%;
  background-clip: content-box;
  padding-top: 150px;
  text-align: center;
  ${({ type }) => {
    switch (type) {
      case 'top':
        return css`
          background-color: #FFFFFF;
          padding-top: 150px;
          height: 400px;
          @media all and (max-width: 450px) {
            height: 300px;
          }
        `
      default:
        return css`
          padding-top: 30px;
          height: 300px;
        `
    }
  }}
`;

const QandT = styled.div`
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
`;

const Question = React.memo(({ type, pos, index, question, children, totalCountUp, calcuCount }) => {
  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);
  // 「yes」か「no」どちらか１回押したらtrueにする
  const [flag, setFlag] = useState(false);

  const onClick = (yesNo) => {
    if (yesNo === "yes") {
      if (no === true) {
        setNo(false);
        calcuCount(pos, "no", "down");
      }
      setYes(true);
      calcuCount(pos, "yes", "up");
    } else {
      if (yes === true) {
        setYes(false);
        calcuCount(pos, "yes", "down");
      }
      setNo(true);
      calcuCount(pos, "no", "up");
    }
    if (flag === false) {
      setFlag(true);
      totalCountUp();
    };
  };

  return (
    <>
      {type === "top" ?
        <Root type={type}>{children}</Root>
        :
        <Root>
          <Typography type="text" size="m" color="orenge">
            問{index}
          </Typography>
          <Typography type="text" size="m" color="black">
            {question}
          </Typography>
          <QandT>
            <Button disabled={yes} type={`${yes}`} onClick={() => onClick("yes")}>Yes</Button>
            <Button disabled={no} type={`${no}`} onClick={() => onClick("no")}>No</Button>
          </QandT>
        </Root>}
    </>
  );
});

export default Question;
