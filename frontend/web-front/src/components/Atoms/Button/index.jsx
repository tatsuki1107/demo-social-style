import React from "react";
import styled, { css } from "styled-components";

const colorsMap = {
  black: '#000000',
  orenge: '#DF7919',
  white: '#F6F2E8'
}
export const size = ['s', 'm', 'l'];
export const colors = Object.keys(colorsMap);

const Root = styled.button`
  border: 0;
  color: ${({ color }) => colorsMap[color]};
  background: ${({ background }) => colorsMap[background]};
  ${({ size }) => {
    switch (size) {
      case 's':
        return css`
            font-size: 12px
            width 0px
            height: 0px
        `;
      case 'm':
        return css`
            font-size: 18px
            width 0px
            height: 0px
        `;
      case 'l':
        return css`
           font-size: 20px
           width 0px
           height: 0px
        `;
    }
  }};
`;

const Button = ({ cildren, size, onClick, color, background }) => {
  return (
    <Root
      size={size}
      color={color}
      background={background}
      onClick={onClick}
    >
      {cildren}
    </Root>
  );
};

export default Button;
