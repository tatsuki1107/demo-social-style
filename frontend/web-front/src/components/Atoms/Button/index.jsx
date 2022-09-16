import React from "react";
import styled from "styled-components";
import Typography from "../Typography";

const StartButton = styled.button`
border: 0;
background-color: #DF7919;
color: #FFFFFF;
width: 325px;
height: 78px;
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
display: flex;
border-radius: 20px;
align-items: center;
cursor: pointer;
transition: background-color 0.75s ease-out;
  :hover{
    background-color: #f1a35a;
  }
  :active{
    -webkit-transform: translate(0,2px);
    -moz-transform: translate(0,2px);
    transform: translate(0,2px);
    filter:none;
  }
`;

const Button = ({ onClick, children }) => {
  return (
    <StartButton onClick={onClick}>
      <Typography type="text" size="l">{children}</Typography>
    </StartButton>
  );
};

export default Button;
