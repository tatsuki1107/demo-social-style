import React, { useState } from "react";
import styled, { css } from "styled-components";

// components
import Typography from "../../Atoms/Typography";
import Button from "../../Atoms/Button";
import AnswerBorder from "../../Atoms/AnswerBorder";

const pointMap = [-2, -1, 1, 2];

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
          padding-top: 80px;
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
  // 4択ボタン１回押したらその時の数字(-2, -1, 1, 2)にする
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
            {pointMap.map((point) => {
              return <Button
                key={point}
                disabled={setDisabled(point)}
                type="yesNo"
                onClick={() => onClick(point)}
              />
            })}
          </QandT>
          <AnswerBorder />
        </Root>}
    </>
  );
});

export default Question;
