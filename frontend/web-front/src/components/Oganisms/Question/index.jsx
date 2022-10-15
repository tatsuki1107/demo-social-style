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

const Question = React.memo(({ type, index, item, children, totalCountUp, calcuCount }) => {
  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);
  // 「yes」か「no」どちらか１回押したらtrueにする
  const [flag, setFlag] = useState(false);

  const onClick = (yesNo) => {
    calcuCount(yesNo, item.pos);
    if (yesNo === 1) {
      setYes(true);
      setNo(false);
    } else if (yesNo === -1) {
      setYes(false);
      setNo(true);
    };
    if (flag === false) {
      setFlag(true);
      totalCountUp()
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
            <Button disabled={yes} type={`${yes}`} onClick={() => onClick(1)}>Yes</Button>
            <Button disabled={no} type={`${no}`} onClick={() => onClick(-1)}>No</Button>
          </QandT>
        </Root>}
    </>
  );
});

export default Question;
