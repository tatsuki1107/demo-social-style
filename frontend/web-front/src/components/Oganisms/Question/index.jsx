import React, { useState } from "react";
import styled, { css } from "styled-components";

// components
import Typography from "../../Atoms/Typography";
import Button from "../../Atoms/Button";

const Root = styled.div`
  width: 100%;
  background-clip: content-box;
  text-align: center;
  ${({ type }) => {
    switch (type) {
      case 'top':
        return css`
          background-color: #FFFFFF;
          height: 400px;
          padding-top: 150px;
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

const Question = React.memo(({ type, index, item, children, totalCountUp, calcuCount }) => {
  // 「yes」か「no」どちらか１回押したら数字(-1,1)にする
  const [state, setState] = useState(0);

  const onClick = (yesNo) => {
    calcuCount(yesNo, item.pos);
    if (state === 0) {
      totalCountUp()
    }
    setState(yesNo);
  }

  const setDisabled = (num) => {
    if (state === num) {
      return true
    } else {
      return false
    }
  }

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
            {item.questions}
          </Typography>
          <QandT>
            <Button disabled={setDisabled(1)} type="yesNo" onClick={() => onClick(1)}>Yes</Button>
            <Button disabled={setDisabled(-1)} type="yesNo" onClick={() => onClick(-1)}>No</Button>
          </QandT>
        </Root>}
    </>
  );
});

export default Question;
