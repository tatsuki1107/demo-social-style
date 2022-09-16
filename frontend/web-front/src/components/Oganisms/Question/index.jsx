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

const Question = ({ type, id, question, children }) => {
  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);
  const onYes = () => {
    setYes(!yes)
    if (no === true) {
      setNo(false)
    };
  };
  const onNo = () => {
    setNo(!no)
    if (yes === true) {
      setYes(false)
    };
  };
  return (
    <>
      {type === "top" ?
        <Root type={type}>{children}</Root>
        :
        <Root>
          <Typography type="text" size="m" color="orenge">
            問{id}
          </Typography>
          <Typography type="text" size="m" color="black">
            {question}
          </Typography>
          <QandT>
            <Button type={`${yes}`} onClick={onYes}>Yes</Button>
            <Button type={`${no}`} onClick={onNo}>No</Button>
          </QandT>
        </Root>}
    </>
  );
};

export default Question;
