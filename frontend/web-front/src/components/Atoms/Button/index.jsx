import React from "react";
import styled, { css } from "styled-components";
import Typography from "../Typography";

const Root = styled.button`
border: 0;
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
display: flex;
border-radius: 20px;
align-items: center;
margin: 0 auto;
cursor: pointer;
transition: background-color 0.75s ease-out, color 0.5s ease-out;
:hover{
  background-color: #f1a35a;
}
:active{
  -webkit-transform: translate(0,2px);
  -moz-transform: translate(0,2px);
  transform: translate(0,2px);
  filter:none;
}
${({ type }) => {
    switch (type) {
      case "start":
        return css`
        background-color: #DF7919;
        color: #FFFFFF;
        width: 325px;
        height: 78px;
				@media all and (max-width: 600px) {
						width: 270px;
				}	
      `
      case "yesNo":
        return css`
        background-color: #FFFFFF;
        color: #000000;
        width: 250px;
        height: 60px;
        :hover{
          color: #FFFFFF;
        }
        :disabled{
          background-color: #DF7919;
          color: #FFFFFF;
          filter: none;
          -webkit-transform: translate(0,2px);
          -moz-transform: translate(0,2px);
          transform: translate(0,2px);
        }
				@media all and (max-width: 600px) {
						width: 150px;
				}
      `
      case "maru":
        return css`
        background-color: #DF7919;
        color: #FFFFFF;
        width: 325px;
        height: 40px;
				/* 「Social Style診断とは」ボタン内の fontsize調整 */
				font-size: 0.7em;
				
				@media all and (max-width: 600px) {
					width: 270px;
				}
      `
      case "pastDate":
        return css`
          background-color: #DF7919;
          color: #FFFFFF;
          width: 100%;
          height: 80px;
          border-radius: 50px;
          font-size: 1.5em;
          :disabled {
            background-color: #FFFFFF;
            color: #000000;
          }
          @media all and (max-width: 500px) {
            font-size: 0.9em;
          }
        `
    }
  }}
`;

const Button = ({ onClick, children, type, disabled }) => {
  return (
    <Root onClick={onClick} type={type} disabled={disabled}>
      <Typography type="text" size="l">{children}</Typography>
    </Root>
  );
};

export default Button;
